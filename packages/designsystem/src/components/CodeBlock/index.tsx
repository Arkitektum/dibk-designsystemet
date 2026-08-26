import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { DibkCopyButton } from "../CopyButton";

import "./CodeBlock.css";

export interface DibkCodeBlockProps extends ComponentPropsWithoutRef<"div"> {
  /** Label shown in the bar above the code. */
  label: string;
  /** The value the Kopier button copies (and shows, unless `display` is set). */
  value: string;
  /** Text to show when it should differ from the copied value. */
  display?: string;
  /** Toggles the Kopier button; turn off for illustrative blocks that shouldn't be pasted. */
  copyable?: boolean;
}

/** A labelled code block: a label bar over a monospace `<pre>`, with an optional
    Kopier button. Wraps long lines (URLs, JSON) rather than only scrolling. */
export const DibkCodeBlock = forwardRef<HTMLDivElement, DibkCodeBlockProps>(
  function DibkCodeBlock({ label, value, display, copyable = true, className, ...rest }, ref) {
    return (
      <div
        {...rest}
        ref={ref}
        className={["dibk-code", className].filter(Boolean).join(" ")}
      >
        <div className="dibk-code__bar">
          <span className="dibk-code__label">{label}</span>
          {copyable ? <DibkCopyButton value={value} ariaLabel={`Kopier ${label}`} /> : null}
        </div>
        <pre className="dibk-code__pre">
          <code>{display ?? value}</code>
        </pre>
      </div>
    );
  },
);
