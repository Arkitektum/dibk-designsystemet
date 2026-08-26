import { Breadcrumbs } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Designsystemet (DIBK-tema)/Breadcrumbs",
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs aria-label="Du er her:">
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Forside</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Råd og veivisere</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="#">Byggteknisk forskrift (TEK17)</Breadcrumbs.Link>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  ),
};
