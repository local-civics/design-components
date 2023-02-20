import * as React                                     from "react";
import { StartAnonymousLesson, StartAnonymousLessonProps } from "./StartAnonymousLesson";
import { Story }                                      from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/StartAnonymousLesson",
  component: StartAnonymousLesson,
};

/**
 * Component storybook template
 */
const Template: Story<StartAnonymousLessonProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <StartAnonymousLesson
            {...args}
            title={args.title || "Lesson"}
            description={args.description||"An example lesson description"}
            educatorName={args.educatorName||"Jane Doe"}
        />
        {/*<img className="object-cover w-screen h-screen" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />*/}
    </div>
);

/**
 * Component stories
 */
export const Component: Story<StartAnonymousLessonProps> = Template.bind({});
Component.args = {};
