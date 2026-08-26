import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import "./Layout.css";

// Every-Layout style layout primitives. Deliberately unprefixed (Stack, Cluster,
// Sidebar, Grid) because layout is generic; they are published from the
// "dibk-designsystemet/layout" entry rather than the main barrel so the generic
// names never share a namespace with Designsystemet's star export. Gaps map to the
// --ds-size-* spacing scale via a small `gap` enum; `as` makes each polymorphic
// (e.g. as="ul").
export type LayoutGap = "xs" | "sm" | "md" | "lg";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

interface StackProps extends ComponentPropsWithoutRef<"div"> {
  /** Element to render (default "div"). */
  as?: ElementType;
  /** Space between children, from the --ds-size-* scale (default "md"). */
  gap?: LayoutGap;
  /** Cross-axis alignment. */
  align?: "start" | "center";
}

/** Vertical flow: owns the space between its children. */
export const Stack = forwardRef<HTMLElement, StackProps>(function Stack(
  { as: Tag = "div", gap, align, className, ...rest },
  ref,
) {
  return (
    <Tag ref={ref} className={cx("l-stack", className)} data-gap={gap} data-align={align} {...rest} />
  );
});

interface ClusterProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  gap?: LayoutGap;
  align?: "baseline";
  /** Push the two groups apart (space-between). */
  justify?: "between";
  /** Wrap to multiple lines when out of room (default true). Set false for a
      tight, single-line control toolbar. */
  wrap?: boolean;
}

/** Wrapping horizontal group: tag rows, toolbars. */
export const Cluster = forwardRef<HTMLElement, ClusterProps>(function Cluster(
  { as: Tag = "div", gap, align, justify, wrap = true, className, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cx("l-cluster", className)}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-wrap={wrap ? undefined : "false"}
      {...rest}
    />
  );
});

interface SidebarProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  gap?: LayoutGap;
}

/** Fixed side column + fluid main that wraps to one column on its own (no media
    query). Mark the narrow column with the `data-side` attribute. */
export const Sidebar = forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { as: Tag = "div", gap, className, ...rest },
  ref,
) {
  return <Tag ref={ref} className={cx("l-sidebar", className)} data-gap={gap} {...rest} />;
});

interface GridProps extends ComponentPropsWithoutRef<"div"> {
  as?: ElementType;
  gap?: LayoutGap;
}

/** Intrinsic responsive grid: fits as many columns as fit, no breakpoints. Tune
    the minimum column width with `--l-grid-min` (default 16rem). */
export const Grid = forwardRef<HTMLElement, GridProps>(function Grid(
  { as: Tag = "div", gap, className, ...rest },
  ref,
) {
  return <Tag ref={ref} className={cx("l-grid", className)} data-gap={gap} {...rest} />;
});
