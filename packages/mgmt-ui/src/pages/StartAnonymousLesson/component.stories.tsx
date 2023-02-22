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
            description={args.description||"Finding community within an institution, and campus in totality is something that can be overlooked. However, it’s in these communities where you gain valuable, intangible skills and personal growth. In this activity, you will be zooming in on your personal identities and intentionally looking for spaces on campus that match your personality and needs. You will be able to look back at your research when you get to campus someday soon— so take advantage of this opportunity!"}
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
