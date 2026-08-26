import type { Meta, StoryObj } from "@storybook/react";
import { dibkIcons, type DibkIconName } from "dibk-designsystemet/icons";

function IconGallery({ size }: { size: number }) {
  const names = Object.keys(dibkIcons) as DibkIconName[];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {names.map((name) => {
        const Icon = dibkIcons[name];
        return (
          <div
            key={name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem",
              border: "1px solid var(--ds-color-neutral-border-subtle, #d7d4d1)",
              textAlign: "center",
            }}
          >
            <Icon style={{ width: size, height: size }} />
            <code style={{ fontSize: "0.75rem" }}>{name}</code>
          </div>
        );
      })}
    </div>
  );
}

const meta: Meta<typeof IconGallery> = {
  title: "DIBK/Icons",
  component: IconGallery,
  args: { size: 48 },
  argTypes: { size: { control: { type: "range", min: 16, max: 96, step: 4 } } },
};
export default meta;

type Story = StoryObj<typeof IconGallery>;

export const Gallery: Story = {};
