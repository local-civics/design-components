import * as React                        from "react";
import {Lesson, LessonProps} from "./Lesson";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Lessons/Lesson",
  component: Lesson,
};

/**
 * Component storybook template
 */
const Template: Story<LessonProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <Lesson {...args} classes={[]} users={[]} />
    </div>
);

/**
 * Component stories
 */
export const Component: Story<LessonProps> = Template.bind({});
Component.args = {};
