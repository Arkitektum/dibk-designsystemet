// Poppins, the DIBK brand font, self-hosted.
import "dibk-designsystemet/fonts.css";
import "@digdir/designsystemet-css";
// DIBK theme tokens (--ds-* overrides: navy, radius 0, etc.). The rest of the brand
// CSS (base, overrides, per-component) arrives through the JS, because the JS entries
// are aliased to source here rather than to the built bundle.
import "dibk-designsystemet/theme.css";

import type { Decorator, Preview } from "@storybook/react";

const withDibkTheme: Decorator = (Story) => (
  <div data-color-scheme="light" data-size="md">
    <Story />
  </div>
);

const preview: Preview = {
  decorators: [withDibkTheme],
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
