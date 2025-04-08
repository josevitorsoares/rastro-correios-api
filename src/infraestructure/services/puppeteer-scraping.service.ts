import { TRACKING_URL } from '@config/environment/env';
import { IScrapingService } from '@domain/services/scraping.interface.service';
import { TrackOneObjectOutput } from '@dtos/track-one-object.dto';
import { TrackEntity } from '@entities/track.entity';
import { TrackStatusEnum } from '@enums/track-status.enum';
import { TrackingError } from '@errors/tracking.error';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export class PuppeteerScrapingService implements IScrapingService {
  /**
   * Determines the tracking status based on a given description.
   *
   * @param description - The description of the tracking status.
   *
   * @returns A TrackStatusEnum value corresponding to the description.
   *          - POSTED for "Objeto postado"
   *          - DELIVERY_ROUTE for "Objeto saiu para entrega ao destinatário"
   *          - DELIVERED for "Objeto entregue ao destinatário"
   *          - IN_TRANSIT for any other description
   */
  private _getStatus(description: string): TrackStatusEnum {
    switch (description) {
      case 'Objeto postado':
        return TrackStatusEnum.POSTED;
      case 'Objeto saiu para entrega ao destinatário':
        return TrackStatusEnum.DELIVERY_ROUTE;
      case 'Objeto entregue ao destinatário':
        return TrackStatusEnum.DELIVERED;
      default:
        return TrackStatusEnum.IN_TRANSIT;
    }
  }

  async trackOneObject(code: string): Promise<TrackOneObjectOutput> {
    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions'],
    });

    try {
      const page = await browser.newPage();

      await page.goto(`${TRACKING_URL}/${code}`, {
        waitUntil: 'domcontentloaded',
      });

      await page.waitForSelector('#track-steps');

      // Verify if there is a tracking error before continue
      const trackingError = await page
        .$eval('.alert.alert-warning', (element) => {
          const paragraphs = element.querySelectorAll('p');

          if (paragraphs.length >= 2) {
            return {
              isTrackingError: true,
              message: paragraphs[0].textContent?.trim() ?? '',
              note: paragraphs[1].textContent?.trim() ?? '',
            };
          }

          return null;
        })
        .catch(() => null);

      // Check if has a tracking error
      if (trackingError?.isTrackingError) {
        throw new TrackingError(
          code,
          trackingError.message,
          trackingError.note,
        );
      }

      // Get the tracking type
      const type = await page.$eval(
        '.font-roboto.text-lightblue',
        (element) => element?.textContent?.trim() ?? '',
      );

      const rawTracks = await page.$$eval('.card.track-card', (cards) => {
        return cards.map((card) => {
          // Date and Time
          const dateTimeText =
            card.querySelector('.status p small')?.innerHTML ?? '';

          const [date, time] = dateTimeText
            .split('<br>')
            .map((part) => part.trim());

          // Description and Message
          const statusText =
            card.querySelector('.col-8 p.mb-0')?.innerHTML ?? '';
          const [description, message] = statusText
            .split('<br>')
            .map((part) => part.trim());

          // Origin and Destination
          const routeText =
            card.querySelector('.col-8 .text-mediumgray')?.textContent ?? '';

          const [origin, destination] = routeText
            .split(/\s{2,}/)
            .map((part) => part.trim());

          // Details to the tracking object
          return {
            description,
            message,
            origin,
            destination,
            date,
            time,
          };
        });
      });

      // Transforming raw data into TrackEntity with status
      const tracks: TrackEntity[] = rawTracks.map((track) => {
        const entity: TrackEntity = {
          description: track.description,
          status: this._getStatus(track.description),
          origin: track.origin,
          destination: track.destination,
          date: track.date,
          time: track.time,
        };

        // Check if has message with tracking status
        if (track.message) {
          entity.message = track.message;
        }

        // Return track with status and message
        return entity;
      });

      // Return the package object
      return {
        package: { code, type },
        tracks,
      };
    } catch (error: any) {
      if (error?.isTrackingError) {
        throw new TrackingError(code, error.message, error.note);
      }

      throw error;
    } finally {
      await browser.close();
    }
  }
}
