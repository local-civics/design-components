import * as React                                           from "react";
import {Criteria, ListCriteria, ListCriteriaProps} from "./ListCriteria";
import { Story }                                            from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/Badges/ListCriteria",
  component: ListCriteria,
};

/**
 * Component storybook template
 */
const Template: Story<ListCriteriaProps> = (args) => {
    const criteria: Criteria = [{
        displayName: "Criteria #1",
        tags: ["tag1", "tag2", "tag3"]
    },{
        displayName: "Criteria #2",
        tags: ["tag1", "tag2", "tag3"],
        skills: ["skill1"]
    },{
        displayName: "Criteria #3",
        activityIds: ["P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1", "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2", "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3"],
    },{
        displayName: "Criteria #4",
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ListCriteria
          criteria={criteria}
          {...args}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ListCriteriaProps> = Template.bind({});
Component.args = {};
