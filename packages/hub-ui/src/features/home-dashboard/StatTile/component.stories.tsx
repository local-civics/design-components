import React from "react";
import { Story } from "@storybook/react";
import { StatTile, StatTileProps, StatTileRow } from "./StatTile";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/StatTile",
  component: StatTile,
};

/**
 * Component storybook template
 */
const Template: Story<StatTileProps> = (args) => (
  <div style={{ width: 480 }}>
    <StatTileRow>
      <StatTile {...args} />
      <StatTile icon="badge" value={5} label="Badges Earned" accent="mint" />
      <StatTile icon="pathway" value={1} label="Pathways Active" accent="gold" />
      <StatTile icon="clock" value={0} label="Service Hours" accent="slate" />
    </StatTileRow>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<StatTileProps> = Template.bind({});
Component.args = {
  icon: "bolt",
  value: 7,
  label: "Lessons Done",
  accent: "cyan",
};
