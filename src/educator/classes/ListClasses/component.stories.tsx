import * as React                                      from "react";
import {Class, ListClasses, ListClassesProps} from "./ListClasses";
import { Story }                                       from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/Classes/ListClasses",
  component: ListClasses,
};

/**
 * Component storybook template
 */
const Template: Story<ListClassesProps> = (args) => {
    const classes: Class[] = [{
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
      <ListClasses
          classes={classes}
          {...args}
          loading={null}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ListClassesProps> = Template.bind({});
Component.args = {};
