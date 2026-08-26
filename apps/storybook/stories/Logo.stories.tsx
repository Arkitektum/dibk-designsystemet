import { DibkLogo } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/Logo",
  component: DibkLogo,
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["full", "mark"],
    },
  },
} satisfies Meta<typeof DibkLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: { variant: "full" },
};

export const Mark: Story = {
  args: { variant: "mark" },
};

export const OnNavy: Story = {
  args: { variant: "full" },
  render: (args) => (
    <div style={{ background: "#003045", color: "#fff", padding: "2rem" }}>
      <DibkLogo {...args} />
    </div>
  ),
};
