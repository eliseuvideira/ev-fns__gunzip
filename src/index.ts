import zlib from "zlib";
import fs from "fs";
import { pipe } from "@ev-fns/pipe";

export const gunzip = async (
  input: string,
  output = /\.gz$/.test(input) ? input.replace(/\.gz$/, "") : input + ".gunzip"
) => {
  const gunzipper = zlib.createGunzip();
  const source = fs.createReadStream(input);
  const destination = fs.createWriteStream(output);
  await pipe(source, gunzipper, destination);
  await fs.promises.unlink(input);
};
