# dibk-designsystemet

The DIBK design system: [Designsystemet](https://designsystemet.no/) (Digdir's
Norwegian government design system) wrapped with a **DIBK theme** and **DIBK brand
components**, shipped as a single package.

Get the whole Designsystemet component set re-exported and DIBK-themed (navy
`#003045`, square corners, Poppins), plus the brand components (header, footer,
mega-menu, logo, …) that have no equivalent in Designsystemet, plus the DIBK brand
icons and a set of layout primitives.

```tsx
import { Button, Card, Table, DibkHeader, DibkFooter } from "dibk-designsystemet";
```

## Install

Dual ESM + CJS, published to public npmjs. No registry configuration needed.

```sh
npm install dibk-designsystemet \
  react react-dom @digdir/designsystemet-react @digdir/designsystemet-css @fontsource/poppins
```

Everything after the package name is a **peer dependency**, so your app owns exactly
one copy of each:

| Peer | Why it is a peer, not bundled |
|---|---|
| `react`, `react-dom` | two copies of React means two context registries and dead hooks |
| `@digdir/designsystemet-react` | its components are re-exported from here, so a second copy would be a second, differently-styled component set |
| `@digdir/designsystemet-css` | pulled in by `styles.css` from *your* node_modules, so it can never drift from the React package's version |
| `@fontsource/poppins` | the brand font, so you can swap it (see [Fonts](#fonts)) |

Keep the two `@digdir/designsystemet-*` packages on the **same version**. Their CSS
class contract is version-coupled upstream and npm cannot enforce it for you.

## Setup

Two CSS imports at your app entry:

```ts
import "dibk-designsystemet/fonts.css";  // Poppins @font-face declarations
import "dibk-designsystemet/styles.css"; // everything else, in cascade order
```

That is the whole wiring. `styles.css` pulls in Designsystemet's component CSS, the
DIBK theme tokens, the brand base (which applies the font to `<body>`), the component
styles, the tailoring of Designsystemet components, and the layout primitives, in the
right cascade order.

The JS entries deliberately carry **no** CSS import, so they can be loaded by Node for
SSR and by the CJS build. CSS delivery is always an explicit import, the same contract
Designsystemet itself uses.

`styles.css` and `fonts.css` reference their dependencies by bare specifier, so they
need a bundler that resolves those inside CSS (Vite, webpack with css-loader, Next,
Parcel, esbuild). A plain `<link rel="stylesheet">` with no build step will not work.

## Usage

Everything from `@digdir/designsystemet-react` is re-exported, already themed — import
it from `dibk-designsystemet` instead of reaching for the base package:

```tsx
import { Heading, Paragraph, Button, Card, Alert, Details } from "dibk-designsystemet";

function Example() {
  return (
    <Card data-dibk-color="blue">
      <Heading level={2} data-size="sm">Bygge, rive eller endre?</Heading>
      <Paragraph>Finn ut om du må søke.</Paragraph>
      <Button variant="primary">Start søknad</Button>
    </Card>
  );
}
```

The DIBK brand components are prefixed `Dibk` so it's always clear what's "ours" vs
Designsystemet's:

```tsx
import { DibkHeader, DibkMegaMenu, DibkFooter } from "dibk-designsystemet";
```

| Component | What it is |
|-----------|------------|
| `DibkAppShell` | Page frame: header + mega-menu + content container + footer |
| `DibkHeader` | Top bar: logo, "Søk" + "Meny" toggles |
| `DibkMegaMenu` | Full-viewport navigation + search overlay |
| `DibkMenuSection` | One titled link column inside the mega-menu |
| `DibkSearch` | DIBK search widget: underlined field + magnifier in a quiet panel |
| `DibkFooter` | Navy four-column link footer |
| `DibkLogo` | DIBK roofline mark + wordmark (`variant="full" \| "mark"`) |
| `DibkIconLinkList` | Icon + bold-link list (`columns={1 \| 2 \| 3}`, `chevron={false}` to drop the arrows) |
| `DibkSectionHeader` | Large icon + `h1` + hairline divider |
| `DibkFeedbackWidget` | "Fant du det du lette etter?" Ja/Nei prompt |
| `DibkAccountMenu` | Header account control: initials avatar + account dropdown (name, email, role, Logg ut) |
| `DibkMenuLogin` | "Logg inn" row for the mega-menu's `menuExtra` slot |
| `DibkCopyButton` / `DibkCopyIconButton` | "Kopier" button that flips to "✓ Kopiert!"; quiet icon-only variant |
| `DibkCodeBlock` | Labelled monospace block with an optional Kopier button |

All brand components forward `className`, `style`, `ref`, `data-*`, and the rest of
their root element's props, so they compose into app layouts.

## Page layout: use the shell

**`DibkAppShell` is the page frame.** It wires the header, mega-menu, content
container and footer, and it owns the page width: children render inside the
canonical container, so everything automatically aligns with the header and the
footer at every viewport width. An app writes one thin shell wrapper and its
pages render only content:

```tsx
<DibkAppShell
  title="Min app"
  shortcuts={[{ label: "Snarvei", href: "/snarvei" }]}
  menuItems={menuItems}
  footerColumns={footerColumns}
>
  {/* page content — no max-widths, no side gutters */}
</DibkAppShell>
```

Under the hood, one page column is defined by two tokens (in `base.css`):

- `--dibk-container-max` — the container box max-width (`1400px`)
- `--dibk-container-pad` — the fluid side gutter inside that box
  (`clamp(1.25rem, 6vw, 6rem)`)

`DibkHeader`, `DibkMegaMenu`, `DibkFooter`, and `DibkAppShell`'s content
container all share this geometry, so their content edges coincide.

Two rules keep the alignment intact:

1. **Containers are invisible.** Never paint a background or border on an
   element with the container geometry — the color would fill the gutter padding
   and read as "wider than the top bar". Colored panels are *children* of the
   container: they span the content column, and their own padding is the panel's
   internal inset.
2. **Don't hand-roll page width.** Inside the shell, sections need no
   `max-width`/`margin: auto`/side padding for the page — the shell provides it.
   In the rare case a surface can't use the shell, replicate the container
   geometry exactly (`max-width: var(--dibk-container-max); margin-inline: auto;
   padding-inline: var(--dibk-container-pad)`) — a fixed side padding aligns at
   one window size and drifts at every other, because the gutter is fluid.

## Layout primitives

Four small, composable layout components (the [Every Layout](https://every-layout.dev/)
patterns) so apps don't hand-roll fl/grid CSS or invent their own spacing. They're
**unprefixed** — `Stack`, `Cluster`, `Sidebar`, `Grid` — because layout is generic; the
`Dibk` prefix stays for brand components. Zero runtime: each is a thin element with a
co-located CSS class (`l-*`). Spacing is one `gap` prop mapped to the `--ds-size-*`
scale, so vertical rhythm and group spacing come from the design tokens, not magic px.

They live on their own **subpath**, because the main barrel star-exports
`@digdir/designsystemet-react` and a name coming from two star-exports is dropped from
both rather than shadowing. Keeping these generic names out of that namespace means an
upstream release adding its own `Grid` or `Stack` cannot break your imports.

```tsx
import { Stack, Cluster, Sidebar, Grid } from "dibk-designsystemet/layout";
```

| Primitive | Use it for | Key props |
|-----------|-----------|-----------|
| `Stack` | Vertical flow — owns the space *between* children (form fields, page sections, lists). | `gap`, `align="start" \| "center"`, `as` |
| `Cluster` | A horizontal group that wraps (tag rows, toolbars). | `gap`, `align="baseline"`, `justify="between"`, `wrap={false}`, `as` |
| `Sidebar` | A fixed side column + fluid main that wraps to one column on its own — **no media query**. | `gap`, `as` |
| `Grid` | An intrinsic responsive grid (fits as many columns as fit). | `gap`, `as` |

`gap` is `"xs" \| "sm" \| "md" \| "lg"` (defaults to `"md"`), mapped to `--ds-size-2 / 3 /
5 / 8`. Every primitive is **polymorphic** via `as` (e.g. `as="ul"`, `as="header"`,
`as="section"`) and forwards `ref` + the rest of the element's props.

**Spacing belongs to the layout, not the component.** Don't put `margin` on a component to
space it from its neighbour — wrap the group in a `Stack` and let the `gap` do it. This
removes margin-collapsing surprises and keeps one spacing scale.

```tsx
// page sections
<Stack as="main" gap="lg">
  <Heading level={1} data-size="lg">Tittel</Heading>
  <Paragraph>Ingress…</Paragraph>
</Stack>

// a tag row (wraps)
<Cluster gap="xs">{tags.map((t) => <Tag key={t}>{t}</Tag>)}</Cluster>

// a tight, single-line control toolbar (Cluster wraps by default)
<Cluster justify="between">
  <p>Viser 1–12 av 134</p>
  <Cluster gap="sm" wrap={false}>
    <label htmlFor="sort">Sorter:</label>
    <Select id="sort">…</Select>
  </Cluster>
</Cluster>
```

### Sidebar

Mark the narrow column with `data-side`; the other child becomes the fluid main. It
reflows to a single column when the main can't keep its minimum width — driven by
content, not a viewport breakpoint.

```tsx
<Sidebar gap="lg">
  <nav data-side>…filters…</nav>
  <Stack gap="md">…results…</Stack>
</Sidebar>
```

Tune with CSS custom properties: `--l-sidebar-width` (side column, default `18rem`) and
`--l-sidebar-content-min` (main's minimum before wrapping, default `60%`).

### Grid

```tsx
<Grid gap="md">{cards}</Grid>
```

Set the minimum column width with `--l-grid-min` (default `16rem`); the grid fits as many
equal columns as that allows and reflows down with no breakpoints.

### Responsive components: container queries

The primitives reflow by available space, so most layouts need **no media queries**. When
a *component* must restyle by its own width (not the screen's), give it its own container
context and query that — so it's correct whether it's dropped in a wide `Stack` list or a
narrow `Grid` cell or `Sidebar`:

```css
.card-frame { container: card / inline-size; }      /* a wrapper the component renders */
@container card (min-width: 30rem) {
  .card { grid-template-columns: auto 1fr; }         /* reads the slot, not the viewport */
}
```

Note a `@container` query reads an **ancestor** marked `container-type`, never the element
itself — so the component renders `frame > content` and the content queries the frame. Keep
viewport media queries only for genuine page-level chrome.

## Theming

The theme is a set of `--ds-*` / `--dibk-*` CSS custom properties — no runtime, no
provider. DIBK signature:

- **Accent navy** `#003045`, **`border-radius: 0`** everywhere.
- **Poppins**, with weights toned down one notch (Poppins renders heavy).
- **Pale surface colors** as `--dibk-surface-{blue,green,orange,grey,pink}`.
- **Text and line colors**: `--dibk-color-ink` (body ink), `--dibk-color-meta`
  (warm grey for meta text), `--dibk-color-hairline` (subtle dividers).

### Card surfaces

Cards are flat (no border). Choose the background with `data-dibk-color` — a dedicated
attribute, so it tints only the panel and leaves buttons/headings navy (unlike
Designsystemet's `data-color`, which cascades the whole color family):

```tsx
<Card>…</Card>                       {/* white (default) */}
<Card data-dibk-color="blue">…</Card>
<Card data-dibk-color="green">…</Card>
<Card data-dibk-color="orange">…</Card>
<Card data-dibk-color="grey">…</Card>
<Card data-dibk-color="pink">…</Card>
```

### Changing the theme

`theme.css` is generated from a single brand color by
`scripts/build-theme.mjs` (via Designsystemet's `formatThemeCSS`). Don't hand-edit the
generated file — change the script and run `pnpm theme`. Component tailoring lives in
`src/overrides.css` as plain unlayered rules that win over Designsystemet's `@layer ds`
without `!important`.

## Icons

Thirteen DIBK brand illustrations as React components, on the `/icons` subpath. They
are **multi-colour** brand artwork (navy, orange, light blue, green), so they do not
follow `currentColor` and cannot be recoloured. For general UI iconography, use
Designsystemet's own icons, which come with `@digdir/designsystemet-react`.

```tsx
import { IconNabovarsel, dibkIcons } from "dibk-designsystemet/icons";

<IconNabovarsel width={40} height={40} />;
const Icon = dibkIcons["sentral-godkjenning"]; // name -> component, for data-driven lists
```

Available: `bygge-endre`, `byggevarer`, `byggteknisk`, `forskrift`, `forskrift-sak`,
`forskrift-tek`, `nabovarsel`, `peker-gronn`, `sentral-godkjenning`,
`sentraltgodkjent`, `skjema`, `skjema-og-soknadslosninger`, `tilsyn`. Importing a named
icon is tree-shakeable; importing the `dibkIcons` registry pulls in all thirteen.

## Fonts

The brand font is **Poppins**, delivered through `@fontsource/poppins` as a peer
dependency. PP Mori, the font used on dibk.no, is not distributed here.

`fonts.css` declares the latin and latin-ext subsets at weights 300 to 700 as woff2,
referencing the font files from your own `@fontsource/poppins`. `unicode-range` means a
browser only downloads the subsets and weights a page actually renders.

To use a different typeface, skip `fonts.css`, import `styles.css` alone, and set
`--ds-font-family` yourself.

## Swagger UI skin

`swagger.css` is a standalone DIBK skin for [Swagger UI](https://swagger.io/tools/swagger-ui/),
for apps that expose an API browser. Swagger UI ships its own DOM and its own bundle, so
this is plain static CSS that targets its class names, not a bundled entry. Your host
serves it as a static file and tells Swagger UI to inject it.

Two files have to end up on disk, with this layout, because the stylesheet's
`@font-face` URLs are **relative to the stylesheet**:

```
<served-root>/swagger-theme.css          <- dist/swagger.css from this package
<served-root>/fonts/poppins-latin-300-normal.woff2   <- from @fontsource/poppins
<served-root>/fonts/poppins-latin-400-normal.woff2
<served-root>/fonts/poppins-latin-500-normal.woff2
<served-root>/fonts/poppins-latin-600-normal.woff2
<served-root>/fonts/poppins-latin-700-normal.woff2
```

The fonts come from `@fontsource/poppins`, which you already have as a peer dependency;
this package does not bundle them, because Swagger UI has no bundler to resolve them
through. If you skip the fonts the skin still applies, it just falls back to system-ui.

Assemble the directory during your build, for example in a Docker stage that has already
run `npm ci`:

```dockerfile
RUN mkdir -p /assets/fonts \
 && cp node_modules/dibk-designsystemet/dist/swagger.css /assets/swagger-theme.css \
 && cp node_modules/@fontsource/poppins/files/poppins-latin-{300,400,500,600,700}-normal.woff2 \
       /assets/fonts/
```

Then serve that directory and inject the stylesheet. In ASP.NET:

```csharp
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider("/assets"),
    RequestPath = "/swagger-assets",
});

app.UseSwaggerUI(opts => opts.InjectStylesheet("/swagger-assets/swagger-theme.css"));
```

The `fonts/` directory resolves under the same prefix automatically, so nothing else
needs configuring.

## Package exports

| Entry | Contents |
|-------|----------|
| `dibk-designsystemet` | Components and types, ESM + CJS |
| `dibk-designsystemet/layout` | `Stack`, `Cluster`, `Sidebar`, `Grid` |
| `dibk-designsystemet/icons` | DIBK brand icons |
| `dibk-designsystemet/styles.css` | Everything: DS component CSS, theme, base, overrides, layout |
| `dibk-designsystemet/fonts.css` | Poppins `@font-face` declarations |
| `dibk-designsystemet/theme.css` | Theme tokens alone |
| `dibk-designsystemet/index.css` | Brand base, overrides and component CSS alone |
| `dibk-designsystemet/layout.css` | Layout primitive CSS alone |
| `dibk-designsystemet/swagger.css` | Standalone Swagger UI skin (see [above](#swagger-ui-skin)) |

The four granular CSS entries exist so an app that needs a different cascade can compose
it; `styles.css` is the one to reach for otherwise.

See `apps/storybook` for a component showcase and `apps/demo` for a runnable DIBK app
built on this package.
