import React from "react";
import { Story } from "@storybook/react";
import { FileList, FileListProps } from "./FileList";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/FileList",
  component: FileList,
};

/**
 * Component storybook template
 */
const Template: Story<FileListProps> = (args) => (
  <div style={{ width: 700 }}>
    <FileList {...args} />
  </div>
);

/**
 * Component stories
 */
export const Component: Story<FileListProps> = Template.bind({});
Component.args = {
  items: [
    {
      link: "https://cdn.localcivics.io/v1/store/objects/example1",
      badgeName: "Community Leaders",
      lessonName: "Interviewing a Local Official",
      question: "Upload your interview recording",
    },
    {
      link: "https://cdn.localcivics.io/v1/store/objects/example2",
      badgeName: "Community Leaders",
      lessonName: "Interviewing a Local Official",
      question: "Share a link to your written reflection",
    },
  ],
};

/**
 * All columns hidden except Question - the shape used inside a "By lesson" group, where the
 * lesson and badge are already fixed by the group's own header.
 */
export const AllColumnsHidden: Story<FileListProps> = Template.bind({});
AllColumnsHidden.args = {
  items: Component.args.items,
  hideBadge: true,
  hideLesson: true,
};
