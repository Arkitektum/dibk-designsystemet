import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Alias each JS entry to its SOURCE so editing components in
// packages/designsystem/src hot-reloads here without a rebuild.
//
// The patterns are anchored regexes, not bare strings: a string alias also matches
// the subpaths, so "dibk-designsystemet" would swallow "dibk-designsystemet/icons"
// and rewrite it to <src/index.ts>/icons. Anchoring also leaves the CSS subpaths
// alone, so they resolve through the real workspace link and its exports map.
const src = (file: string) =>
  fileURLToPath(new URL(`../../packages/designsystem/src/${file}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^dibk-designsystemet$/, replacement: src("index.ts") },
      { find: /^dibk-designsystemet\/layout$/, replacement: src("layout.ts") },
      { find: /^dibk-designsystemet\/icons$/, replacement: src("icons/index.ts") },
    ],
  },
});
