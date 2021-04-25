import fs from "fs";
import path from "path";
import { gunzip } from "../src";
import { gzip } from "@ev-fns/gzip";

describe("gunzip", () => {
  it("gunzips a file", async () => {
    expect.assertions(3);

    const content = "file content".repeat(5);

    const filename = path.join(__dirname, Date.now().toString());
    const gzipFilename = filename + ".gz";

    await fs.promises.writeFile(filename, content);

    const fileStats = await fs.promises.stat(filename);

    await gzip(filename, gzipFilename);

    const gzipStats = await fs.promises.stat(gzipFilename);

    await gunzip(gzipFilename, filename);

    const gunzipStats = await fs.promises.stat(filename);

    const gunzipContent = await (await fs.promises.readFile(filename)).toString(
      "utf8"
    );

    try {
      expect(gunzipStats.size).toBeGreaterThan(gzipStats.size);
      expect(gunzipStats.size).toBe(fileStats.size);
      expect(gunzipContent).toBe(content);
    } finally {
      await fs.promises.unlink(filename);
    }
  });

  it("renames output file to remove .gz", async () => {
    expect.assertions(1);
    const filename = path.join(__dirname, Date.now().toString());
    const gzipFilename = filename + ".gz";
    await fs.promises.writeFile(filename, "a".repeat(50));

    await gzip(filename, gzipFilename);

    await gunzip(gzipFilename);

    let gunzipStats = null;
    try {
      gunzipStats = await fs.promises.stat(filename);
      expect(gunzipStats).toBeDefined();
    } catch (err) {
      fail(err);
    }

    await fs.promises.unlink(filename);
  });

  it("renames output file as .gunzip if no .gz", async () => {
    expect.assertions(1);
    const filename = path.join(__dirname, Date.now().toString());
    const gzipFilename = filename + ".any";
    await fs.promises.writeFile(filename, "a".repeat(50));

    await gzip(filename, gzipFilename);

    await gunzip(gzipFilename);

    let gunzipStats = null;
    try {
      gunzipStats = await fs.promises.stat(gzipFilename + ".gunzip");
      expect(gunzipStats).toBeDefined();
    } catch (err) {
      fail(err);
    }

    await fs.promises.unlink(gzipFilename + ".gunzip");
  });
});
