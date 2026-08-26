import { forwardRef } from "react";
import type { ChangeEvent, ComponentPropsWithoutRef, FormEventHandler, ReactNode } from "react";
import { Search } from "@digdir/designsystemet-react";

import { SearchIcon } from "../icons";

import "./Search.css";

export interface DibkSearchProps
  extends Omit<ComponentPropsWithoutRef<"form">, "onSubmit" | "onChange"> {
  /** Placeholder text; also the input's accessible name. */
  placeholder?: string;
  /** Optional hint line under the field (e.g. example searches). */
  hint?: ReactNode;
  /** Controlled value. Omit (with onValueChange) for uncontrolled use. */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Fired with the query when the form submits (Enter or the magnifier). */
  onSearch?: (query: string) => void;
  /** Fired when the clear button empties the field. */
  onClear?: () => void;
  inputId?: string;
}

/**
 * The DIBK search widget: an underline-only field with an inline
 * magnifier, sitting in a quiet panel that turns white with a ring on
 * hover/focus. Wraps Designsystemet's `Search` and renders its own `<form>`
 * (DS `Search` is a plain div; Enter-to-submit needs a real form).
 */
export const DibkSearch = forwardRef<HTMLFormElement, DibkSearchProps>(function DibkSearch(
  { placeholder = "Søk", hint, value, onValueChange, onSearch, onClear, inputId, className, ...rest },
  ref,
) {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("dibk-search");
    onSearch?.(input instanceof HTMLInputElement ? input.value : "");
  };

  return (
    <form
      {...rest}
      ref={ref}
      role="search"
      onSubmit={handleSubmit}
      className={["dibk-search", className].filter(Boolean).join(" ")}
    >
      <Search className="dibk-search__field">
        <Search.Input
          id={inputId}
          name="dibk-search"
          placeholder={placeholder}
          aria-label={placeholder}
          {...(value !== undefined
            ? {
                value,
                onChange: (e: ChangeEvent<HTMLInputElement>) => onValueChange?.(e.target.value),
              }
            : null)}
        />
        <Search.Clear aria-label="Tøm søk" onClick={onClear} />
        <Search.Button type="submit" icon aria-label="Søk">
          <SearchIcon size={26} />
        </Search.Button>
      </Search>
      {hint ? <div className="dibk-search__hint">{hint}</div> : null}
    </form>
  );
});
