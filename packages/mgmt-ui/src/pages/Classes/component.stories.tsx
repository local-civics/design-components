import * as React              from "react";
import {MemoryRouter}          from "react-router-dom";
import {AdminProvider}         from "../../providers/AdminProvider/AdminProvider";
import {Classes, ClassesProps} from "./Classes";
import { Story }               from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Classes",
  component: Classes,
};

/**
 * Component storybook template. Wrapped in AdminProvider (Mantine's ModalsProvider lives there)
 * since the delete-confirmation dialog is a real openConfirmModal call, same as Class Roster's
 * story - without this wrapper the confirm modal has nowhere to portal into.
 */
const Template: Story<ClassesProps> = (args) => (
    <AdminProvider><div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Classes
                {...args}
                classes={args.classes || []}
            />
        </MemoryRouter>
    </div></AdminProvider>
);

/**
 * Component stories
 */
export const Component: Story<ClassesProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<ClassesProps> = Template.bind({});
Mock.args = {
    classes: [{
        classId: "1",
        href: "/classes/1",
        name: "AP History",
        description: "Class for my first period API history subject",
        numberOfStudents: 8,
    },{
        classId: "2",
        href: "",
        name: "New Class",
        description: "Just created, not yet loaded from the server",
        numberOfStudents: 0,
    }]
};
