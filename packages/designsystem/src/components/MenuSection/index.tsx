import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { DibkIconLinkList, type DibkIconLinkItem } from "../IconLinkList";

import "./MenuSection.css";

export interface DibkMenuSectionProps extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  /** Section heading (24px semibold navy beside a 40px icon). */
  title: ReactNode;
  /** Make the title itself a link (section titles point at landing pages). */
  href?: string;
  /** 40x40 illustration beside the title. */
  icon?: ReactNode;
  /** The section's links. */
  items: DibkIconLinkItem[];
  /**
   * Component used to render the links (receives `href`). Pass a router Link
   * adapter for client-side navigation; defaults to `a`.
   */
  linkComponent?: ElementType;
}

/**
 * One section of the DIBK menu panel: an optional 40px
 * icon + a title row, then an indented chevron-link list. Stack sections
 * inside `.dibk-megamenu__column` wrappers for the two-column menu layout.
 */
export const DibkMenuSection = forwardRef<HTMLElement, DibkMenuSectionProps>(function DibkMenuSection(
  { title, href, icon, items, linkComponent, className, ...rest },
  ref,
) {
  const LinkComponent: ElementType = linkComponent ?? "a";

  return (
    <section
      {...rest}
      ref={ref}
      className={["dibk-menusection", className].filter(Boolean).join(" ")}
      data-dibk-menusection
    >
      <h3 className="dibk-menusection__header">
        {icon ? (
          <span className="dibk-menusection__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        {href ? (
          <LinkComponent className="dibk-menusection__titlelink" href={href}>
            {title}
          </LinkComponent>
        ) : (
          title
        )}
      </h3>

      <div className="dibk-menusection__body">
        <DibkIconLinkList items={items} columns={1} linkComponent={linkComponent} />
      </div>
    </section>
  );
});
