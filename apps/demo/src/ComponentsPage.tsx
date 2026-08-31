import { useState } from "react";
import type { ReactNode } from "react";

import {
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  Details,
  DibkAccountMenu,
  DibkCodeBlock,
  DibkCopyButton,
  DibkCopyIconButton,
  DibkHeader,
  DibkIconLinkList,
  DibkFeedbackWidget,
  DibkLogo,
  DibkMenuLogin,
  DibkSearch,
  DibkSectionHeader,
  Dialog,
  Divider,
  Dropdown,
  ErrorSummary,
  EXPERIMENTAL_AvatarStack as AvatarStack,
  EXPERIMENTAL_Suggestion as Suggestion,
  Field,
  Fieldset,
  Heading,
  Input,
  Label,
  Link,
  List,
  Pagination,
  Paragraph,
  Popover,
  Radio,
  Search,
  Select,
  Skeleton,
  SkipLink,
  Spinner,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  Textfield,
  ToggleGroup,
  Tooltip,
  ValidationMessage,
} from "dibk-designsystemet";
import type { DibkIconLinkItem } from "dibk-designsystemet";
import { dibkIcons } from "dibk-designsystemet/icons";

import { DemoShell } from "./chrome";
import {
  IconByggeEndre,
  IconForskriftTek,
  IconNabovarsel,
  IconSkjema,
} from "dibk-designsystemet/icons";

const megaMenuLinks: DibkIconLinkItem[] = [
  { label: "Kom i gang", href: "#", icon: <IconByggeEndre /> },
  { label: "Tekniske krav", href: "#", icon: <IconForskriftTek /> },
  { label: "Skjema og innsending", href: "#", icon: <IconSkjema /> },
  { label: "Varsle naboer", href: "#", icon: <IconNabovarsel /> },
];

