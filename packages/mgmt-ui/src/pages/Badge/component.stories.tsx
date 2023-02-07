import * as React          from "react";
import {MemoryRouter}      from "react-router-dom";
import {Badge, BadgeProps} from "./Badge";
import { Story }           from "@storybook/react";

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
        <MemoryRouter>
            <Badge
                {...args}
                classes={args.classes || []}
                students={args.students || []}
                lessons={args.lessons || []}
            />
        </MemoryRouter>
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
    href: "",
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
            completion: 0,
            href: "",
        },{
            lessonName: "Example lesson 2",
            completion: 0.5,
            href: "",
        }]
    }],
    lessons: [{
        lessonId: "",
        href: "",
        lessonName: "Example lesson",
        percentageCompletion: 0.4,
    }],
};
