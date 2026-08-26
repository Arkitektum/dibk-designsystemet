import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { Button } from "@digdir/designsystemet-react";

import { DibkLogo } from "../Logo";
import { SearchIcon, MenuIcon, CloseIcon } from "../icons";

import "./Header.css";

/** A highlighted shortcut shown in the top bar beside the menu toggle. */
export interface DibkHeaderShortcut {
  label: string;
  href: string;
}

export interface DibkHeaderProps extends ComponentPropsWithoutRef<"header"> {
  /** Whether the mega-menu is open (controls the Meny toggle state). */
  menuOpen?: boolean;
  onMenuToggle?: () => void;
  /** id of the menu panel the Meny toggle controls (wired to aria-controls). */
  menuPanelId?: string;
  onSearchToggle?: () => void;
  /**
   * Render the "Søk" button. Defaults to true. Set false in apps whose search
   * lives elsewhere (e.g. a page hero) so the header shows only "Meny".
   */
  search?: boolean;
  /**
   * Highlighted shortcut links rendered before Søk/Meny. On narrow viewports
   * they collapse; reach them through the menu instead.
   */
  shortcuts?: DibkHeaderShortcut[];
  /**
   * Account/login control rendered rightmost in the bar, after Søk/Meny. Unlike
   * shortcuts it does not collapse on narrow viewports, so sign-in state stays
   * visible. The app owns the content (login button, avatar dropdown, ...).
   */
  account?: ReactNode;
  /** Optional brand link target (logo href). */
  homeHref?: string;
  /**
   * Component used to render the brand and shortcut links (receives `href`).
   * Pass a router Link adapter for client-side navigation; defaults to `a`.
   */
  linkComponent?: ElementType;
}

/**
 * DIBK top bar: roofline logo (linking home) on the left; an optional "Søk"
 * button and the "Meny" (hamburger) toggle on the right. The toggle is a
 * disclosure control for the menu panel: it swaps to
 * "Lukk" + X while open and announces state via aria-expanded/aria-controls.
 * Search and menu state are owned by the caller.
 */
export const DibkHeader = forwardRef<HTMLElement, DibkHeaderProps>(function DibkHeader(
  { menuOpen = false, onMenuToggle, menuPanelId, onSearchToggle, search = true, shortcuts, account, homeHref = "/", linkComponent: LinkComponent = "a", children, className, ...rest },
  ref,
) {
  return (
    <header
      {...rest}
      ref={ref}
      className={["dibk-header", className].filter(Boolean).join(" ")}
      data-dibk-header
    >
      <div className="dibk-header__inner">
        <LinkComponent className="dibk-header__brand" href={homeHref} aria-label="Direktoratet for byggkvalitet, til forsiden">
          {/* Both rendered; CSS shows the full lockup on wide screens and swaps to
              the roofline mark on phones (zero-runtime, no hydration flash). The
              hidden copy is aria-hidden so the link keeps one accessible name. */}
          <DibkLogo className="dibk-header__logo--full" />
          <DibkLogo variant="mark" className="dibk-header__logo--mark" aria-hidden />
        </LinkComponent>

        {children}

        <div className="dibk-header__actions">
          {/* Shortcuts duplicate menu entries, so they hide while the menu is
              open; only the Lukk toggle (and account) stays. */}
          {menuOpen
            ? null
            : shortcuts?.map((s) => (
                <LinkComponent key={s.href} className="dibk-header__btn dibk-header__shortcut" href={s.href}>
                  {s.label}
                </LinkComponent>
              ))}
          {search ? (
            <Button
              variant="tertiary"
              className="dibk-header__btn"
              onClick={onSearchToggle}
              aria-label="Søk"
            >
              <span className="dibk-header__btn-label">Søk</span>
              <SearchIcon />
            </Button>
          ) : null}
          <Button
            variant="tertiary"
            className="dibk-header__btn"
            onClick={onMenuToggle}
            aria-expanded={menuOpen}
            aria-controls={menuPanelId}
            aria-label={menuOpen ? "Lukk meny" : "Meny"}
          >
            <span className="dibk-header__btn-label">{menuOpen ? "Lukk" : "Meny"}</span>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </Button>
          {account}
        </div>
      </div>
    </header>
  );
});
