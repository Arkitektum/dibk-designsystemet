import { Button } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Designsystemet (DIBK-tema)/Button",
  component: Button,
  args: {
    children: "Send søknad",
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "tertiary"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Avbryt" },
};

export const Tertiary: Story = {
  args: { variant: "tertiary", children: "Les mer" },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ds-size-2, 0.5rem)", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--ds-size-2, 0.5rem)", flexWrap: "wrap" }}>
      <Button data-color="accent">Accent</Button>
      <Button data-color="neutral">Neutral</Button>
      <Button data-color="danger">Slett</Button>
    </div>
  ),
};
