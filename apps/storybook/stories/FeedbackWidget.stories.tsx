import { DibkFeedbackWidget } from "dibk-designsystemet";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "DIBK/FeedbackWidget",
  component: DibkFeedbackWidget,
} satisfies Meta<typeof DibkFeedbackWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAnswer: (answer) => console.log("svar:", answer),
  },
};

export const CustomQuestion: Story = {
  args: {
    question: "Var denne veiledningen nyttig?",
    onAnswer: (answer) => console.log("svar:", answer),
  },
};
