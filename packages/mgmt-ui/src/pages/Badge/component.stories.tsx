import * as React                        from "react";
import {Badge, BadgeProps} from "./Badge";
import { Story }                        from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Badge",
  component: Badge,
};

/**
 * Component storybook template
 */
const Template: Story<BadgeProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Badge
            {...args}
            classes={args.classes || []}
            students={args.students || []}
            lessons={args.lessons || []}
        />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgeProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<BadgeProps> = Template.bind({});
Mock.args = {
    classes: [{
        classId: "",
        active: false,
        name: "AP History",
    }],
    students: [{
        userId: "",
        avatar: "",
        name: "Jane Doe",
        email: "jane.doe@localcivics.io",
        lessons: [{
            lessonName: "Example lesson",
        },{
            lessonName: "Example lesson 2",
        }]
    }],
    lessons: [{
        lessonId: "",
        lessonName: "Example lesson",
        percentageCompletion: 0.4,
    }],
};
