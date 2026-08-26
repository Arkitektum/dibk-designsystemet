import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { DibkLogo } from "../Logo";

import "./Footer.css";

// The bottom-bar links are identical across every DIBK app, so they live here in
// the design system rather than being wired per app - a single place to update.
// Note: a tilgjengelighetserklæring is legally per-site; this points at DIBK's
// published declaration and should be revisited if an app needs its own.
const BOTTOM_LINKS = [
  {
    label: "Tilgjengelighetserklæring",
    href: "https://uustatus.no/nb/erklaringer/publisert/8ca10ee4-2679-465b-b208-ed1a992ca705",
  },
  {
    label: "Personvernerklæring",
    href: "https://www.dibk.no/om-direktoratet-for-byggkvalitet/personvernerklaring",
  },
];

export interface DibkFooterProps extends ComponentPropsWithoutRef<"footer"> {
  /** Optional app-specific content shown above the static bottom bar. */
  children?: ReactNode;
}

/**
 * The DIBK footer: an optional app-specific content area on top, then a static
 * bottom bar carrying the standard legal links (left) and the brand mark (right).
 */
export const DibkFooter = forwardRef<HTMLElement, DibkFooterProps>(function DibkFooter(
  { children, className, ...rest },
  ref,
) {
  return (
    <footer
      {...rest}
      ref={ref}
      className={["dibk-footer", className].filter(Boolean).join(" ")}
      data-dibk-footer
    >
      <div className="dibk-footer__inner">
        {children ? <div className="dibk-footer__content">{children}</div> : null}
        <div className="dibk-footer__bottom">
          <nav className="dibk-footer__links" aria-label="Juridisk">
            {BOTTOM_LINKS.map((link) => (
              <a key={link.href} className="dibk-footer__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <span className="dibk-footer__brand">
            <DibkLogo variant="mark" className="dibk-footer__mark" />
            <span className="dibk-footer__wordmark" aria-hidden="true">
              Direktoratet
              <br />
              for byggkvalitet
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
});
