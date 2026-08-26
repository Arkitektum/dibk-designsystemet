import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import "./SectionHeader.css";

export interface DibkSectionHeaderProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title: ReactNode;
  /** Large two-tone icon shown above/beside the title. */
  icon?: ReactNode;
  description?: ReactNode;
}

export const DibkSectionHeader = forwardRef<HTMLDivElement, DibkSectionHeaderProps>(
  function DibkSectionHeader({ title, icon, description, className, ...rest }, ref) {
    return (
      <div
        {...rest}
        ref={ref}
        className={["dibk-sectionheader", className].filter(Boolean).join(" ")}
        data-dibk-sectionheader
      >
        <div className="dibk-sectionheader__row">
          {icon ? <div className="dibk-sectionheader__icon">{icon}</div> : null}
          <h1 className="dibk-sectionheader__title">{title}</h1>
        </div>
        {description ? <p className="dibk-sectionheader__description">{description}</p> : null}
      </div>
    );
  },
);
