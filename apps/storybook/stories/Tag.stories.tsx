import { Tag } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Designsystemet (DIBK-tema)/Tag",
  component: Tag,
  args: {
    children: "Veiledning",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline", children: "TEK17" },
};

export const Statuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ds-size-2, 0.5rem)", flexWrap: "wrap" }}>
      <Tag data-color="info">Til behandling</Tag>
      <Tag data-color="success">Godkjent</Tag>
      <Tag data-color="warning">Mangler dokumentasjon</Tag>
      <Tag data-color="danger">Avslått</Tag>
      <Tag data-color="neutral" variant="outline">
        Arkivert
      </Tag>
    </div>
  ),
};
