import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { ChevronRight, LockIcon } from "../icons";

import "./IconLinkList.css";

export interface DibkIconLinkItem {
  label: string;
  href: string;
  icon?: ReactNode;
  description?: ReactNode;
  /** Mark the item login-gated: renders a padlock after the label (with screen-reader text). */
  locked?: boolean;
}

export interface DibkIconLinkListProps extends ComponentPropsWithoutRef<"ul"> {
  items: DibkIconLinkItem[];
  /** Number of columns the list flows into. */
  columns?: 1 | 2 | 3;
  /** Render the chevron before each label (default true). Drop it where the
   * list reads as a panel of shortcuts rather than a navigation list. */
  chevron?: boolean;
  /**
   * Component used to render the item links (receives `href`). Pass a router
   * Link adapter for client-side navigation; defaults to `a`.
   */
  linkComponent?: ElementType;
}

export const DibkIconLinkList = forwardRef<HTMLUListElement, DibkIconLinkListProps>(
  function DibkIconLinkList(
    { items, columns = 2, chevron = true, linkComponent: LinkComponent = "a", className, ...rest },
    ref,
  ) {
    return (
      <ul
        {...rest}
        ref={ref}
        className={["dibk-iconlinklist", className].filter(Boolean).join(" ")}
        data-columns={columns}
        data-dibk-iconlinklist
      >
        {items.map((item) => (
          <li key={`${item.label}-${item.href}`} className="dibk-iconlinklist__item">
            {item.icon ? <span className="dibk-iconlinklist__icon">{item.icon}</span> : null}
            <div className="dibk-iconlinklist__body">
              <LinkComponent className="dibk-iconlinklist__link" href={item.href}>
                {chevron ? <ChevronRight className="dibk-iconlinklist__chevron" /> : null}
                <span>{item.label}</span>
                {item.locked ? (
                  <span className="dibk-iconlinklist__lock">
                    <LockIcon />
                    <span className="dibk-sr-only">(krever innlogging)</span>
                  </span>
                ) : null}
              </LinkComponent>
              {item.description ? (
                <p className="dibk-iconlinklist__description">{item.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    );
  },
);
