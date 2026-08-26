import { DibkFooter } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/Footer",
  component: DibkFooter,
} satisfies Meta<typeof DibkFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithContent: Story = {
  args: {
    children: (
      <>
        <p>
          <strong>Lurer du på hvordan kommunen kan motta eByggesak?</strong>
          <br />
          <a href="#">Se veiledning på dibk.no</a>
        </p>
        <p>
          <strong>Har du spørsmål eller forslag til forbedringer?</strong>
          <br />
          Ta kontakt på epost <a href="#">byggesak@example.com</a>
        </p>
      </>
    ),
  },
};

export const BarOnly: Story = {
  args: {},
};
