# Developing

Internals of the design system: how the generated files are produced, how Designsystemet is
tailored, and the conventions the custom components follow. For consumer documentation see
the [package README](packages/designsystem/README.md).

## Workspace

pnpm workspace with two projects: `packages/designsystem`, the published library, and
`apps/demo`, a Vite app used to see the components in a real page.

```sh
corepack enable pnpm
pnpm install
pnpm build             # icons codegen, tsup, then the generated theme, styles and fonts CSS
pnpm demo              # demo app on the Vite dev server
pnpm types             # typecheck every workspace project
pnpm theme             # regenerate dist/theme.css only
pnpm icons             # regenerate the icon components from svg/ only
```

The demo aliases each JS entry to the library source, so editing a component hot-reloads
without a rebuild. The aliases are anchored regexes, one per subpath: a bare string alias
also matches the subpaths and would rewrite `dibk-designsystemet/icons` to
`<src/index.ts>/icons`. Anchoring also leaves the CSS subpaths to resolve through the real
workspace link. Those CSS entries are generated into `dist/`, so run `pnpm build` once
before starting the demo.

## Generated files

Three things are generated, and each has an input you edit instead of the output.

**The theme.** `packages/designsystem/scripts/build-theme.mjs` calls `formatThemeCSS` from
`@digdir/designsystemet/tokens` to turn the brand color, the radius and the font into
`dist/theme.css`. Change the script and run `pnpm theme`; don't hand-edit the generated CSS.
Designsystemet's own `@digdir/designsystemet-theme` package is deprecated, so don't add it.

**The icons.** The raw SVGs in `packages/designsystem/svg/` are the source of truth.
`pnpm icons` regenerates `src/icons/` from them: it camelCases kebab attributes, namespaces
`<clipPath>` ids and converts inline `style` strings to JSX objects. It wipes `src/icons/`
first, which is why the SVGs live at the package root rather than inside it.

**The CSS entries.** `dist/styles.css` and `dist/fonts.css` are assembled by
`scripts/build-styles-entry.mjs` and `scripts/build-fonts-entry.mjs`. `styles.css`
`@import`s, in cascade order, `@digdir/designsystemet-css` by bare specifier so it resolves
from the consumer's node_modules, then `theme.css`, `index.css` and `layout.css`.

## Tailoring Designsystemet

To restyle a stock Designsystemet component to the DIBK look, add a rule to
`packages/designsystem/src/overrides.css`. Designsystemet's CSS lives in `@layer ds`, so
plain unlayered rules there win without needing high specificity or `!important`.

Already overridden: the global font-weight remap (Poppins renders heavy, so
`--ds-font-weight-regular/medium/semibold` become 300/400/500), letter-spacing, `Alert`
(border removed), `Card` (flat, background via `data-dibk-color`) and `Details` (pale blue
panels, chevron on the right).

`Card` uses a custom `data-dibk-color` attribute rather than Designsystemet's `data-color`
because `data-color` cascades the whole color family and would tint the buttons and headings
inside the card as well.

`src/base.css` applies `--ds-font-family` to `body`, since Designsystemet only fonts its own
components and plain text would otherwise fall back to serif.

## Custom components

`Dibk` prefix, one directory each under `packages/designsystem/src/components/`, with an
`index.tsx` and a co-located `Component.css` that the component imports. esbuild strips
those imports from the JS output and bundles them into `dist/index.css`.

Conventions every one of them follows:

- **Compose, don't reimplement.** Where Designsystemet has the primitive, wrap it and
  restyle it through the override pattern. The buttons are DS `Button`, and the mega-menu
  search field is DS `Search` flattened to the DIBK underline look.
- **Forward props and ref.** Each extends `ComponentPropsWithoutRef<...>` for its root
  element, merges `className`, spreads `...rest`, and is wrapped in `forwardRef`.
- **Reference tokens, never raw hex.** The `--dibk-*` custom properties in `src/base.css`
  are the single source of truth for the brand surfaces and ink; the navy accent comes from
  the generated theme as `--ds-color-accent-base-default`.
- **Weights come from `--ds-font-weight-*`**, not from numbers, so the global remap stays
  the one lever.

Shared decorative glyphs live in `src/components/icons.tsx` and are not exported.

## Page geometry

One page column, defined by two tokens in `base.css`:

- `--dibk-container-max`, the container's max-width (`1400px`)
- `--dibk-container-pad`, the fluid side gutter inside it (`clamp(1.25rem, 6vw, 6rem)`)

`DibkHeader`, `DibkMegaMenu`, `DibkFooter` and `DibkAppShell`'s content container all use
this geometry, which is what makes their content edges coincide. Two things break it:

1. **Painting a background or border on an element that has the container geometry.** The
   color fills the gutter padding too, and the panel reads as wider than the top bar.
   Colored panels belong *inside* the container: they span the content column, and their own
   padding is the panel's inset.
2. **Hand-rolling the page width.** Inside the shell, sections need no `max-width`,
   `margin: auto` or side padding. Where a surface genuinely can't use the shell, replicate
   the geometry exactly (`max-width: var(--dibk-container-max); margin-inline: auto;
   padding-inline: var(--dibk-container-pad)`). A fixed side padding aligns at one window
   size and drifts at every other, because the gutter is fluid.

## Layout primitives

`Stack`, `Cluster`, `Sidebar` and `Grid` live in `src/components/Layout/` and are the
exception to the `Dibk` prefix: layout is generic, so they are unprefixed and use a neutral
`l-*` CSS namespace.

They are published from `src/layout.ts` as the `./layout` subpath, **not** from the main
barrel. The barrel star-exports `@digdir/designsystemet-react`, and a name reachable through
two star-exports is dropped from both rather than shadowing, so an upstream release adding
its own `Grid` or `Stack` would silently break every consumer's imports.

Don't add a class-based grid framework. Responsiveness here is intrinsic: `Sidebar` and
`Grid` reflow with no media query.

### Container queries

Because the primitives reflow by available space, most layouts need no media queries. When a
component must restyle by its own width rather than the screen's, give it its own container
context and query that, so it behaves whether it lands in a wide `Stack` list, a narrow
`Grid` cell or a `Sidebar`:

```css
.card-frame { container: card / inline-size; }      /* a wrapper the component renders */
@container card (min-width: 30rem) {
  .card { grid-template-columns: auto 1fr; }         /* reads the slot, not the viewport */
}
```

A `@container` query reads an ancestor marked `container-type`, never the element itself,
which is why the component renders `frame > content` and the content queries the frame. Keep
viewport media queries for genuine page-level chrome.

## Releasing

Publishing runs from `.github/workflows/publish.yml` when a GitHub Release is published,
authenticated with npm trusted publishing over OIDC, so no npm token is stored in the
repository. The job refuses to run if the release tag and the package version disagree, and
prereleases go out under the `next` dist-tag.

Before releasing, bump the version in `packages/designsystem/package.json`, add a
`CHANGELOG.md` entry, and check the package contract:

```sh
cd packages/designsystem
npx publint                              # manifest and exports-map lint
npm pack --dry-run                       # what actually ships
npx @arethetypeswrong/cli $(npm pack --pack-destination /tmp --json | head -1)
```

Then tag `v<version>` and publish a GitHub Release on that tag.
