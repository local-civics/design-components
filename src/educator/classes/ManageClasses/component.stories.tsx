import * as React                                                     from "react";
import {ManagedClass, ManageClasses, ManageClassesProps} from "./ManageClasses";
import { Story }                                                      from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/ManageClasses",
  component: ManageClasses,
};

/**
 * Component storybook template
 */
const Template: Story<ManageClassesProps> = (args) => {
    const classes: ManagedClass[] = [{
        displayName: "Class #1",
        classId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1"
    },{
        displayName: "Class #2",
        classId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2"
    },{
        displayName: "Class #3",
        classId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3"
    },{
        displayName: "Class #4",
        classId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4"
    }]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageClasses
          classes={classes}
          {...args}
          loading={null}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageClassesProps> = Template.bind({});
Component.args = {};
