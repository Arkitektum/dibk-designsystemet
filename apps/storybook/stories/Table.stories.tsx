import { Table, Tag } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Designsystemet (DIBK-tema)/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { saksnr: "2024/00123", tiltak: "Tilbygg bolig", status: "Godkjent", color: "success" as const },
  {
    saksnr: "2024/00188",
    tiltak: "Riving av uthus",
    status: "Til behandling",
    color: "info" as const,
  },
  { saksnr: "2024/00210", tiltak: "Fasadeendring", status: "Avslått", color: "danger" as const },
];

export const Default: Story = {
  render: () => (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Saksnummer</Table.HeaderCell>
          <Table.HeaderCell>Tiltak</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.saksnr}>
            <Table.Cell>{row.saksnr}</Table.Cell>
            <Table.Cell>{row.tiltak}</Table.Cell>
            <Table.Cell>
              <Tag data-color={row.color}>{row.status}</Tag>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};
