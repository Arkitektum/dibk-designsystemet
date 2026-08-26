import { useRef } from "react";

import {
  Alert,
  Card,
  DibkFeedbackWidget,
  DibkIconLinkList,
  DibkSearch,
  DibkSectionHeader,
  Heading,
  Paragraph,
} from "dibk-designsystemet";
import type { DibkIconLinkItem } from "dibk-designsystemet";

import {
  IconByggeEndre,
  IconByggevarer,
  IconForskriftSak,
  IconForskriftTek,
  IconNabovarsel,
  IconSentralGodkjenning,
  IconSkjema,
  IconTilsyn,
} from "dibk-designsystemet/icons";

import { DemoShell } from "./chrome";

// Invented link labels. They exist to give the icon-link list realistic weight
// and line lengths, and none of them navigate anywhere.
const primaryLinks: DibkIconLinkItem[] = [
  {
    label: "Kom i gang med byggeprosjektet",
    href: "/eksempel/kom-i-gang",
    icon: <IconByggeEndre />,
  },
  {
    label: "Tekniske krav med veiledning",
    href: "/eksempel/tekniske-krav",
    icon: <IconForskriftTek />,
  },
  { label: "Varsle naboer", href: "/eksempel/nabovarsel", icon: <IconNabovarsel /> },
  {
    label: "Produkter og dokumentasjonskrav",
    href: "/eksempel/produkter",
    icon: <IconByggevarer />,
  },
  {
    label: "Skjema og innsending",
    href: "/eksempel/skjema",
    icon: <IconSkjema />,
  },
  {
    label: "Regler for saksbehandling",
    href: "/eksempel/saksbehandling",
    icon: <IconForskriftSak />,
  },
  {
    label: "Tilsyn og kontroll",
    href: "/eksempel/tilsyn",
    icon: <IconTilsyn />,
  },
  {
    label: "Godkjenningsregister",
    href: "/eksempel/register",
    icon: <IconSentralGodkjenning />,
  },
];

/**
 * An informational site built out of the design system: header, mega-menu, hero,
 * search panel, icon-link lists and footer assembled the way a public DIBK site
 * would assemble them. It shows the page frame doing a full page rather than a
 * single component. Every link and every line of text is invented.
 */
export function NettstedApp() {
  const searchPanel = useRef<HTMLDivElement>(null);

  // The Søk button in the top bar has no separate search page to open, so it
  // jumps to the search field on this page instead.
  const focusSearch = () => {
    const input = searchPanel.current?.querySelector("input");
    input?.scrollIntoView({ block: "center", behavior: "smooth" });
    input?.focus({ preventScroll: true });
  };

  return (
    <DemoShell title="Eksempel på et nettsted" onSearchToggle={focusSearch}>
      <section className="demo-section">
        <Alert data-color="info">
          <Heading level={2} data-size="xs">
            Dette er en demoside, ikke et ekte nettsted
          </Heading>
          <Paragraph>
            Her er sidemalen, menyen og innholdskomponentene satt sammen til en
            hel side. Tekstene er oppdiktet, og lenkene i det blå panelet går
            ingen steder.
          </Paragraph>
        </Alert>
      </section>

      <section className="demo-hero">
        <Heading
          level={1}
          data-size="md"
          className="demo-hero__title"
          style={{ fontWeight: 300 }}
        >
          Vi hjelper deg med å finne fram i regelverket for bygg og byggesak.
        </Heading>
      </section>

      {/* Blue panel rendered with the DIBK Card component (data-dibk-color="blue").
          The shell's container owns the page width; the Card spans the content
          column and its padding is the panel's own inset. */}
      <Card
        ref={searchPanel}
        data-dibk-color="blue"
        className="demo-search-panel"
        aria-label="Søk i regelverk og veiledning"
      >
        <DibkSearch
          className="demo-search"
          placeholder="Søk i regelverk og veiledning"
          hint={
            <span className="demo-search-hint">
              Søk etter f.eks. «rekkverk» eller «bruksendring»
            </span>
          }
        />

        <DibkIconLinkList items={primaryLinks} columns={2} chevron={false} />
      </Card>

      <section className="demo-section">
        <DibkSectionHeader
          title="Kom i gang med byggeprosjektet"
          icon={<IconByggeEndre width={40} height={40} />}
          description="Oppdiktet ingress. Seksjonsoverskriften setter ikon, tittel og skillelinje sammen."
        />
      </section>

      <section className="demo-section">
        <Alert data-color="warning">
          <Heading level={2} data-size="xs">
            Slik ser en meldingsboks ut
          </Heading>
          <Paragraph>
            Meldingsboksene kommer fra Designsystemet, tilpasset DIBK. De er
            flate og lyse, uten ramme, og finnes i fire alvorlighetsgrader.
          </Paragraph>
        </Alert>
      </section>

      <section className="demo-section demo-feedback">
        <DibkFeedbackWidget
          question="Fant du det du lette etter?"
          onAnswer={(answer) => console.log("feedback:", answer)}
        />
      </section>
    </DemoShell>
  );
}
