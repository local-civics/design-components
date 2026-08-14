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
                categories={args.categories || []}
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
    categories: [
        {categoryId: "civics", name: "Civics", maxPoints: 30},
        {categoryId: "service", name: "Service", maxPoints: 20},
    ],
    criteria: {civics: 2, service: 4},
    displayTags: ["NYS SEAL", "Civic Skills", "High School"],
    students: [{
        userId: "1",
        avatar: "",
        name: "Jane Doe",
        email: "jane.doe@localcivics.io",
        categoryPoints: {civics: 12, service: 4},
        badges: [{
            badgeName: "Example badge",
            completion: 0,
            href: "",
        },{
            badgeName: "Example badge 2",
            completion: 0.5,
            href: "",
        },{
            badgeName: "Example badge 3",
            completion: 1,
            href: "",
        }]
    },{
        userId: "2",
        avatar: "",
        name: "John Smith",
        email: "john.smith@localcivics.io",
        isComplete: true,
        categoryPoints: {civics: 20, service: 10},
        badges: [{
            badgeName: "Example badge",
            completion: 1,
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
