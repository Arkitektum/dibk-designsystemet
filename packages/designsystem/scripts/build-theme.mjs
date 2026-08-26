// Generates the DIBK theme CSS (the --ds-* custom properties) from a brand color.
// Dynamic, one-shot path: no intermediate token JSON files written.
// Re-run on every @digdir/designsystemet upgrade; output is a build artifact.
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { formatThemeCSS } from "@digdir/designsystemet/tokens";

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, "../dist");

// The DIBK brand inputs. borderRadius 0 is the signature trait (everything square).
const css = await formatThemeCSS({
  name: "dibk",
  colors: {
    main: { accent: "#003045" }, // DIBK navy (blue-800)
    neutral: "#6b6560", // warm gray, echoes DIBK gray scale
    support: { brand1: "#5ccb35" }, // DIBK green accent
  },
  // The brand font, self-hosted by the app via @fontsource/poppins.
  typography: {
    fontFamily:
      'Poppins, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  borderRadius: 0,
});

await mkdir(distDir, { recursive: true });
await writeFile(resolve(distDir, "theme.css"), css);
console.log(`Wrote dist/theme.css (${css.length} chars)`);
