import {
  Card,
  DibkCodeBlock,
  DibkIconLinkList,
  Heading,
  Paragraph,
  Table,
} from "dibk-designsystemet";
import type { DibkIconLinkItem } from "dibk-designsystemet";
import { Stack } from "dibk-designsystemet/layout";

import {
  IconByggeEndre,
  IconByggevarer,
} from "dibk-designsystemet/icons";

import { DemoShell } from "./chrome";

// Everything runnable in this app. These are the only links on the page that
// lead anywhere.
const demoLinks: DibkIconLinkItem[] = [
  {
    label: "Komponentbibliotek",
    href: "#/komponenter",
    icon: <IconByggevarer />,
    description: "Alle komponentene, med DIBK-tema.",
  },
  {
    label: "Eksempel på et nettsted",
    href: "#/nettsted",
    icon: <IconByggeEndre />,
    description:
      "Sidemal, meny og innholdskomponenter satt sammen til en hel side.",
  },
];

const entries = [
  {
    specifier: "dibk-designsystemet",
    what: "Alle komponentene fra Designsystemet med DIBK-tema, og DIBK-komponentene sidemal, toppmeny, megameny, bunntekst, logo og tilbakemeldingsboks.",
  },
  { specifier: "dibk-designsystemet/layout", what: "Stack, Cluster, Sidebar og Grid." },
  { specifier: "dibk-designsystemet/icons", what: "DIBK-illustrasjonene som React-komponenter." },
  { specifier: "dibk-designsystemet/styles.css", what: "Tema, typografi og komponentstiler." },
  { specifier: "dibk-designsystemet/fonts.css", what: "Poppins." },
];

export function App() {
  return (
    <DemoShell search={false}>
      <section className="demo-hero">
        <Heading
          level={1}
          data-size="md"
          className="demo-hero__title"
          style={{ fontWeight: 300 }}
        >
          DiBK Designsystem
        </Heading>
        <Paragraph className="demo-hero__lead">
          Installer én pakke, så ser appen din ut som DIBK. Under ligger
          Designsystemet fra Digdir, med DIBKs farger, typografi, komponenter og
          ikoner lagt oppå.
        </Paragraph>
      </section>

      <Card
        data-dibk-color="green"
        className="demo-explore-panel"
        aria-label="Se det i bruk"
      >
        <div className="demo-explore-panel__inner">
          <Heading level={2} data-size="sm" className="demo-explore-panel__title">
            Se det i bruk
          </Heading>
          <Paragraph className="demo-explore-panel__lead">
            Apper vi har bygd for å vise hvordan det ser ut i praksis. Alt
            innholdet i dem er funnet på.
          </Paragraph>
          <DibkIconLinkList items={demoLinks} columns={1} />
        </div>
      </Card>

      <section className="demo-section">
        <Heading level={2} data-size="sm" className="demo-info__heading">
          Kom i gang
        </Heading>
        <Paragraph className="demo-info__lead">
          Installer, importer to CSS-filer, og bruk komponentene.
        </Paragraph>
        <Stack gap="md">
          <DibkCodeBlock
            label="Installer"
            value="npm install dibk-designsystemet react react-dom @digdir/designsystemet-react @digdir/designsystemet-css @fontsource/poppins"
          />
          <DibkCodeBlock
            label="To CSS-importer i appen"
            value={'import "dibk-designsystemet/fonts.css";\nimport "dibk-designsystemet/styles.css";'}
          />
          <DibkCodeBlock
            label="Bruk komponentene"
            value={'import { Button, Card, DibkAppShell } from "dibk-designsystemet";'}
          />
        </Stack>
      </section>

      <section className="demo-section">
        <Heading level={2} data-size="sm" className="demo-info__heading">
          Hva er i pakken
        </Heading>
        <Paragraph className="demo-info__lead">
          Du importerer bare det du trenger.
        </Paragraph>
        <Table className="demo-entries">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Import</Table.HeaderCell>
              <Table.HeaderCell>Hva du får</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {entries.map((entry) => (
              <Table.Row key={entry.specifier}>
                <Table.Cell>
                  <code className="demo-entries__specifier">{entry.specifier}</code>
                </Table.Cell>
                <Table.Cell>{entry.what}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Paragraph className="demo-entries__note">
          Ikonene er flerfargede illustrasjoner og kan ikke farges om. Til
          vanlige grensesnittikoner bruker du Designsystemets egne.
        </Paragraph>
      </section>
    </DemoShell>
  );
}
