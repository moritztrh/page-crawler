import * as fs from "fs";

/**
 *
 * @param results Array of URLs
 * @param path File path
 * @param name File name
 */
export async function Save(
  results: string[],
  path: string,
  name: string
): Promise<void> {
  saveAsTxt(results, path, name);
}

/**
 *
 * @param results Array of URLs
 * @param path File path
 * @param name File name
 */
function saveAsTxt(results: string[], path: string, name: string): void {
  ensurePathExsits(path);
  const fullPath = path + "/" + name + ".txt";
  const stream = fs.createWriteStream(fullPath);
  stream.on("error", err => console.error(err));
  results.forEach(url => stream.write(url + "\n"));
  stream.end();
}

/**
 *
 * @param path Path to be checked
 */
function ensurePathExsits(path: string): void {
  const exists = fs.existsSync(path);
  if (!exists) fs.mkdirSync(path, { recursive: true });
}
