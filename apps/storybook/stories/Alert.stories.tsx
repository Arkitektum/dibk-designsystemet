import { Alert, Heading, Paragraph } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

// Designsystemet Alert with the four severities. With the DIBK theme these read
// as the DIBK "callout" boxes (info / advarsel / suksess / feil).
const meta = {
  title: "Designsystemet (DIBK-tema)/Alert",
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    "data-color": "info",
    children: "Husk å sjekke gjeldende krav i Byggteknisk forskrift (TEK17) før du sender inn.",
  },
};

export const Warning: Story = {
  args: {
    "data-color": "warning",
    children: "Søknaden mangler nabovarsel. Dette kan forsinke behandlingen.",
  },
};

export const Success: Story = {
  args: {
    "data-color": "success",
    children: "Søknaden er mottatt. Du får svar innen tre uker.",
  },
};

export const Danger: Story = {
  args: {
    "data-color": "danger",
    children: "Innsending feilet. Kontroller obligatoriske felt og prøv igjen.",
  },
};

export const AllSeverities: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--ds-size-4, 1rem)" }}>
      <Alert data-color="info">
        <Heading level={2} data-size="xs">
          Informasjon
        </Heading>
        <Paragraph>Veiledning til utfylling finner du under "Råd og veivisere".</Paragraph>
      </Alert>
      <Alert data-color="warning">Advarsel: fristen for høringssvar er i ferd med å gå ut.</Alert>
      <Alert data-color="success">Endringene dine er lagret.</Alert>
      <Alert data-color="danger">Feil: dokumentet kunne ikke lastes opp.</Alert>
    </div>
  ),
};
