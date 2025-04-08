import { IScrapingService } from '@domain/services/scraping.interface.service';
import { PuppeteerScrapingService } from '@services/puppeteer-scraping.service';

export const makePuppeteerScrapingService = (): IScrapingService => {
  const puppeteerScrapingService = new PuppeteerScrapingService();

  return puppeteerScrapingService;
};