/** One labeled demo box: the component name + a rendered example. */
function Demo({ name, children }: { name: string; children: ReactNode }) {
  const id = `komp-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <section className="komp-section" id={id}>
      <Heading level={2} data-size="xs" className="komp-section__title">
        {name}
      </Heading>
      <div className="komp-demo">{children}</div>
    </section>
  );
}

export function ComponentsPage() {
  // Stateful demos
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("ja");
  const [switchOn, setSwitchOn] = useState(true);
  const [toggle, setToggle] = useState("kart");
  const [page, setPage] = useState(2);
  const [tab, setTab] = useState("beskrivelse");
  const [chips, setChips] = useState<string[]>(["bokmal"]);

  return (
    <DemoShell title="Komponentbibliotek" search={false}>
        <div className="komp-page">
          <Breadcrumbs aria-label="Du er her:">
            <Breadcrumbs.List>
              <Breadcrumbs.Item>
                <Breadcrumbs.Link href="#/">Forside</Breadcrumbs.Link>
              </Breadcrumbs.Item>
              <Breadcrumbs.Item>
                <Breadcrumbs.Link href="#/komponenter">Komponenter</Breadcrumbs.Link>
              </Breadcrumbs.Item>
            </Breadcrumbs.List>
          </Breadcrumbs>

          <Heading level={1} data-size="xl" className="komp-page__title">
            Komponenter
          </Heading>
          <Paragraph data-size="lg" className="komp-page__intro">
            Komponentene fra Designsystemet med DIBK-tema. Hver av dem vises med
            et kort eksempel. DIBK-komponentene ligger nederst.
          </Paragraph>

          <Alert data-color="info" className="komp-disclaimer">
            <Heading level={2} data-size="xs">
              Dette er en demoside for et designsystem
            </Heading>
            <Paragraph>
              Eksempelteksten i komponentene er oppdiktet og er ikke veiledning.
              For faktisk informasjon om byggesak, se <a href="https://dibk.no">dibk.no</a>.
            </Paragraph>
          </Alert>

          {/* ---- Designsystemet components, alphabetical ---- */}

          <Demo name="Alert">
            <div className="komp-stack">
              <Alert data-color="info">
                <Heading level={3} data-size="2xs">
                  Nabovarsel er sendt
                </Heading>
                <Paragraph>Varselet er sendt til alle mottakerne i listen.</Paragraph>
              </Alert>
              <Alert data-color="warning">
                <Heading level={3} data-size="2xs">
                  Mangler dokumentasjon
                </Heading>
                <Paragraph>
                  Ett eller flere av vedleggene er ikke lastet opp ennå.
                </Paragraph>
              </Alert>
              <Alert data-color="success">
                <Heading level={3} data-size="2xs">
                  Søknaden er registrert
                </Heading>
                <Paragraph>Du får en bekreftelse på e-post.</Paragraph>
              </Alert>
              <Alert data-color="danger">
                <Heading level={3} data-size="2xs">
                  Søknaden ble avvist
                </Heading>
                <Paragraph>Begrunnelsen ligger i saken, sammen med hva som må rettes.</Paragraph>
              </Alert>
            </div>
          </Demo>

          <Demo name="Avatar">
            <div className="komp-row">
              <Avatar aria-label="Kari Nordmann" initials="KN" />
              <Avatar aria-label="Ola Hansen" initials="OH" data-color="brand1" />
              <Avatar aria-label="Per Berg" initials="PB" variant="square" />
            </div>
          </Demo>

          <Demo name="Avatar stack">
            <AvatarStack suffix="+3" aria-label="Saksbehandlere">
              <Avatar aria-label="Kari Nordmann" initials="KN" />
              <Avatar aria-label="Ola Hansen" initials="OH" />
              <Avatar aria-label="Per Berg" initials="PB" />
            </AvatarStack>
          </Demo>

          <Demo name="Badge">
            <div className="komp-row">
              <Badge count={3} />
              <Badge count={12} maxCount={9} data-color="danger" />
              <Badge.Position overlap="circle">
                <Badge count={5} variant="tinted" data-color="info" />
                <IconNabovarsel width={32} height={32} />
              </Badge.Position>
            </div>
          </Demo>

          <Demo name="Breadcrumbs">
            <Breadcrumbs aria-label="Du er her:">
              <Breadcrumbs.List>
                <Breadcrumbs.Item>
                  <Breadcrumbs.Link href="#">Forside</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Item>
                  <Breadcrumbs.Link href="#">Regelverk</Breadcrumbs.Link>
                </Breadcrumbs.Item>
                <Breadcrumbs.Item>
                  <Breadcrumbs.Link href="#">Underside</Breadcrumbs.Link>
                </Breadcrumbs.Item>
              </Breadcrumbs.List>
            </Breadcrumbs>
          </Demo>

          <Demo name="Button">
            <div className="komp-row">
              <Button variant="primary">Start søknad</Button>
              <Button variant="secondary">Lagre utkast</Button>
              <Button variant="tertiary">Avbryt</Button>
              <Button data-color="danger" variant="secondary">
                Slett
              </Button>
              <Button loading>Sender</Button>
            </div>
          </Demo>

          {/* DIBK cards: flat panels, no border, background via data-dibk-color
              (white when none). Same layout shown across the colour options. */}
          <Demo name="Card">
            <div className="komp-card-grid">
              {(
                [
                  [undefined, "Hvit"],
                  ["blue", "Blå"],
                  ["green", "Grønn"],
                  ["orange", "Oransje"],
                  ["grey", "Grå"],
                  ["pink", "Rosa"],
                ] as const
              ).map(([color, label]) => (
                <Card key={label} data-dibk-color={color}>
                  <Card.Block>
                    <Heading level={3} data-size="sm">
                      Søknad om tillatelse til tiltak
                    </Heading>
                  </Card.Block>
                  <Card.Block>
                    <Paragraph>
                      Fyll ut skjemaet, legg ved dokumentasjonen og send inn.
                    </Paragraph>
                  </Card.Block>
                  <Card.Block>
                    <Button variant="primary">Start søknad</Button>
                  </Card.Block>
                </Card>
              ))}
            </div>
          </Demo>

          <Demo name="Checkbox">
            <Checkbox
              label="Jeg bekrefter at opplysningene er riktige"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </Demo>

          <Demo name="Chip">
            <div className="komp-row">
              <Chip.Checkbox
                name="malform"
                value="bokmal"
                checked={chips.includes("bokmal")}
                onChange={() =>
                  setChips((c) =>
                    c.includes("bokmal")
                      ? c.filter((x) => x !== "bokmal")
                      : [...c, "bokmal"],
                  )
                }
              >
                Bokmål
              </Chip.Checkbox>
              <Chip.Checkbox
                name="malform"
                value="nynorsk"
                checked={chips.includes("nynorsk")}
                onChange={() =>
                  setChips((c) =>
                    c.includes("nynorsk")
                      ? c.filter((x) => x !== "nynorsk")
                      : [...c, "nynorsk"],
                  )
                }
              >
                Nynorsk
              </Chip.Checkbox>
              <Chip.Removable aria-label="Fjern filter">Brann</Chip.Removable>
            </div>
          </Demo>

          <Demo name="Details (trekkspill)">
            <Details defaultOpen>
              <Details.Summary>Når må jeg sende nabovarsel?</Details.Summary>
              <Details.Content>
                <Paragraph>
                  Oppdiktet svartekst uten faktiske regler. Den finnes for å gi
                  trekkspillmenyen realistisk lengde.
                </Paragraph>
                <Paragraph>
                  <a href="#">Slik ser en lenke i innholdet ut</a>
                </Paragraph>
              </Details.Content>
            </Details>
            <Details>
              <Details.Summary>Hva koster det å søke?</Details.Summary>
              <Details.Content>
                <Paragraph>
                  Oppdiktet svartekst. Panelet er lyseblått, og pilen står til
                  høyre for overskriften.
                </Paragraph>
              </Details.Content>
            </Details>
            <Details>
              <Details.Summary>Hvor lang er behandlingstiden?</Details.Summary>
              <Details.Content>
                <Paragraph>
                  Oppdiktet svartekst. Flere trekkspill etter hverandre får en
                  luftig avstand mellom seg.
                </Paragraph>
              </Details.Content>
            </Details>
          </Demo>

          <Demo name="Dialog">
            <Dialog.TriggerContext>
              <Dialog.Trigger>Åpne dialog</Dialog.Trigger>
              <Dialog>
                <Dialog.Block>
                  <Heading level={3} data-size="sm">
                    Bekreft innsending
                  </Heading>
                </Dialog.Block>
                <Dialog.Block>
                  <Paragraph>
                    Vil du sende inn søknaden nå? Du kan ikke endre den etterpå.
                  </Paragraph>
                </Dialog.Block>
                <Dialog.Block>
                  <Button variant="primary">Send inn</Button>
                </Dialog.Block>
              </Dialog>
            </Dialog.TriggerContext>
          </Demo>

          <Demo name="Divider">
            <div>
              <Paragraph>Over skillelinjen</Paragraph>
              <Divider />
              <Paragraph>Under skillelinjen</Paragraph>
            </div>
          </Demo>

          <Demo name="Dropdown">
            <Dropdown.TriggerContext>
              <Dropdown.Trigger>Handlinger</Dropdown.Trigger>
              <Dropdown>
                <Dropdown.Heading>Saksbehandling</Dropdown.Heading>
                <Dropdown.List>
                  <Dropdown.Item>
                    <Dropdown.Button>Godkjenn</Dropdown.Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.Button>Be om mer dokumentasjon</Dropdown.Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Dropdown.Button>Avslå</Dropdown.Button>
                  </Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
            </Dropdown.TriggerContext>
          </Demo>

          <Demo name="Error summary">
            {/* A classed div stands in for <ErrorSummary>: the real ds-error-summary
                element steals focus whenever it appears (that's its job after a form
                submit), which in a static catalog scrolls the page to it - on load,
                and again every time the mega-menu closes and re-shows the page. */}
            <div className="ds-error-summary" role="group">
              <ErrorSummary.Heading>Skjemaet inneholder feil</ErrorSummary.Heading>
              <ErrorSummary.List>
                <ErrorSummary.Item>
                  <ErrorSummary.Link href="#">Tiltakstype må velges</ErrorSummary.Link>
                </ErrorSummary.Item>
                <ErrorSummary.Item>
                  <ErrorSummary.Link href="#">Gårds- og bruksnummer mangler</ErrorSummary.Link>
                </ErrorSummary.Item>
              </ErrorSummary.List>
            </div>
          </Demo>

          <Demo name="Field">
            <Field>
              <Label>Gårdsnummer</Label>
              <Field.Description>Hjelpetekst som forklarer hva feltet skal inneholde.</Field.Description>
              <Input name="gnr" />
              <ValidationMessage>Gårdsnummer må fylles ut.</ValidationMessage>
            </Field>
          </Demo>

          <Demo name="Fieldset">
            <Fieldset>
              <Fieldset.Legend>Type tiltak</Fieldset.Legend>
              <Fieldset.Description>Velg det som passer best.</Fieldset.Description>
              <Radio name="tiltak-fs" value="nybygg" label="Nybygg" />
              <Radio name="tiltak-fs" value="tilbygg" label="Tilbygg" />
              <Radio name="tiltak-fs" value="bruksendring" label="Bruksendring" />
            </Fieldset>
          </Demo>

          <Demo name="Input">
            <Input aria-label="Postnummer" placeholder="0150" />
          </Demo>

          <Demo name="Link">
            <Link href="#">Slik ser en lenke i innholdet ut</Link>
          </Demo>

          <Demo name="List">
            <List.Unordered>
              <List.Item>Søknad om tillatelse til tiltak</List.Item>
              <List.Item>Nabovarsel med kvittering</List.Item>
              <List.Item>Situasjonsplan</List.Item>
            </List.Unordered>
          </Demo>

          <Demo name="Pagination">
            <Pagination aria-label="Sidenavigering">
              <Pagination.List>
                <Pagination.Item>
                  <Pagination.Button
                    aria-label="Forrige side"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Forrige
                  </Pagination.Button>
                </Pagination.Item>
                {[1, 2, 3].map((n) => (
                  <Pagination.Item key={n}>
                    <Pagination.Button
                      aria-label={`Side ${n}`}
                      aria-current={page === n ? "page" : undefined}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </Pagination.Button>
                  </Pagination.Item>
                ))}
                <Pagination.Item>
                  <Pagination.Button
                    aria-label="Neste side"
                    onClick={() => setPage((p) => Math.min(3, p + 1))}
                  >
                    Neste
                  </Pagination.Button>
                </Pagination.Item>
              </Pagination.List>
            </Pagination>
          </Demo>

          <Demo name="Popover">
            <Popover.TriggerContext>
              <Popover.Trigger variant="secondary">Hva betyr dette?</Popover.Trigger>
              <Popover>
                <Paragraph>
                  En kort forklaring av et begrep, i en boble som peker på knappen.
                </Paragraph>
              </Popover>
            </Popover.TriggerContext>
          </Demo>

          <Demo name="Radio">
            <Fieldset>
              <Fieldset.Legend>Skal du bo i boligen selv?</Fieldset.Legend>
              <Radio
                name="bo"
                value="ja"
                label="Ja"
                checked={radio === "ja"}
                onChange={(e) => setRadio(e.target.value)}
              />
              <Radio
                name="bo"
                value="nei"
                label="Nei"
                checked={radio === "nei"}
                onChange={(e) => setRadio(e.target.value)}
              />
            </Fieldset>
          </Demo>

          <Demo name="Search">
            <Search aria-label="Søk i regelverk og veiledning">
              <Search.Input
                aria-label="Søk i regelverk og veiledning"
                placeholder="Søk i regelverk og veiledning"
              />
              <Search.Clear />
              <Search.Button>Søk</Search.Button>
            </Search>
          </Demo>

          <Demo name="Select">
            <Select aria-label="Velg kommune" defaultValue="">
              <Select.Option value="" disabled>
                Velg kommune
              </Select.Option>
              <Select.Option value="k1">Lilleby</Select.Option>
              <Select.Option value="k2">Storeby</Select.Option>
              <Select.Option value="k3">Midtdalen</Select.Option>
            </Select>
          </Demo>

          <Demo name="Skeleton">
            <div className="komp-stack">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="90%" />
              <Skeleton variant="rectangle" width="100%" height={48} />
            </div>
          </Demo>

          <Demo name="Skip link">
            <SkipLink href="#komp-main">Hopp til hovedinnhold</SkipLink>
          </Demo>

          <Demo name="Spinner">
            <Spinner aria-label="Laster søknad" />
          </Demo>

          <Demo name="Suggestion">
            <Suggestion>
              <Suggestion.Input aria-label="Søk etter kommune" placeholder="Søk etter kommune" />
              <Suggestion.Clear />
              <Suggestion.List>
                <Suggestion.Empty>Ingen treff</Suggestion.Empty>
                <Suggestion.Option value="Lilleby">Lilleby</Suggestion.Option>
                <Suggestion.Option value="Storeby">Storeby</Suggestion.Option>
                <Suggestion.Option value="Midtdalen">Midtdalen</Suggestion.Option>
              </Suggestion.List>
            </Suggestion>
          </Demo>

          <Demo name="Switch">
            <Switch
              label="Motta varsler om saken på e-post"
              checked={switchOn}
              onChange={(e) => setSwitchOn(e.target.checked)}
            />
          </Demo>

          <Demo name="Table">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Dokument</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Dato</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Søknad om tillatelse</Table.Cell>
                  <Table.Cell>
                    <Tag data-color="success">Godkjent</Tag>
                  </Table.Cell>
                  <Table.Cell>12.03.2026</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Nabovarsel</Table.Cell>
                  <Table.Cell>
                    <Tag data-color="warning">Mangler</Tag>
                  </Table.Cell>
                  <Table.Cell>-</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Demo>

          <Demo name="Tabs">
            <Tabs value={tab} onChange={setTab}>
              <Tabs.List>
                <Tabs.Tab value="beskrivelse">Beskrivelse</Tabs.Tab>
                <Tabs.Tab value="vedlegg">Vedlegg</Tabs.Tab>
                <Tabs.Tab value="historikk">Historikk</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="beskrivelse">
                <Paragraph>Beskrivelse av tiltaket.</Paragraph>
              </Tabs.Panel>
              <Tabs.Panel value="vedlegg">
                <Paragraph>Vedlagte dokumenter.</Paragraph>
              </Tabs.Panel>
              <Tabs.Panel value="historikk">
                <Paragraph>Endringslogg for saken.</Paragraph>
              </Tabs.Panel>
            </Tabs>
          </Demo>

          <Demo name="Tag">
            <div className="komp-row">
              <Tag data-color="info">Til behandling</Tag>
              <Tag data-color="success">Godkjent</Tag>
              <Tag data-color="warning">Mangler dokumentasjon</Tag>
              <Tag data-color="danger">Avslått</Tag>
              <Tag data-color="neutral" variant="outline">
                Arkivert
              </Tag>
            </div>
          </Demo>

          <Demo name="Textarea">
            <Textarea
              aria-label="Beskrivelse av tiltaket"
              placeholder="Beskriv tiltaket kort"
              rows={3}
            />
          </Demo>

          <Demo name="Textfield">
            <Textfield
              label="Adresse for tiltaket"
              description="Gateadresse eller stedsnavn."
              placeholder="Storgata 1"
            />
          </Demo>

          <Demo name="Toggle group">
            <ToggleGroup value={toggle} onChange={setToggle} data-toggle-group="Visning">
              <ToggleGroup.Item value="kart">Kart</ToggleGroup.Item>
              <ToggleGroup.Item value="liste">Liste</ToggleGroup.Item>
              <ToggleGroup.Item value="tabell">Tabell</ToggleGroup.Item>
            </ToggleGroup>
          </Demo>

          <Demo name="Tooltip">
            <Tooltip content="Gårds- og bruksnummer">
              <Button variant="secondary">Gnr/Bnr</Button>
            </Tooltip>
          </Demo>

          <Demo name="Heading">
            <div className="komp-stack">
              <Heading level={2} data-size="lg">
                Overskrift large
              </Heading>
              <Heading level={3} data-size="sm">
                Overskrift small
              </Heading>
            </div>
          </Demo>

          <Demo name="Label">
            <Label weight="medium">Ansvarlig søker</Label>
          </Demo>

          <Demo name="Paragraph">
            <Paragraph>
              Et avsnitt med brødtekst over et par linjer, så du ser
              linjeavstanden og hvor tett bokstavene står.
            </Paragraph>
          </Demo>

          <Demo name="Validation message">
            <ValidationMessage>Feltet må fylles ut.</ValidationMessage>
          </Demo>

          {/* ---- DIBK custom components ---- */}

          <Heading level={2} data-size="lg" className="komp-divider-heading" id="dibk-komponenter">
            DIBK-komponenter
          </Heading>
          <Paragraph className="komp-page__intro">
            Komponenter som bare finnes her, og som Designsystemet ikke har fra
            før.
          </Paragraph>

          <Demo name="DibkLogo">
            <div className="komp-row komp-logo-row">
              <DibkLogo variant="full" style={{ height: 40 }} />
              <DibkLogo variant="mark" style={{ height: 40 }} />
            </div>
          </Demo>

          <Demo name="DibkHeader">
            <Paragraph data-size="sm">
              Toppmenyen ligger øverst på siden, med logoen til venstre og
              søk og meny til høyre.
            </Paragraph>
            <DibkHeader homeHref="#/" onMenuToggle={() => {}} onSearchToggle={() => {}} />
          </Demo>

          <Demo name="DibkIconLinkList">
            <DibkIconLinkList items={megaMenuLinks} columns={2} />
          </Demo>

          <Demo name="DibkSectionHeader">
            <DibkSectionHeader
              title="Kom i gang med byggeprosjektet"
              icon={<IconByggeEndre width={40} height={40} />}
              description="En ingress under overskriften, med ikonet til venstre og en skillelinje under."
            />
          </Demo>

          <Demo name="DibkFeedbackWidget">
            <DibkFeedbackWidget
              question="Fant du det du lette etter?"
              onAnswer={(a) => console.log("feedback:", a)}
            />
          </Demo>

          <Demo name="DibkMegaMenu">
            <Paragraph data-size="sm">
              Megamenyen åpnes med Meny-knappen i toppmenyen og dekker hele
              bredden. Det er DibkAppShell som styrer om den er åpen.
            </Paragraph>
          </Demo>

          <Demo name="DibkSearch">
            <Paragraph data-size="sm">
              Søkefeltet er understreket, med et forstørrelsesglass til høyre.
              Det brukes i megamenyen og alene på innholdssider.
            </Paragraph>
            <DibkSearch
              placeholder="Søk i regelverk og veiledning"
              hint={<>F.eks. «nabovarsel» eller «byggegrense»</>}
              onSearch={(q) => console.log("søk:", q)}
            />
          </Demo>

          <Demo name="DibkAccountMenu">
            <Paragraph data-size="sm">
              Kontomeny for innloggede brukere, ment for account-feltet i
              toppmenyen. Appen holder styr på hvem som er logget inn, mens
              komponenten viser navn, e-post, rolle og Logg ut.
            </Paragraph>
            <DibkAccountMenu
              name="Kari Nordmann"
              email="kari.nordmann@example.com"
              roleLabel="Saksbehandler"
              onLogout={() => console.log("logg ut")}
            />
          </Demo>

          <Demo name="DibkMenuLogin">
            <Paragraph data-size="sm">
              Innloggingsrad for menuExtra-feltet i megamenyen. Den vises til
              besøkende som ikke er logget inn.
            </Paragraph>
            <DibkMenuLogin onClick={() => console.log("logg inn")} />
          </Demo>

          <Demo name="DibkCopyButton">
            <div className="komp-row">
              <DibkCopyButton value="https://example.com" />
              <DibkCopyIconButton value="https://example.com" ariaLabel="Kopier lenken" size={22} />
            </div>
          </Demo>

          <Demo name="DibkCodeBlock">
            <DibkCodeBlock label="Tilkoblingsadresse" value="https://example.com/mcp" />
          </Demo>

          <Demo name="Ikoner (dibk-designsystemet/icons)">
            <ul className="komp-icon-gallery">
              {Object.entries(dibkIcons).map(([name, Icon]) => (
                <li key={name} className="komp-icon-gallery__item">
                  <Icon width={40} height={40} aria-hidden />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </Demo>
        </div>
    </DemoShell>
  );
}
