import { DibkIconLinkList } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/IconLinkList",
  component: DibkIconLinkList,
  argTypes: {
    columns: {
      control: "inline-radio",
      options: [1, 2, 3],
    },
  },
} satisfies Meta<typeof DibkIconLinkList>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    label: "Råd og veivisere",
    href: "#",
    description: "Veiledning til regelverk og byggesak.",
  },
  {
    label: "Søknad og skjema",
    href: "#",
    description: "Søk om tillatelse til tiltak.",
  },
  {
    label: "Byggteknisk forskrift (TEK17)",
    href: "#",
    description: "Tekniske krav til byggverk.",
  },
  {
    label: "Sentral godkjenning",
    href: "#",
    description: "For foretak i byggenæringen.",
  },
];

export const TwoColumns: Story = {
  args: { items, columns: 2 },
};

export const OneColumn: Story = {
  args: { items, columns: 1 },
};

export const ThreeColumns: Story = {
  args: { items, columns: 3 },
};
