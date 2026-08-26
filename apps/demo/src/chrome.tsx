import type { ReactNode } from "react";

import { DibkAppShell } from "dibk-designsystemet";
import type { DibkMenuColumnSection } from "dibk-designsystemet";

import {
  IconByggeEndre,
  IconByggteknisk,
  IconForskriftTek,
  IconSentralGodkjenning,
} from "dibk-designsystemet/icons";

// Mega-menu shared by every demo page: a two-column layout of titled sections,
// each with a 40px icon. The sections are invented, and only the ones pointing at
// a #/ route lead anywhere - the rest are there to fill the menu out.
const menuColumns: [DibkMenuColumnSection[], DibkMenuColumnSection[]] = [
  [
    {
      title: "Veiledere",
      href: "/eksempel/veiledere",
      icon: <IconByggeEndre />,
      items: [
        { label: "Kom i gang", href: "/eksempel/kom-i-gang" },
        { label: "Planlegg prosjektet", href: "/eksempel/planlegg" },
        { label: "Varsle naboer", href: "/eksempel/nabovarsel" },
      ],
    },
    {
      title: "Regelverk",
      href: "/eksempel/regelverk",
      icon: <IconForskriftTek />,
      items: [
        { label: "Tekniske krav", href: "/eksempel/tekniske-krav" },
        { label: "Regler for saksbehandling", href: "/eksempel/saksbehandling" },
      ],
    },
  ],
  [
    {
      title: "Tjenester",
      href: "/eksempel/tjenester",
      icon: <IconSentralGodkjenning />,
      items: [
        { label: "Søk i regelverk", href: "/eksempel/sok" },
        { label: "Innsyn i byggesaker", href: "/eksempel/innsyn" },
        { label: "Godkjenningsregister", href: "/eksempel/register" },
      ],
    },
    {
      title: "Om demoen",
      href: "#/",
      icon: <IconByggteknisk />,
      items: [
        { label: "Om designsystemet", href: "#/" },
        { label: "Komponentbibliotek", href: "#/komponenter" },
        { label: "Eksempel på et nettsted", href: "#/nettsted" },
      ],
    },
  ],
];

/**
 * The demo's app chrome: DibkAppShell with the demo's menu, top-bar shortcut and
 * footer. One thin wrapper per app is the intended DibkAppShell usage - pages
 * render only their content, and the shell owns the page width, so everything
 * automatically aligns with the header and footer.
 */
export function DemoShell({
  title = "DiBK Designsystem",
  search = true,
  onSearchToggle,
  children,
}: {
  /** App name shown beside the logo in the top bar (the shell's `title`). */
  title?: ReactNode;
  /** Render the Søk button and the mega-menu search field. */
  search?: boolean;
  onSearchToggle?: () => void;
  children: ReactNode;
}) {
  return (
    <DibkAppShell
      title={title}
      homeHref="#/"
      search={search}
      onSearchToggle={onSearchToggle}
      shortcuts={[{ label: "Komponentbibliotek", href: "#/komponenter" }]}
      menuColumns={menuColumns}
      footerContent={
        <p>Demo av DiBK Designsystem. Innholdet i eksempelappene er oppdiktet.</p>
      }
    >
      {children}
    </DibkAppShell>
  );
}
