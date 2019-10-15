import * as request from "request-promise-native";
import * as cheerio from "cheerio";

/**
 *
 * @param url Base Url of website to crawl
 * @param delay Delay in MS to avoid high server load
 */
export async function Crawl(url: string, delay: number): Promise<string[]> {
  let toVisit: string[] = ["/"];
  let visited: string[] = [];

  while (toVisit.length > 0) {
    const subUrl = toVisit.pop();
    const urls = await collectUrls(url + subUrl);
    const newUrls = urls.filter(
      url =>
        url !== subUrl &&
        visited.indexOf(url) === -1 &&
        toVisit.indexOf(url) === -1
    );
    visited.push(subUrl);
    toVisit = [...toVisit, ...newUrls];
    await slowDown(delay);
  }

  return visited;
}

/**
 *
 * @param url URL to collected linked URLs from
 */
async function collectUrls(url: string): Promise<string[]> {
  let urls: string[] = [];
  try {
    console.info("Collecting URLs @", url);
    const response = await request.get(url);
    const $ = cheerio.load(response);
    $("a").each((idx, element) => {
      const href = $(element).attr("href");
      const isValid = isValidUrl(href);
      const isListed = urls.indexOf(href) !== -1;
      if (isValid && !isListed) urls.push(href);
    });
  } catch (error) {
    console.error(error);
  }
  return urls;
}

/**
 *
 * @param url URL to be checked
 */
function isValidUrl(url: string): boolean {
  //prettier-ignore
  const invalidSuffix = [".pdf", ".pdf/", ".jpg", ".jpg/", ".png", ".png/", ".svg", ".svg/", ".dotx", ".dotx/", "risexport"];
  const internal = url.startsWith("/");
  const notBase = url.length > 1;
  if (!(internal && notBase)) return false;
  let valid = true;
  for (let suf of invalidSuffix) {
    if (url.endsWith(suf)) {
      valid = false;
      break;
    }
  }
  return valid;
}

/**
 *
 * @param ms Delay in Milliseconds
 */
async function slowDown(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}
