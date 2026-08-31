# DIBK design system

We take [Designsystemet](https://designsystemet.no/), Digdir's Norwegian government design
system, put the DIBK theme on it, add the brand components and icons that DIBK needs and
Designsystemet doesn't have, and publish the lot as one npm package. The point is that a
DIBK app installs one thing and looks like DIBK, instead of every team re-deriving the
theme and rebuilding a header.

Live demo: <https://arkitektum.github.io/dibk-designsystemet/>

This repo is a pnpm workspace with the library and a demo app in it. If you're building an
app on the design system, start here; the [package
README](packages/designsystem/README.md) has the full reference once you need it.

## Quick start

```sh
npm install dibk-designsystemet \
  react react-dom @digdir/designsystemet-react @digdir/designsystemet-css @fontsource/poppins
```

Everything after the package name is a peer dependency, so your app owns one copy of React,
of Designsystemet and of the font. Keep the two `@digdir/designsystemet-*` packages on the
same version, npm won't tell you if they drift.

Two CSS imports at your app entry and the wiring is done:

```ts
import "dibk-designsystemet/fonts.css";  // Poppins @font-face declarations
import "dibk-designsystemet/styles.css"; // everything else, in cascade order
```

Both stylesheets reference their dependencies by bare specifier, so you need a bundler that
resolves those inside CSS. Vite, webpack with css-loader, Next, Parcel and esbuild all do.

Then build a page. `DibkAppShell` is the frame: it wires up header, mega-menu, content
container and footer, and it owns the page width, so your pages are content and nothing
else.

```tsx
import { DibkAppShell, Heading, Paragraph, Button, Card } from "dibk-designsystemet";
import { Stack, Grid } from "dibk-designsystemet/layout";

export function Page() {
  return (
    <DibkAppShell title="Min app" menuItems={menuItems} footerColumns={footerColumns}>
      <Stack gap="lg">
        <Heading level={1} data-size="lg">Byggesak</Heading>
        <Grid gap="md">
          <Card data-dibk-color="blue">
            <Heading level={2} data-size="sm">Bygge, rive eller endre?</Heading>
            <Paragraph>Finn ut om du må søke.</Paragraph>
            <Button variant="primary">Start søknad</Button>
          </Card>
        </Grid>
      </Stack>
    </DibkAppShell>
  );
}
```

We re-export all of `@digdir/designsystemet-react`, already themed, so import it from
`dibk-designsystemet` and don't reach for the base package. Our own components are prefixed
`Dibk` so you always know whose is whose: `DibkAppShell`, `DibkHeader`, `DibkMegaMenu`,
`DibkMenuSection`, `DibkSearch`, `DibkFooter`, `DibkLogo`, `DibkIconLinkList`,
`DibkSectionHeader`, `DibkFeedbackWidget`, `DibkAccountMenu`, `DibkMenuLogin`,
`DibkCopyButton`, `DibkCopyIconButton`, `DibkCodeBlock`.

The layout primitives (`Stack`, `Cluster`, `Sidebar`, `Grid`) are unprefixed, because
layout is nobody's brand, and they sit on the `/layout` subpath out of the way of
Designsystemet's namespace. The brand icons are on `/icons`.

| Entry | Contents |
|-------|----------|
| `dibk-designsystemet` | Components and types, ESM + CJS |
| `dibk-designsystemet/layout` | `Stack`, `Cluster`, `Sidebar`, `Grid` |
| `dibk-designsystemet/icons` | DIBK brand icons |
| `dibk-designsystemet/styles.css` | Everything: DS component CSS, theme, base, overrides, layout |
| `dibk-designsystemet/fonts.css` | Poppins `@font-face` declarations |
| `dibk-designsystemet/theme.css`, `/index.css`, `/layout.css` | The pieces of `styles.css`, if you need your own cascade |
| `dibk-designsystemet/swagger.css` | Standalone Swagger UI skin |

The component reference, the page-layout rules, the theming tokens, the icon list and the
Swagger UI setup are all in the [package README](packages/designsystem/README.md).

## The design language

- Accent navy `#003045`, and `border-radius: 0` everywhere. The square corners are the
  signature trait, so don't round anything.
- Poppins, self-hosted through `@fontsource/poppins` (OFL-1.1). We tone the weight tokens
  down a notch because Poppins renders heavy. We don't ship PP Mori, the font dibk.no uses.
- Pale surface colors as `--dibk-surface-{blue,green,orange,grey,pink}`. They're picked for
  the brand, not derived from the accent, so you won't find them by generating a palette.

## What's in the repo

- `packages/designsystem` (`dibk-designsystemet`) is the library we publish. It re-exports
  all of `@digdir/designsystemet-react`, adds the DIBK components, and ships the generated
  theme, base and override CSS along with the layout primitives and brand icons.
- `apps/demo` (`dibk-designsystemet-demo`) is a runnable Vite app and the best way to see
  what you get. `#/` explains the design system, `#/nettsted` is a full public-facing
  example site and `#/komponenter` is the component catalog. Everything in the examples is
  invented, none of it is real DIBK content.

The demo aliases each JS entry to the library source, so editing a component hot-reloads
without a rebuild. The CSS entries are generated into `dist/`, so run `pnpm build` once
before you start.

## Working on it

```sh
corepack enable pnpm   # pnpm comes from corepack, pinned by packageManager
pnpm install
pnpm build             # icons codegen, tsup, then the generated theme, styles and fonts CSS
pnpm demo              # demo app on the Vite dev server
pnpm types             # typecheck every workspace project
pnpm theme             # regenerate dist/theme.css only
pnpm icons             # regenerate the icon components from svg/ only
```

Most of what you'd want to change has a generator behind it, so edit the input and not the
output:

- **The theme.** `pnpm theme` runs `packages/designsystem/scripts/build-theme.mjs`, which
  turns the brand color, the radius and the font into `dist/theme.css` using
  `formatThemeCSS` from `@digdir/designsystemet/tokens`. Edit the script, not the CSS.
- **The icons.** The raw SVGs in `packages/designsystem/svg/` are the source of truth and
  `pnpm icons` regenerates `src/icons/` from them.
- **A stock Designsystemet component that looks wrong for DIBK.** Add a rule to
  `packages/designsystem/src/overrides.css`. Designsystemet's CSS sits in `@layer ds`, so a
  plain unlayered rule there wins with no specificity games and no `!important`.

CI runs on every push and pull request: typecheck, build the library, build the demo, and
lint the published manifest with `publint`. Pushes to `main` deploy the demo to GitHub
Pages.

Missing a component, or found one that fights you? Open an
[issue](https://github.com/Arkitektum/dibk-designsystemet/issues).

## License

Copyright DIBK. All rights reserved. See [LICENSE.md](LICENSE.md).

## Publishing

We publish to public npmjs as `dibk-designsystemet`, unscoped. `pnpm build` runs from
`prepublishOnly`, so a tarball can't ship a stale or empty `dist/`.

Check the package contract before you release:

```sh
cd packages/designsystem
npx publint                              # manifest and exports-map lint
npm pack --dry-run                       # what actually ships
npx @arethetypeswrong/cli $(npm pack --pack-destination /tmp --json | head -1)
```
