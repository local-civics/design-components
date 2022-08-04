import * as React from "react";
import { Story } from "@storybook/react";

import { BadgeEmblem, BadgeEmblemProps } from "./BadgeEmblem";

/**
 * Storybook component configuration
 */
export default {
  title: "Badges/BadgeEmblem",
  component: BadgeEmblem,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeEmblemProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <BadgeEmblem alt="College Explorer" icon="award ribbon" {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeEmblemProps> = Template.bind({});
Component.args = {};
