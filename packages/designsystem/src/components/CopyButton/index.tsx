import { forwardRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import "./CopyButton.css";

function ClipboardIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <rect x="8" y="6" width="11" height="14" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 6V4H5v14h3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function useCopy(value: string) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Async clipboard API is unavailable in non-secure contexts and older
      // browsers; fall back to a hidden textarea + execCommand.
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1700);
  };

  return { done, copy };
}

export interface DibkCopyButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** The text placed on the clipboard. */
  value: string;
  /** Accessible name for the button ("Kopier" when omitted). */
  ariaLabel?: string;
}

/** A square navy "Kopier" button that flips to "✓ Kopiert!" for ~1.7s after a copy. */
export const DibkCopyButton = forwardRef<HTMLButtonElement, DibkCopyButtonProps>(
  function DibkCopyButton({ value, ariaLabel, className, onClick, ...rest }, ref) {
    const { done, copy } = useCopy(value);

    return (
      <>
        <button
          {...rest}
          ref={ref}
          type="button"
          className={["dibk-copybtn", className].filter(Boolean).join(" ")}
          data-done={done ? "1" : "0"}
          aria-label={ariaLabel ?? (done ? "Kopiert" : "Kopier")}
          onClick={(e) => {
            void copy();
            onClick?.(e);
          }}
        >
          <span className="dibk-copybtn__ico" aria-hidden="true">
            {done ? "✓" : null}
          </span>
          {done ? "Kopiert!" : "Kopier"}
        </button>
        {/* Announces the copy to screen readers: the visual "Kopiert!" swap alone
            isn't reliably read, and a custom ariaLabel ("Kopier kodeord") never
            flips to a success label. role="status" is a polite live region. */}
        <span className="dibk-sr-only" role="status">
          {done ? "Kopiert" : ""}
        </span>
      </>
    );
  },
);

export interface DibkCopyIconButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** The text placed on the clipboard. */
  value: string;
  /** Accessible name for the button. */
  ariaLabel?: string;
  /** Glyph size in px; the hit area comes from padding, not the glyph. */
  size?: number;
}

/** Quiet icon-only sibling of DibkCopyButton: a muted clipboard glyph that turns
    into a green ✓ after copying. For places where a full button would shout
    (e.g. beside body text). */
export const DibkCopyIconButton = forwardRef<HTMLButtonElement, DibkCopyIconButtonProps>(
  function DibkCopyIconButton(
    { value, ariaLabel = "Kopier", size = 18, className, style, onClick, ...rest },
    ref,
  ) {
    const { done, copy } = useCopy(value);

    return (
      <>
        <button
          {...rest}
          ref={ref}
          type="button"
          className={["dibk-copyiconbtn", className].filter(Boolean).join(" ")}
          style={{ fontSize: size, ...style }}
          data-done={done ? "1" : "0"}
          aria-label={done ? "Kopiert" : ariaLabel}
          title={done ? "Kopiert!" : ariaLabel}
          onClick={(e) => {
            void copy();
            onClick?.(e);
          }}
        >
          {done ? (
            <span className="dibk-copyiconbtn__done" aria-hidden="true">
              ✓
            </span>
          ) : (
            <ClipboardIcon size={size} />
          )}
        </button>
        <span className="dibk-sr-only" role="status">
          {done ? "Kopiert" : ""}
        </span>
      </>
    );
  },
);
