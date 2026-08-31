# dibk-designsystemet

The DIBK design system. Takes [Designsystemet](https://designsystemet.no/), Digdir's design
system, applies the DIBK theme and adds the brand components, brand icons and layout
primitives that Designsystemet has no equivalent for.

```tsx
import { Button, Card, Table, DibkHeader, DibkFooter } from "dibk-designsystemet";
```

## Install

```sh
npm install dibk-designsystemet \
  react react-dom @digdir/designsystemet-react @digdir/designsystemet-css @fontsource/poppins
```

Everything after the package name is a peer dependency, so the consuming app owns exactly
one copy of React, of Designsystemet and of the font. Keep the two `@digdir/designsystemet-*`
packages on the same version: their CSS class contract is version-coupled upstream, and npm
won't catch a mismatch.

Published to public npmjs, so there's no registry configuration to do, and the package
ships both ESM and CJS.

## Setup

Two CSS imports at the app entry:

```ts
import "dibk-designsystemet/fonts.css";  // Poppins @font-face declarations
import "dibk-designsystemet/styles.css"; // everything else, in cascade order
```

`styles.css` pulls in Designsystemet's component CSS, the DIBK theme tokens, the brand base
(which puts the font on `<body>`), the component styles, the DIBK tailoring of Designsystemet's
components, and the layout primitives, in that order.

The JS entries import no CSS of their own, so Node can load them for SSR and so the CJS
build works. CSS delivery is always an explicit import, the same contract Designsystemet
uses.

Both stylesheets reference their dependencies by bare specifier, so you need a bundler that
resolves those inside CSS: Vite, webpack with css-loader, Next, Parcel or esbuild. A plain
`<link rel="stylesheet">` with no build step won't work.

## Usage

Everything from `@digdir/designsystemet-react` is re-exported and already themed, so import
it from here rather than from the base package:

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

The DIBK components are prefixed `Dibk`, so it stays obvious which are which:

```tsx
import { DibkHeader, DibkMegaMenu, DibkFooter } from "dibk-designsystemet";
```

| Component | What it is |
|-----------|------------|
| `DibkAppShell` | Page frame: header + mega-menu + content container + footer |
| `DibkHeader` | Top bar: logo, "Søk" and "Meny" toggles |
| `DibkMegaMenu` | Full-viewport navigation and search overlay |
| `DibkMenuSection` | One titled link column inside the mega-menu |
| `DibkSearch` | DIBK search widget: underlined field and magnifier in a quiet panel |
| `DibkFooter` | Navy four-column link footer |
| `DibkLogo` | DIBK roofline mark and wordmark (`variant="full" \| "mark"`) |
| `DibkIconLinkList` | Icon + bold-link list (`columns={1 \| 2 \| 3}`, `chevron={false}` to drop the arrows) |
| `DibkSectionHeader` | Large icon, `h1` and hairline divider |
| `DibkFeedbackWidget` | "Fant du det du lette etter?" Ja/Nei prompt |
| `DibkAccountMenu` | Header account control: initials avatar and dropdown (name, email, role, Logg ut) |
| `DibkMenuLogin` | "Logg inn" row for the mega-menu's `menuExtra` slot |
| `DibkCopyButton` / `DibkCopyIconButton` | "Kopier" button that flips to "✓ Kopiert!", plus a quiet icon-only variant |
| `DibkCodeBlock` | Labeled monospace block with an optional Kopier button |

All of them forward `className`, `style`, `ref`, `data-*` and the rest of their root
element's props, so they'll compose into whatever layout you have.

## Page layout

`DibkAppShell` is the page frame. It wires up the header, mega-menu, content container and
footer, and it owns the page width: children render inside the canonical container, so they
line up with the header and footer at every viewport width. Write one thin shell wrapper
per app and let the pages render content only.

```tsx
<DibkAppShell
  title="Min app"
  shortcuts={[{ label: "Snarvei", href: "/snarvei" }]}
  menuItems={menuItems}
  footerColumns={footerColumns}
>
  {/* page content, no max-widths, no side gutters */}
</DibkAppShell>
```

`DibkHeader`, `DibkMegaMenu`, `DibkFooter` and the shell's content container share the same
page geometry, which is what makes their content edges line up. Inside the shell,
sections need no `max-width`, `margin: auto` or side padding; adding them will break the
alignment, because the side gutter is fluid rather than a fixed width.

## Layout primitives

Four composable layout components, the [Every Layout](https://every-layout.dev/) patterns,
so you don't hand-roll flex and grid CSS or invent a spacing scale per app. They have no
runtime, and spacing is a single `gap` prop mapped onto the design tokens.

They're unprefixed, because layout is generic, and they live on their own subpath so their
names can't collide with Designsystemet's.

```tsx
import { Stack, Cluster, Sidebar, Grid } from "dibk-designsystemet/layout";
```

| Primitive | Use it for | Key props |
|-----------|-----------|-----------|
| `Stack` | Vertical flow. Owns the space *between* children (form fields, page sections, lists). | `gap`, `align="start" \| "center"`, `as` |
| `Cluster` | A horizontal group that wraps (tag rows, toolbars). | `gap`, `align="baseline"`, `justify="between"`, `wrap={false}`, `as` |
| `Sidebar` | A fixed side column and a fluid main that wraps to one column on its own, with no media query. | `gap`, `as` |
| `Grid` | An intrinsic responsive grid that fits as many columns as will fit. | `gap`, `as` |

`gap` is `"xs" | "sm" | "md" | "lg"`, defaults to `"md"`, and maps to `--ds-size-2 / 3 / 5 /
8`. Every primitive is polymorphic via `as` (`as="ul"`, `as="header"`, `as="section"`) and
forwards `ref` plus the element's own props.

Spacing belongs to the layout, not to the component. Rather than putting a `margin` on a
component to push it off its neighbour, wrap the group in a `Stack` and let `gap` do it,
which keeps one spacing scale and avoids margin-collapsing surprises.

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
  <p>Viser 1-12 av 134</p>
  <Cluster gap="sm" wrap={false}>
    <label htmlFor="sort">Sorter:</label>
    <Select id="sort">…</Select>
  </Cluster>
</Cluster>
```

### Sidebar

Mark the narrow column with `data-side`; the other child is the fluid main. It reflows to a
single column when main can no longer keep its minimum width, so it's driven by content
rather than by a viewport breakpoint.

```tsx
<Sidebar gap="lg">
  <nav data-side>…filters…</nav>
  <Stack gap="md">…results…</Stack>
</Sidebar>
```

Tune it with `--l-sidebar-width` (side column, default `18rem`) and
`--l-sidebar-content-min` (main's minimum before wrapping, default `60%`).

### Grid

```tsx
<Grid gap="md">{cards}</Grid>
```

`--l-grid-min` sets the minimum column width (default `16rem`). The grid fits as many equal
columns as that allows and reflows down without breakpoints.

## Theming

The theme is a set of `--ds-*` and `--dibk-*` CSS custom properties, so there's no runtime
and no provider component to wrap the app in. The DIBK signature:

- Accent navy `#003045` and `border-radius: 0` everywhere.
- Poppins, with the weight tokens toned down a notch, because Poppins renders heavy.
- Pale surface colors as `--dibk-surface-{blue,green,orange,grey,pink}`.
- Text and line colors: `--dibk-color-ink` for body ink, `--dibk-color-meta` for the warm
  grey used on meta text, `--dibk-color-hairline` for subtle dividers.

### Card surfaces

Cards are flat, with no border. Pick the background with `data-dibk-color`, which tints the
panel and leaves buttons and headings navy. It's a dedicated attribute because
Designsystemet's `data-color` would cascade the whole color family and turn the buttons
blue too.

```tsx
<Card>…</Card>                       {/* white (default) */}
<Card data-dibk-color="blue">…</Card>
<Card data-dibk-color="green">…</Card>
<Card data-dibk-color="orange">…</Card>
<Card data-dibk-color="grey">…</Card>
<Card data-dibk-color="pink">…</Card>
```

## Icons

Thirteen DIBK brand illustrations as React components, on the `/icons` subpath. They're
multi-color brand artwork (navy, orange, light blue, green), so they ignore `currentColor`
and you can't recolor them. For general UI iconography use Designsystemet's icons, which
come with `@digdir/designsystemet-react`.

```tsx
import { IconNabovarsel, dibkIcons } from "dibk-designsystemet/icons";

<IconNabovarsel width={40} height={40} />;
const Icon = dibkIcons["sentral-godkjenning"]; // name -> component, for data-driven lists
```

Available: `bygge-endre`, `byggevarer`, `byggteknisk`, `forskrift`, `forskrift-sak`,
`forskrift-tek`, `nabovarsel`, `peker-gronn`, `sentral-godkjenning`, `sentraltgodkjent`,
`skjema`, `skjema-og-soknadslosninger`, `tilsyn`. A named import is tree-shakeable; the
`dibkIcons` registry pulls in all thirteen.

## Fonts

The brand font is Poppins, delivered through `@fontsource/poppins` (OFL-1.1) as a peer
dependency.

`fonts.css` declares the latin and latin-ext subsets at weights 300 to 700 as woff2,
pointing at the font files in the installed `@fontsource/poppins`. The `unicode-range`
declarations mean a browser only downloads the subsets and weights a page actually renders.

For a different typeface, skip `fonts.css`, import `styles.css` alone and set
`--ds-font-family` yourself.

## Swagger UI skin

`swagger.css` is a standalone DIBK skin for [Swagger UI](https://swagger.io/tools/swagger-ui/),
for apps that expose an API browser. Swagger UI brings its own DOM and its own bundle, so
this is plain static CSS targeting its class names rather than a bundled entry: the host
serves it as a static file and tells Swagger UI to inject it.

Two things have to end up on disk in this layout, because the stylesheet's `@font-face`
URLs are relative to the stylesheet:

```
<served-root>/swagger-theme.css          <- dist/swagger.css from this package
<served-root>/fonts/poppins-latin-300-normal.woff2   <- from @fontsource/poppins
<served-root>/fonts/poppins-latin-400-normal.woff2
<served-root>/fonts/poppins-latin-500-normal.woff2
<served-root>/fonts/poppins-latin-600-normal.woff2
<served-root>/fonts/poppins-latin-700-normal.woff2
```

The fonts come from the `@fontsource/poppins` already installed as a peer dependency. They
are not bundled here, because Swagger UI has no bundler to resolve them through. Skip the
fonts and the skin still applies, it just falls back to system-ui.

Assemble the directory during the build, for example in a Docker stage that has already
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

The `fonts/` directory resolves under the same prefix automatically, so there's nothing
else to configure.

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

Use `styles.css` unless you have a reason not to; the granular CSS entries are there for
apps that need to compose a different cascade.

## Demo and support

`apps/demo` in the repository is a runnable app built on this package: an information page,
a component catalog and a full example site. The
[repository README](https://github.com/Arkitektum/dibk-designsystemet#readme) says how to
run it.

Missing a component, or having trouble with one? Open an
[issue](https://github.com/Arkitektum/dibk-designsystemet/issues).

## License

Copyright DIBK. All rights reserved. See `LICENSE.md`.
