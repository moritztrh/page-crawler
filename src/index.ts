import { Config } from "./config";
import { Crawl } from "./crawler";
import { Save } from "./file";

Crawl(Config.url, Config.delay).then(results =>
  Save(results.sort(), Config.outDir, Config.resultName)
);
