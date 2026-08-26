import { StrictMode, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";

// Poppins, the DIBK brand font, self-hosted. Loaded first so the @font-face
// declarations exist before the theme references the family.
import "dibk-designsystemet/fonts.css";

// CSS order matters: Designsystemet's component styles first, then the DIBK theme
// tokens (navy palette, radius 0) which override its defaults. The rest of the
// brand CSS (base, overrides, per-component) arrives through the JS, because the
// JS entries are aliased to source here rather than to the built bundle.
import "@digdir/designsystemet-css";
import "dibk-designsystemet/theme.css";

import { App } from "./App";
import { NettstedApp } from "./NettstedApp";
import { ComponentsPage } from "./ComponentsPage";
import "./index.css";

// Tiny hash router: the information page at #/, and one route per example app.
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

function Root() {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash,
    () => "",
  );
  if (hash.startsWith("#/komponenter")) {
    return <ComponentsPage />;
  }
  if (hash.startsWith("#/nettsted")) {
    return <NettstedApp />;
  }
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
