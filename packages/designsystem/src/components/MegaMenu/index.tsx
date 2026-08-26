import { forwardRef, useEffect, useId } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { DibkSearch } from "../Search";

import "./MegaMenu.css";

export interface DibkMegaMenuProps extends ComponentPropsWithoutRef<"div"> {
  open: boolean;
  onClose: () => void;
  /** Render the built-in search field (default true). Set false in apps whose
   * search lives elsewhere, mirroring DibkHeader's `search`. */
  search?: boolean;
  /** Placeholder for the built-in search field (default "Søk"). */
  searchPlaceholder?: string;
  /** Fired when the built-in search field is submitted. */
  onSearchSubmit?: (query: string) => void;
  /** Optional hint line inside the search widget, under the field
   * (e.g. "Søk etter f.eks. rekkverk eller bruksendring"). */
  searchHint?: ReactNode;
}

/**
 * DIBK navigation panel: a full-width disclosure that expands in document flow
 * below the header: the page content is pushed down and the header stays
 * visible. The header's Meny button owns the open state and
 * references the panel via aria-expanded/aria-controls; this component renders
 * the panel content: an optional large underline search field, then `children`
 * (the caller owns the content layout). Escape closes the panel and hands
 * focus back to the toggle.
 */
export const DibkMegaMenu = forwardRef<HTMLDivElement, DibkMegaMenuProps>(function DibkMegaMenu(
  { open, onClose, children, search = true, searchPlaceholder = "Søk", onSearchSubmit, searchHint, className, id: idProp, ...rest },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? autoId;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      onClose();
      // Focus inside the panel would be orphaned when it hides; hand it back
      // to the toggle that controls the panel.
      document.querySelector<HTMLElement>(`[aria-controls="${CSS.escape(id)}"]`)?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, id]);

  return (
    <div
      {...rest}
      ref={ref}
      id={id}
      hidden={!open}
      className={["dibk-megamenu", className].filter(Boolean).join(" ")}
      data-dibk-megamenu
    >
      <div className="dibk-megamenu__inner">
        {search ? (
          <DibkSearch
            className="dibk-megamenu__search"
            placeholder={searchPlaceholder}
            onSearch={onSearchSubmit}
            hint={searchHint}
          />
        ) : null}

        {children}
      </div>
    </div>
  );
});
