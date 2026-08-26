// Copies src/swagger.css to dist/swagger.css (the "./swagger.css" export).
//
// The skin is not run through tsup/esbuild: esbuild would try to resolve the
// @font-face url()s as build-time assets, and there is nothing to resolve them to.
// It is hand-authored static CSS with baked brand values and relative font URLs, so a
// plain copy is correct.
//
// The Poppins font files are deliberately NOT bundled. Swagger UI is served as static
// files by a host with no bundler, so the fonts have to be real paths the host lays out
// beside the stylesheet (a `fonts/` directory). Copying them here would duplicate a
// peer dependency every consumer already has, and would make this package a
// redistributor of OFL-1.1 font binaries for the sake of one consumer in ten. See the
// "Swagger UI skin" section of the README for the host contract.
import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "../dist");

await mkdir(distDir, { recursive: true });
await copyFile(resolve(here, "../src/swagger.css"), resolve(distDir, "swagger.css"));
