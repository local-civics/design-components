import * as React          from "react";
import {MemoryRouter}      from "react-router-dom";
import {Pathway, PathwayProps} from "./Pathway";
import { Story }           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Pathway",
  component: Pathway,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Pathway
                {...args}
                classes={args.classes || []}
                students={args.students || []}
                badges={args.badges || []}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<PathwayProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<PathwayProps> = Template.bind({});
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
        badges: [{
            badgeName: "Example badge",
            completion: 0,
            href: "",
        },{
            badgeName: "Example badge 2",
            completion: 0.5,
            href: "",
        }]
    }],
    badges: [{
        badgeId: "",
        href: "",
        badgeName: "Example badge",
        percentageCompletion: 0.4,
    }],
};
