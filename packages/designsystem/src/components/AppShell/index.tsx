import { forwardRef, useId, useState } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { Heading } from "@digdir/designsystemet-react";

import { DibkHeader, type DibkHeaderShortcut } from "../Header";
import { DibkMegaMenu } from "../MegaMenu";
import { DibkMenuSection, type DibkMenuSectionProps } from "../MenuSection";
import { DibkFooter } from "../Footer";
import { DibkIconLinkList, type DibkIconLinkItem } from "../IconLinkList";

import "./AppShell.css";

/** One menu section: title (+ optional icon/landing link) and its links. */
export type DibkMenuColumnSection = Pick<DibkMenuSectionProps, "title" | "href" | "icon" | "items">;

// Omit the native `title` (a string tooltip) so our richer `title` prop can be a
// ReactNode without colliding with the inherited HTML attribute.
export interface DibkAppShellProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** App name shown beside the logo, with a subtle divider. */
  title?: ReactNode;
  /** Logo link target. */
  homeHref?: string;
  /** Render the header's "Søk" button (default true). */
  search?: boolean;
  /** Called when the header's Søk toggle is clicked. */
  onSearchToggle?: () => void;
  /** Highlighted shortcut links shown in the top bar beside the menu toggle. */
  shortcuts?: DibkHeaderShortcut[];
  /** Account/login control shown in the top bar (see DibkHeader's `account`). */
  account?: ReactNode;
  /** Mega-menu heading (default "Meny"). Visually hidden when `menuColumns` is
   * used (the section titles carry the visual structure instead). */
  menuHeading?: string;
  /** Mega-menu navigation links, as a flat list under the menu heading. Ignored
   * when `menuColumns` is provided. */
  menuItems?: DibkIconLinkItem[];
  /** Two-column menu layout: each column a stack of titled sections.
   * Takes precedence over `menuItems`. */
  menuColumns?: [DibkMenuColumnSection[], DibkMenuColumnSection[]];
  /** Optional content below the menu links (e.g. an account/login row). */
  menuExtra?: ReactNode;
  /** Optional app-specific content shown above the footer's static bottom bar. */
  footerContent?: ReactNode;
  /**
   * Component used for the header's brand/shortcut links and the menu items
   * (receives `href`). Pass a router Link adapter for client-side navigation;
   * defaults to `a`.
   */
  linkComponent?: ElementType;
}

/**
 * The DIBK page frame: header (logo + app title + menu toggle), mega-menu,
 * the routed content in the canonical container, and the footer. Owns the
 * menu open/close state. The content sits in a `--dibk-container-max` container
 * so it lines up edge-to-edge with the header and footer - apps don't manage
 * their own page width.
 */
export const DibkAppShell = forwardRef<HTMLDivElement, DibkAppShellProps>(function DibkAppShell(
  {
    title,
    homeHref = "/",
    search = true,
    onSearchToggle,
    shortcuts,
    account,
    menuHeading = "Meny",
    menuItems,
    menuColumns,
    menuExtra,
    footerContent,
    linkComponent,
    children,
    className,
    ...rest
  },
  ref,
) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Links the header's Meny toggle (aria-controls) to the menu panel it expands.
  const menuId = useId();

  return (
    <div {...rest} ref={ref} className={["dibk-appshell", className].filter(Boolean).join(" ")}>
      {/* Bypass-blocks link (WCAG 2.4.1): hidden until focused, lets keyboard
          users jump past the header/menu straight to the page content. */}
      <a className="dibk-skiplink" href="#dibk-main">
        Hopp til hovedinnhold
      </a>
      <DibkHeader
        homeHref={homeHref}
        search={search}
        onSearchToggle={onSearchToggle}
        shortcuts={shortcuts}
        account={account}
        linkComponent={linkComponent}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((o) => !o)}
        menuPanelId={menuId}
      >
        {title ? (
          <span className="dibk-appshell__title">
            <span className="dibk-appshell__titletext">{title}</span>
          </span>
        ) : null}
      </DibkHeader>

      <DibkMegaMenu id={menuId} open={menuOpen} search={search} onClose={() => setMenuOpen(false)}>
        {menuColumns ? (
          <>
            <h2 className="dibk-sr-only">{menuHeading}</h2>
            {/* With client-side routing the page doesn't unload on navigation,
                so close the menu when one of its links is clicked. */}
            <div
              className="dibk-megamenu__columns"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
              }}
            >
              {menuColumns.map((sections, column) => (
                <div key={column} className="dibk-megamenu__column">
                  {sections.map((section) => (
                    <DibkMenuSection
                      key={`${section.title}`}
                      linkComponent={linkComponent}
                      {...section}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Heading level={2} data-size="sm" className="dibk-appshell__menuheading">
              {menuHeading}
            </Heading>
            <DibkIconLinkList
              items={menuItems ?? []}
              columns={2}
              linkComponent={linkComponent}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
              }}
            />
          </>
        )}
        {menuExtra}
      </DibkMegaMenu>

      {/* The page content is hidden entirely while the menu is open; the
          footer stays, below the panel. */}
      <main id="dibk-main" tabIndex={-1} className="dibk-appshell__main" hidden={menuOpen}>
        <div className="dibk-appshell__container">{children}</div>
      </main>

      <DibkFooter>{footerContent}</DibkFooter>
    </div>
  );
});
