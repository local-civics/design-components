import { Story } from "@storybook/react";
import React from "react";
import { Tab } from "./Tab/Tab";
import { Board, BoardProps } from "./Board";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/Board",
  component: Board,
};

/**
 * Component storybook template
 */
const Template: Story<BoardProps> = (args) => {
  const tabs = (
    <>
      <Tab icon="badges" title="badges" />
      <Tab icon="milestones" title="milestones" />
      <Tab icon="activity" title="activity" />
    </>
  );

  return <Board tabs={tabs} {...args} />;
};

/**
 * Component view
 */
export const Component: Story<BoardProps> = Template.bind({});
Component.args = {};
