/**
 * Represents a package with its tracking code and type.
 */
export type PackageEntity = {
  /** Tracking code of the package (e.g. “AB123456789BR”).*/
  code: string;
  
  /** Type of the package (e.g. “PAC”, “SEDEX”). */
  type: string;
};
