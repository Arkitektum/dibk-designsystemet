import { DibkCopyButton, DibkCopyIconButton } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/CopyButton",
  component: DibkCopyButton,
} satisfies Meta<typeof DibkCopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "https://dibk.no",
  },
};

export const CustomAriaLabel: Story = {
  args: {
    value: "toving-fjellrev-syltetoy-kanelbolle",
    ariaLabel: "Kopier kodeord",
  },
};

/** Quiet icon-only variant for places where a full button would shout. */
export const IconOnly: Story = {
  args: {
    value: "https://dibk.no",
  },
  render: (args) => <DibkCopyIconButton {...args} ariaLabel="Kopier lenken" size={22} />,
};
