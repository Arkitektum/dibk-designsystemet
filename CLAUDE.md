# DIBK design system

Adapts **Designsystemet** (Digdir's design system) into a DIBK-branded design system for
DIBK's apps: a theme, brand components, and brand icons, all wrapping
`@digdir/designsystemet-react` so apps install one package.

**`DEVELOPING.md` is the internals doc** - generated files, the `overrides.css` pattern,
custom-component conventions, page geometry, layout primitives, releasing. Read it before
changing how anything is built. Keep the detail there and only the summary here; when the
two disagree, `DEVELOPING.md` wins.

`packages/designsystem/README.md` is the consumer-facing doc, published to npm. Keep
repo-only instructions (`pnpm` scripts, `src/` paths) out of it - they don't exist for
someone who installed the package.

## Workspace

pnpm workspace (`packages/*`, `apps/*`):

- `packages/designsystem` (`dibk-designsystemet`) - the published library. Re-exports
  **all** of `@digdir/designsystemet-react` (v1.15) and adds DIBK components. Dual ESM +
  CJS via tsup. React, react-dom, `@digdir/designsystemet-{react,css}` and
  `@fontsource/poppins` are peer dependencies. Three JS entries: the barrel (`.`), the
  layout primitives (`./layout`) and the brand icons (`./icons`).
- `apps/demo` (`dibk-designsystemet-demo`) - runnable Vite app. `#/` is an information
  page; the examples are `#/nettsted` and `#/komponenter`.

## Commands

```sh
corepack enable pnpm        # pnpm is NOT on PATH after a container restart - run this first
pnpm install                # if it complains, use: CI=true pnpm install --no-frozen-lockfile
pnpm build                  # icons codegen + tsup + generated theme/styles/fonts CSS
pnpm types                  # typecheck every workspace project
pnpm theme                  # regenerate dist/theme.css only
pnpm icons                  # regenerate src/icons/ from svg/ only
pnpm demo                   # demo app dev server
```

Filtered builds: `pnpm --filter <name> build`. The demo aliases each JS entry to its
**source**, so editing a component hot-reloads without rebuilding. The CSS entries are
generated into `dist/`, so run `pnpm build` at least once.

## DIBK design language

- **Brand navy `#003045`** (the accent), and **`border-radius: 0`** everywhere - the
  signature trait, so never round anything.
- **Pale surface colors**, brand-specific rather than derived from the accent: blue
  `#ebf4fa`, green `#f1fae3`, orange `#faf0de`, grey `#f4f4f4`. They live as `--dibk-*`
  custom properties in `src/base.css` and are the single source of truth.
- Ink `#202020`; warm grey `#6b6560` for meta text.
- **Font: Poppins** (`@fontsource/poppins`, OFL-1.1), weights 300-700.
- Two link styles: navigation links = ink, medium weight, no underline (underline on
  hover); prose/inline links = navy, bold, underlined.

## Rules

- **Reference tokens, never raw hex** in components: `--dibk-*` and `--ds-*`.
- **Weights come from `--ds-font-weight-*`**, not numbers. The global remap in
  `overrides.css` is the one lever.
- **`dist/theme.css` is generated.** Change `scripts/build-theme.mjs` and re-run
  `pnpm theme`. Designsystemet's own `@digdir/designsystemet-theme` package is deprecated -
  don't add it.
- **Card backgrounds use `data-dibk-color`, not DS `data-color`.** `data-color` cascades
  the whole color family and would tint buttons and headings too.
- **The layout primitives stay out of the main barrel.** `Stack`, `Cluster`, `Sidebar` and
  `Grid` are published from `./layout` only; a name reachable through two star-exports is
  dropped from both and would silently break consumers. Don't add a class-grid framework.
- **Brand icons are multi-color illustrations** and do NOT follow `currentColor`. For
  general UI iconography use Designsystemet's own icons.
- **The demo's example content is invented on purpose**, carries a not-guidance notice, and
  `index.html` sets `robots: noindex`. Don't add real regulatory text or remove the notice:
  a visitor arriving from a search must not read it as guidance.
- `dibk-designsystemet` is the single seam: consumers import its entries, never `@digdir/*`
  directly.
- `@fontsource-variable/*` registers families with a " Variable" suffix; static fonts
  (Poppins) use the plain name.
- Designsystemet `data-size` on Headings wins over a CSS `font-size` class; set size via
  `data-size` and force a weight via the `style` prop if needed.

## Licensing and publishing

Published to **public npmjs** as `dibk-designsystemet`, unscoped. Proprietary: copyright
DIBK, all rights reserved apart from an internal-use grant, see `LICENSE.md`. The package
ships its own copy at `packages/designsystem/LICENSE.md`, because npm only picks up a
LICENSE from the package directory, so the two must stay identical.

**Never publish without explicit approval from the user for that specific release.**
