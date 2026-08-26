// dibk-designsystemet - DIBK design system.
//
// Re-exports all of Designsystemet (Digdir) so apps install ONE package, and adds
// DIBK-specific composite components that have no 1:1 in Designsystemet. The
// package is the single import seam: consumers import everything from here and
// never reach into @digdir/* directly, so a Digdir primitive can later be
// shadowed by a DIBK version (export { Button } from "./components/Button")
// without touching app code.
//
// CSS the consuming app imports (only dibk-designsystemet entries, no @digdir/*):
//   import "dibk-designsystemet/fonts.css";  // Poppins @font-face
//   import "dibk-designsystemet/styles.css"; // everything else, in cascade order
// The JS barrel deliberately carries no CSS import: a JS file that imports CSS
// cannot be loaded by Node, which breaks SSR and the CJS build. dist/styles.css
// is the single CSS entry (see scripts/build-styles-entry.mjs).

// DIBK base (brand font on body) then overrides, both unlayered so they win over
// Designsystemet's @layer ds without specificity hacks. esbuild strips these from
// the JS output and bundles them into dist/index.css, which dist/styles.css pulls
// in after Designsystemet's own CSS.
import "./base.css";
import "./overrides.css";

// --- Designsystemet, re-exported wholesale ---
export * from "@digdir/designsystemet-react";

// --- DIBK brand components (no 1:1 in Designsystemet) ---
export * from "./components/Logo";
export * from "./components/Header";
export * from "./components/MegaMenu";
export * from "./components/MenuSection";
export * from "./components/Search";
export * from "./components/Footer";
export * from "./components/IconLinkList";
export * from "./components/SectionHeader";
export * from "./components/FeedbackWidget";
export * from "./components/AppShell";
export * from "./components/AccountMenu";
export * from "./components/CopyButton";
export * from "./components/CodeBlock";

// Layout primitives (Stack/Cluster/Sidebar/Grid) are NOT exported here. They are
// unprefixed generic names, and this barrel star-exports Designsystemet, so a
// future upstream Grid or Stack would collide and silence both. They live at
// "dibk-designsystemet/layout" instead; see src/layout.ts.
