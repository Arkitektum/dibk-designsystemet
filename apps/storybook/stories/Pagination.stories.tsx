import { Pagination } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Designsystemet (DIBK-tema)/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Pagination aria-label="Sidenavigering">
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Button aria-label="Forrige side">Forrige</Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Side 1">1</Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Side 2" aria-current="page">
            2
          </Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Side 3">3</Pagination.Button>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Button aria-label="Neste side">Neste</Pagination.Button>
        </Pagination.Item>
      </Pagination.List>
    </Pagination>
  ),
};
