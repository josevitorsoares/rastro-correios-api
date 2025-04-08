import { TrackOneObjectOutput } from '@dtos/track-one-object.dto';

export interface IScrapingService {
  /**
   * Tracks a single postal item from its tracking code.
   *
   * This function uses Puppeteer with the Stealth plugin to access a tracking page,
   * extract information from the package (or a tracking error, if applicable) and return it
   * as a structured object.
   *
   * @param {string} code - Tracking code of the object (e.g. “AA123456789BR”).
   * @returns {Promise<TrackOneObjectOutput | TrackingError>} Returns an object with the tracking data,
   * including type and events (if found), or an error with message and note if the code is invalid or not found.
   *
   */
  trackOneObject(code: string): Promise<TrackOneObjectOutput>;
}
