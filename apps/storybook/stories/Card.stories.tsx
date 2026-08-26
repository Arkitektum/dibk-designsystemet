import { Button, Card, Heading, Paragraph } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Designsystemet (DIBK-tema)/Card",
  component: Card,
  args: {
    style: { maxWidth: 360 },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Card.Block>
          <Heading level={2} data-size="sm">
            Søknad om tillatelse til tiltak
          </Heading>
        </Card.Block>
        <Card.Block>
          <Paragraph>
            Bruk dette skjemaet når du skal søke om tillatelse til tiltak etter plan- og
            bygningsloven.
          </Paragraph>
        </Card.Block>
        <Card.Block>
          <Button variant="primary">Start søknad</Button>
        </Card.Block>
      </>
    ),
  },
};

export const Tinted: Story = {
  args: {
    variant: "tinted",
    children: (
      <>
        <Card.Block>
          <Heading level={2} data-size="sm">
            Råd og veivisere
          </Heading>
        </Card.Block>
        <Card.Block>
          <Paragraph>Finn fram til riktig regelverk og veiledning for ditt byggeprosjekt.</Paragraph>
        </Card.Block>
      </>
    ),
  },
};
