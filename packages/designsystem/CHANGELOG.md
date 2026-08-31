# Changelog

Notable changes to `dibk-designsystemet`. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning is
[semver](https://semver.org/), where a minor release may adjust visual details and a
major release changes the component API.

## 1.0.0 - 2026-08-31

First release.

### Added

- Every `@digdir/designsystemet-react` component, re-exported and DIBK-themed.
- DIBK brand components: `DibkAppShell`, `DibkHeader`, `DibkMegaMenu`,
  `DibkMenuSection`, `DibkSearch`, `DibkFooter`, `DibkLogo`, `DibkIconLinkList`,
  `DibkSectionHeader`, `DibkFeedbackWidget`, `DibkAccountMenu`, `DibkMenuLogin`,
  `DibkCopyButton`, `DibkCopyIconButton`, `DibkCodeBlock`.
- Layout primitives `Stack`, `Cluster`, `Sidebar` and `Grid` on the `./layout` subpath.
- Thirteen DIBK brand icons on the `./icons` subpath, plus the `dibkIcons` registry.
- CSS entries: `styles.css` (everything, in cascade order), `fonts.css` (Poppins
  `@font-face`), and `theme.css` / `index.css` / `layout.css` for composing a custom
  cascade.
- `swagger.css`, a standalone Swagger UI skin for hosts that serve static files with no
  bundler.
- Dual ESM and CJS builds with sourcemaps and type declarations for both.

### Peer dependencies

`react`, `react-dom`, `@digdir/designsystemet-react`, `@digdir/designsystemet-css` and
`@fontsource/poppins`. Keep the two `@digdir/designsystemet-*` packages on the same
version; their CSS class contract is version-coupled upstream.
