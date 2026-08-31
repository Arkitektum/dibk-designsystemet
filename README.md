# DIBK design system

Digdir's [Designsystemet](https://designsystemet.no/) with the DIBK theme applied, plus the
brand components and icons that DIBK needs and Designsystemet doesn't have, published as
one npm package. A DIBK app installs one thing and looks like DIBK, instead of every team
re-deriving the theme and rebuilding a header.

Live demo: <https://arkitektum.github.io/dibk-designsystemet/>

This repo is a pnpm workspace holding the library and a demo app.

## Quick start

```sh
npm install dibk-designsystemet \
  react react-dom @digdir/designsystemet-react @digdir/designsystemet-css @fontsource/poppins
```

Everything after the package name is a peer dependency, so the consuming app owns exactly
one copy of React, of Designsystemet and of the font. Keep the two `@digdir/designsystemet-*`
packages on the same version: their CSS class contract is version-coupled upstream, and npm
won't catch a mismatch.

Two CSS imports at the app entry:

```ts
import "dibk-designsystemet/fonts.css";  // Poppins @font-face declarations
import "dibk-designsystemet/styles.css"; // everything else, in cascade order
```

Both stylesheets reference their dependencies by bare specifier, so you need a bundler that
resolves those inside CSS: Vite, webpack with css-loader, Next, Parcel or esbuild. A plain
`<link rel="stylesheet">` with no build step won't work.

Then build a page. `DibkAppShell` is the frame: it wires up header, mega-menu, content
container and footer, and it owns the page width, so pages only have to render content.

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

All of `@digdir/designsystemet-react` is re-exported and already themed, so import it from
`dibk-designsystemet` rather than the base package. The DIBK additions are prefixed `Dibk`,
and `DibkAppShell`, `DibkHeader`, `DibkMegaMenu` and `DibkFooter` do most of the work.

The layout primitives (`Stack`, `Cluster`, `Sidebar`, `Grid`) are unprefixed, because
layout is generic, and they sit on the `/layout` subpath out of the way of
Designsystemet's namespace. The brand icons are on `/icons`.

| Entry | Contents |
|-------|----------|
| `dibk-designsystemet` | Components and types, ESM + CJS |
| `dibk-designsystemet/layout` | `Stack`, `Cluster`, `Sidebar`, `Grid` |
| `dibk-designsystemet/icons` | DIBK brand icons |
| `dibk-designsystemet/styles.css` | Everything: DS component CSS, theme, base, overrides, layout |
| `dibk-designsystemet/fonts.css` | Poppins `@font-face` declarations |
| `dibk-designsystemet/theme.css`, `/index.css`, `/layout.css` | The pieces of `styles.css`, for a custom cascade |
| `dibk-designsystemet/swagger.css` | Standalone Swagger UI skin |

The component reference, the page-layout rules, the theming tokens, the icon list and the
Swagger UI setup are all in the [package README](packages/designsystem/README.md).

## What's in the repo

- `packages/designsystem` (`dibk-designsystemet`) is the published library. It re-exports
  all of `@digdir/designsystemet-react`, adds the DIBK components, and ships the generated
  theme, base and override CSS along with the layout primitives and brand icons.
- `apps/demo` (`dibk-designsystemet-demo`) is a runnable Vite app, and the quickest way to
  see the components in a real page. `#/` explains the design system, `#/nettsted` is a
  full public-facing example site and `#/komponenter` is the component catalog. Everything
  in the examples is invented, none of it is real DIBK content.

The demo aliases each JS entry to the library source, so editing a component hot-reloads
without a rebuild. The CSS entries are generated into `dist/`, so run `pnpm build` once
first.

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

The theme, the icons and the CSS entries are all generated, so there's an input to edit in
each case rather than the output. [DEVELOPING.md](DEVELOPING.md) covers that, how
Designsystemet is tailored to the DIBK look, the page geometry and the layout primitives.

CI runs on every push and pull request: typecheck, build the library, build the demo, and
lint the published manifest with `publint`. Pushes to `main` deploy the demo to GitHub
Pages.

The package is published to public npmjs as `dibk-designsystemet`, unscoped, from a GitHub
Release. See [DEVELOPING.md](DEVELOPING.md#releasing).

Bug reports and requests go in the
[issue tracker](https://github.com/Arkitektum/dibk-designsystemet/issues).

## License

Copyright DIBK. All rights reserved. See [LICENSE.md](LICENSE.md).
