import * as React                from "react";
import {MgmtProvider}                      from "../../providers/MgmtProvider/MgmtProvider";
import {Badges, BadgesData, BadgesProps} from "./Badges";
import { Story }                           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Badges",
  component: Badges,
};

const mockdata: BadgesData = {
    loading: false,
    badge: {
        loading: false,
        key: "1234",
        name: "Badges in society",
        description: "A badge in governing societies",
        groups: [
            {name: 'Group 1', active: true},
            {name: 'Group 2'},
        ],
        tab: "Complete",
        users: [
            {
                "key": "1",
                "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "name": "Robert Wolfkisser",
                "email": "rob_wolf@gmail.com",
            },
            {
                "key": "2",
                "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "name": "Jill Jailbreaker",
                "email": "jj@breaker.com",
            },
            {
                "key": "3",
                "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "name": "Henry Silkeater",
                "email": "henry@silkeater.io",
            },
            {
                "key": "4",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "name": "Bill Horsefighter",
                "email": "bhorsefighter@gmail.com",
            },
            {
                "key": "5",
                "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "name": "Jeremy Footviewer",
                "email": "jeremy@foot.dev",
            }
        ],
    },
    badgeOpen: false,
    badges: [
        {
            key: "1",
            name: 'Extreme performance',
            description:
                'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit. Extend default theme with any amount of additional colors, replace shadows, radius, spacing, fonts and many other properties to match your design requirements. Mantine theme is just an object, you can subscribe to it in any part of application via context and use it to build your own components.',
        },
        {
            key: "2",
            name: 'Privacy focused',
            description:
                'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
        },
        {
            key: "3",
            name: 'No third parties',
            description:
                'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
        },
    ],
}

/**
 * Component storybook template
 */
const Template: Story<BadgesProps> = (args) => (
    <MgmtProvider>
      <div className="h-full w-full overscroll-none font-proxima">
        <Badges {...args} data={args.data || mockdata}/>
      </div>
    </MgmtProvider>
);

/**
 * Component stories
 */
export const Component: Story<BadgesProps> = Template.bind({});
Component.args = {};
