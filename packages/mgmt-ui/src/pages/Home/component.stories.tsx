import * as React                  from "react";
import {Home, HomeData, HomeProps} from "./Home";
import { Story }                   from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Home",
  component: Home,
};

const mockdata: HomeData = {
    user: {
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
        givenName: "Jane",
        familyName: "Lanester",
        email: "jlanester@me.io",
        job: "Art director",
        quote: "Life is like an npm install – you never know what you are going to get.",
    },
    tenant: {
        name: "Local Civics Elementary School",
        description: "We connect students to powerful civic learning experiences.",
        image: "https://cdn.localcivics.io/hub/landing.jpg",
        website: "https://www.localcivics.io",
    },
    stats: {
        "PROBLEMS SOLVED": {
            diff: 24,
            value: 456133,
        },
        "LESSONS COMPLETED": {
            diff: -13,
            value: 2175,
        },
        "BADGES EARNED": {
            diff: 54,
            value: 1994,
        }
    },
    timeline: [
        {key: "123", name: "LessonCompleted", link: "https://www.localcivics.io", description: "Policy for all", time: "2022-01-01"},
        {key: "1234", name: "BadgeStarted", description: "Once upon a badge", time: "2022-08-01"},
        {key: "12345", name: "ProblemSolved", description: "More $, more problems", time: "2022-08-01"},
        {key: "12346", name: "ProblemSolved", description: "More $, more problems", time: "2022-08-01"},
        {key: "12347", name: "ProblemSolved", description: "More $, more problems", time: "2022-08-01"},
        {key: "12348", name: "ProblemSolved", description: "More $, more problems", time: "2022-08-01"},
        {key: "12349", name: "ProblemSolved", description: "More $, more problems", time: "2022-08-01"},
        {key: "12350", name: "ProblemSolved", description: "More $, more problems", time: "2022-08-01"},
        {key: "12351", name: "ProblemSolved", description: "More $, more problems", time: "2022-08-01"},
    ]
}

/**
 * Component storybook template
 */
const Template: Story<HomeProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <Home {...args} data={args.data || mockdata}/>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<HomeProps> = Template.bind({});
Component.args = {};
