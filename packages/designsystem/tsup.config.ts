import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    layout: "src/layout.ts",
    icons: "src/icons/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  // `pnpm clean` runs ahead of tsup in the build script instead. tsup's own clean
  // would also delete theme.css / swagger.css / styles.css / fonts.css, which the
  // scripts that run *after* tsup generate, and it would wipe them on every
  // `tsup --watch` restart.
  clean: false,
  // Each entry is self-contained (the layout primitives and the icons are
  // standalone, not reachable from the barrel), so splitting would only add
  // empty shared chunks.
  splitting: false,
  // react, react-dom and @digdir/* are peer dependencies, which tsup externalises
  // automatically. A hand-maintained `external` list drifts: a peer added later
  // gets bundled unless someone remembers to update the list too.
  //
  // treeshake runs a Rollup pass after esbuild that strips the top-level "use
  // client" directive, so it stays off. Tree-shaking still happens in the
  // consumer's bundler via ESM plus the "sideEffects" field, and the three
  // separate entries already split the code by concern.
  treeshake: false,
  // The barrel and components are client components when used in RSC frameworks.
  banner: { js: '"use client";' },
});
