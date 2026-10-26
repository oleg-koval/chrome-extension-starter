import { cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";

const outputDirectory = new URL("../dist/", import.meta.url);
const publicDirectory = new URL("../public/", import.meta.url);

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });
await cp(publicDirectory, outputDirectory, { recursive: true });
await build({
  bundle: true,
  entryPoints: { popup: "src/popup/popup.ts" },
  format: "iife",
  outdir: "dist",
  platform: "browser",
  target: "chrome120",
});
