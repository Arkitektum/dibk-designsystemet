import { DibkIconLinkList, DibkMegaMenu, Search } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "DIBK/MegaMenu",
  component: DibkMegaMenu,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof DibkMegaMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const menuItems = [
  { label: "Råd og veivisere", href: "#", description: "Finn fram i regelverket" },
  { label: "Søknad og skjema", href: "#", description: "Søk om tillatelse til tiltak" },
  { label: "Byggteknisk forskrift (TEK17)", href: "#", description: "Krav og veiledning" },
  { label: "Byggesaksforskriften (SAK10)", href: "#", description: "Saksbehandling og kontroll" },
];

export const Open: Story = {
  render: (args) => (
    <DibkMegaMenu {...args}>
      <Search style={{ maxWidth: 640 }}>
        <Search.Input aria-label="Søk" placeholder="Søk i regelverk og veiledning" />
        <Search.Clear />
        <Search.Button />
      </Search>
      <DibkIconLinkList items={menuItems} columns={2} />
    </DibkMegaMenu>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          Åpne meny
        </button>
        <DibkMegaMenu open={open} onClose={() => setOpen(false)}>
          <DibkIconLinkList items={menuItems} columns={2} />
        </DibkMegaMenu>
      </>
    );
  },
};
