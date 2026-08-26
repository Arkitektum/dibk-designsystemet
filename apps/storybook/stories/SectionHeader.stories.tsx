import { DibkSectionHeader } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/SectionHeader",
  component: DibkSectionHeader,
  args: {
    title: "Byggteknisk forskrift (TEK17)",
    description: "Forskrift om tekniske krav til byggverk med veiledning.",
  },
} satisfies Meta<typeof DibkSectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { title: "Råd og veivisere", description: undefined },
};
