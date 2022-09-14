import * as React                                             from "react";
import {ManagedCriteria, ManageCriteria, ManageCriteriaProps} from "./ManageCriteria";
import { Story }                                              from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Admin/ManageCriteria",
  component: ManageCriteria,
};

/**
 * Component storybook template
 */
const Template: Story<ManageCriteriaProps> = (args) => {
    const criteria: ManagedCriteria = [{
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
      <ManageCriteria
          criteria={criteria}
          {...args}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageCriteriaProps> = Template.bind({});
Component.args = {};
