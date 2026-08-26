import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";

const here = dirname(fileURLToPath(import.meta.url));

// Point each JS entry at the library SOURCE so editing components in
// packages/designsystem/src reflects live in Storybook without a rebuild.
//
// The patterns are anchored regexes, not bare strings: a string alias also matches
// the subpaths, so "dibk-designsystemet" would swallow "dibk-designsystemet/icons"
// and rewrite it to <src/index.ts>/icons. Anchoring also leaves the CSS subpaths
// alone, so they resolve through the real workspace link and its exports map.
const src = (file: string) => resolve(here, "../../../packages/designsystem/src", file);

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  async viteFinal(viteConfig) {
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = [
      ...(Array.isArray(viteConfig.resolve.alias) ? viteConfig.resolve.alias : []),
      { find: /^dibk-designsystemet$/, replacement: src("index.ts") },
      { find: /^dibk-designsystemet\/layout$/, replacement: src("layout.ts") },
      { find: /^dibk-designsystemet\/icons$/, replacement: src("icons/index.ts") },
    ];
    return viteConfig;
  },
};

export default config;
