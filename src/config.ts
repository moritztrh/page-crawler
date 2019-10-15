import configfile from "./config.json";

export interface Configuration {
  url: string;
  resultName: string;
  outDir: string;
  delay: number;
}

export const Config: Configuration = configfile;
