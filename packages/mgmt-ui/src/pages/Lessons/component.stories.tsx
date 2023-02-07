import * as React              from "react";
import {MemoryRouter}          from "react-router-dom";
import {Lessons, LessonsProps} from "./Lessons";
import { Story }               from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Lessons",
  component: Lessons,
};

/**
 * Component storybook template
 */
const Template: Story<LessonsProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Lessons
                {...args}
                lessons={args.lessons || []}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<LessonsProps> = Template.bind({});
Component.args = {};
