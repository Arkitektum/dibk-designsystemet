# DIBK design system

Designsystemet (Digdir) wrapped with a DIBK theme, DIBK brand components and DIBK
brand icons, for use across DIBK apps. pnpm workspace.

## Layout

- `packages/designsystem` (`dibk-designsystemet`) - the published library. Re-exports
  all of `@digdir/designsystemet-react` and adds DIBK components (Header, Footer,
  MegaMenu, IconLinkList, SectionHeader, FeedbackWidget, Logo). Ships the DIBK theme
  CSS, the layout primitives on a `/layout` subpath, and the brand icons on `/icons`.
  See its [README](packages/designsystem/README.md) for the consumer-facing docs.
- `apps/demo` (`dibk-designsystemet-demo`) - a runnable app. `#/` is an information
  page about the design system: what it ships, how to install it, and links to the
  examples. The
  examples are `#/nettsted` (a full public-facing site) and `#/komponenter`
  (component catalog). Content in the examples is invented.

## Commands

```sh
pnpm install
pnpm build          # build the library (icons codegen + tsup + generated CSS entries)
pnpm theme          # regenerate dist/theme.css from the brand color only
pnpm icons          # regenerate the icon components from svg/
pnpm types          # typecheck every workspace project
pnpm demo           # demo page on Vite dev server
```

## Theme

`pnpm theme` runs `packages/designsystem/scripts/build-theme.mjs`, which calls
`formatThemeCSS` from `@digdir/designsystemet/tokens` to generate `dist/theme.css`
from the brand color. DIBK signature: accent navy `#003045`, `borderRadius: 0`.

## Font

The font stack is `Poppins, system-ui, ..., sans-serif`. The brand font is
**Poppins**, self-hosted via `@fontsource/poppins` (OFL-1.1), a peer dependency.

`packages/designsystem/scripts/build-fonts-entry.mjs` generates `dist/fonts.css` from
fontsource's own CSS, keeping the latin and latin-ext subsets at weights 300 to 700 and
preserving upstream's `unicode-range` values. The package's `base.css` applies
`--ds-font-family` to `body` (Designsystemet only fonts its own components), so apps get
the brand font from two imports:

```ts
import "dibk-designsystemet/fonts.css";
import "dibk-designsystemet/styles.css";
```

## Publishing

Published to public npmjs as `dibk-designsystemet`, unscoped. `pnpm build` runs from
`prepublishOnly`, so the tarball can never ship a stale or empty `dist/`.

Verify the package contract before releasing:

```sh
cd packages/designsystem
npx publint                              # manifest and exports-map lint
npm pack --dry-run                       # what actually ships
npx @arethetypeswrong/cli $(npm pack --pack-destination /tmp --json | head -1)
```
