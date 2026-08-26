import { Paragraph, Tabs } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Designsystemet (DIBK-tema)/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="krav">
      <Tabs.List>
        <Tabs.Tab value="krav">Krav</Tabs.Tab>
        <Tabs.Tab value="veiledning">Veiledning</Tabs.Tab>
        <Tabs.Tab value="historikk">Historikk</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="krav">
        <Paragraph>Kravene i TEK17 kapittel 13 om miljø og helse.</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="veiledning">
        <Paragraph>Veiledning til hvordan kravet kan oppfylles.</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="historikk">
        <Paragraph>Tidligere versjoner av bestemmelsen.</Paragraph>
      </Tabs.Panel>
    </Tabs>
  ),
};
