import { DibkCodeBlock } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/CodeBlock",
  component: DibkCodeBlock,
} satisfies Meta<typeof DibkCodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Tilkoblingsadresse",
    value: "https://eksempel.dibk.no/mcp",
  },
};

/** `display` shows something other than what the Kopier button copies. */
export const DisplayDiffersFromValue: Story = {
  args: {
    label: "API-nøkkel",
    value: "sk-eksempel-0000000000000000",
    display: "sk-eksempel-••••••••••••••••",
  },
};

export const WithoutCopy: Story = {
  args: {
    label: "Eksempel",
    value: '{ "tiltak": "nybygg", "kommune": "0301" }',
    copyable: false,
  },
};
