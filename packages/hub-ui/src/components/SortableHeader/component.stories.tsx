import React from "react";
import { Story } from "@storybook/react";
import { SortableHeader, SortableHeaderProps } from "./SortableHeader";

/**
 * Storybook component configuration
 */
export default {
  title: "Library/SortableHeader",
  component: SortableHeader,
};

/**
 * Component storybook template
 */
const Template: Story<SortableHeaderProps> = (args) => <SortableHeader {...args} />;

/**
 * Neutral: not the active sort column - both carets shown, signaling "clickable, not sorted"
 */
export const Neutral: Story<SortableHeaderProps> = Template.bind({});
Neutral.args = {
  label: "Badge",
  sortKey: "displayName",
  sortConfig: { key: "", direction: null },
  onSort: (key) => console.log("sort by", key),
};

/**
 * Active, ascending
 */
export const ActiveAscending: Story<SortableHeaderProps> = Template.bind({});
ActiveAscending.args = {
  label: "Badge",
  sortKey: "displayName",
  sortConfig: { key: "displayName", direction: "asc" },
  onSort: (key) => console.log("sort by", key),
};

/**
 * Active, descending
 */
export const ActiveDescending: Story<SortableHeaderProps> = Template.bind({});
ActiveDescending.args = {
  label: "Badge",
  sortKey: "displayName",
  sortConfig: { key: "displayName", direction: "desc" },
  onSort: (key) => console.log("sort by", key),
};

/**
 * A representative header row: one active column among several neutral ones, right-aligned
 * columns included.
 */
const RowTemplate: Story<{ activeKey: string; direction: "asc" | "desc" }> = (args) => {
  const sortConfig = { key: args.activeKey, direction: args.direction };
  const onSort = (key: string) => console.log("sort by", key);
  return (
    <div className="flex w-[500px] gap-3 px-3.5">
      <SortableHeader label="Badge" sortKey="displayName" sortConfig={sortConfig} onSort={onSort} className="w-40 shrink-0" />
      <SortableHeader label="Pathway" sortKey="pathwayName" sortConfig={sortConfig} onSort={onSort} className="w-32 shrink-0" />
      <SortableHeader label="Lessons" sortKey="numberOfLessons" sortConfig={sortConfig} onSort={onSort} className="w-20 shrink-0" />
      <SortableHeader label="Points" sortKey="weight" sortConfig={sortConfig} onSort={onSort} align="right" className="w-14 shrink-0" />
    </div>
  );
};

export const Row: Story<{ activeKey: string; direction: "asc" | "desc" }> = RowTemplate.bind({});
Row.args = {
  activeKey: "weight",
  direction: "asc",
};
