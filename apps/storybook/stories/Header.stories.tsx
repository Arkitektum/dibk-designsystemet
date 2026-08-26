import { DibkHeader } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "DIBK/Header",
  component: DibkHeader,
  args: {
    homeHref: "/",
    menuOpen: false,
  },
} satisfies Meta<typeof DibkHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MenuOpen: Story = {
  args: { menuOpen: true },
};

export const Interactive: Story = {
  render: () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
      <DibkHeader
        homeHref="/"
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onSearchToggle={() => {}}
      />
    );
  },
};
