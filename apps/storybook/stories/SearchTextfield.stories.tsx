import { Search, Textfield } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

// Search + Textfield grouped: the two input patterns used in DIBK search and forms.
const meta = {
  title: "Designsystemet (DIBK-tema)/Search & Textfield",
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const SearchField: Story = {
  render: () => (
    <Search style={{ maxWidth: 480 }}>
      <Search.Input aria-label="Søk i regelverk og veiledning" placeholder="Søk..." />
      <Search.Clear />
      <Search.Button />
    </Search>
  ),
};

export const TextfieldDefault: Story = {
  render: () => (
    <Textfield
      label="Gårds- og bruksnummer"
      description="Oppgi matrikkelnummer for eiendommen."
      placeholder="f.eks. 12/345"
      style={{ maxWidth: 480 }}
    />
  ),
};

export const TextfieldMultiline: Story = {
  render: () => (
    <Textfield
      multiline
      label="Beskrivelse av tiltaket"
      description="Beskriv kort hva du skal bygge."
      rows={4}
      style={{ maxWidth: 480 }}
    />
  ),
};
