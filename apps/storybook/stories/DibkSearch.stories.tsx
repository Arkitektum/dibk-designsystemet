import { DibkSearch } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/Search",
  component: DibkSearch,
} satisfies Meta<typeof DibkSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Søk i regelverk og veiledning",
    onSearch: (q) => console.log("søk:", q),
  },
};

export const WithHint: Story = {
  args: {
    placeholder: "Søk i tekst, hensikt og eksempel…",
    hint: "F.eks. «nabovarsel» eller «byggegrense»",
    onSearch: (q) => console.log("søk:", q),
  },
};
