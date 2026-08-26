import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Avatar, Button, Dropdown, Paragraph, Tag } from "@digdir/designsystemet-react";

import "./AccountMenu.css";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export interface DibkAccountMenuProps
  extends Omit<ComponentPropsWithoutRef<"button">, "name" | "value"> {
  /** The signed-in user's display name (drives the initials, heading and aria-label). */
  name: string;
  email?: string;
  /** Role shown as a small tag under the email (e.g. "Redaktør"). */
  roleLabel?: ReactNode;
  /** Renders a "Logg ut" item that calls this. */
  onLogout?: () => void;
  /** Extra Dropdown.Item entries, listed before Logg ut. */
  children?: ReactNode;
}

/** Header account control for a signed-in user: an initials avatar that opens a
    small account dropdown (name, email, role, Logg ut). Designed for the app
    shell's `account` slot; the app decides *whether* the user is signed in and
    what the fields are - this component only renders them. */
export const DibkAccountMenu = forwardRef<HTMLButtonElement, DibkAccountMenuProps>(
  function DibkAccountMenu(
    { name, email, roleLabel, onLogout, children, className, ...rest },
    ref,
  ) {
    return (
      <Dropdown.TriggerContext>
        <Dropdown.Trigger
          {...rest}
          ref={ref}
          variant="tertiary"
          className={["dibk-header__btn", className].filter(Boolean).join(" ")}
          aria-label={`Konto: ${name}`}
        >
          <Avatar aria-hidden initials={initials(name)} variant="square" data-size="sm" />
        </Dropdown.Trigger>
        <Dropdown placement="bottom-end">
          <Dropdown.Heading>{name}</Dropdown.Heading>
          {email || roleLabel ? (
            <div className="dibk-account__id">
              {email ? <Paragraph data-size="sm">{email}</Paragraph> : null}
              {roleLabel ? <Tag data-size="sm">{roleLabel}</Tag> : null}
            </div>
          ) : null}
          <Dropdown.List>
            {children}
            {onLogout ? (
              <Dropdown.Item>
                <Dropdown.Button onClick={onLogout}>Logg ut</Dropdown.Button>
              </Dropdown.Item>
            ) : null}
          </Dropdown.List>
        </Dropdown>
      </Dropdown.TriggerContext>
    );
  },
);

export interface DibkMenuLoginProps extends ComponentPropsWithoutRef<"button"> {}

/** "Logg inn" row for the mega-menu's `menuExtra` slot, the anonymous counterpart
    to DibkAccountMenu. The app renders it only for signed-out visitors and wires
    the click to its sign-in flow. */
export const DibkMenuLogin = forwardRef<HTMLButtonElement, DibkMenuLoginProps>(
  function DibkMenuLogin({ className, children = "Logg inn", ...rest }, ref) {
    return (
      <Button
        {...rest}
        ref={ref}
        variant="secondary"
        className={["dibk-menu-login", className].filter(Boolean).join(" ")}
      >
        {children}
      </Button>
    );
  },
);
