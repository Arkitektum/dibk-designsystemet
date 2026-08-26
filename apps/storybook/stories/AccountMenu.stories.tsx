import { DibkAccountMenu, DibkMenuLogin } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/AccountMenu",
  component: DibkAccountMenu,
} satisfies Meta<typeof DibkAccountMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Kari Nordmann",
    email: "kari.nordmann@example.com",
    roleLabel: "Saksbehandler",
    onLogout: () => console.log("logg ut"),
  },
};

export const WithoutRole: Story = {
  args: {
    name: "Ola Hansen",
    email: "ola.hansen@example.com",
    onLogout: () => console.log("logg ut"),
  },
};

/** The anonymous counterpart: the "Logg inn" row for the mega-menu's menuExtra slot. */
export const MenuLogin: Story = {
  args: { name: "" },
  render: () => <DibkMenuLogin onClick={() => console.log("logg inn")} />,
};
