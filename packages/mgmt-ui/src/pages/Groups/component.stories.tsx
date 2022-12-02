import * as React                        from "react";
import {MgmtProvider}                    from "../../providers/MgmtProvider/MgmtProvider";
import {Groups, GroupsData, GroupsProps} from "./Groups";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Groups",
  component: Groups,
};

const mockdata: GroupsData = {
    loading: false,
    groupOpen: false,
    formOpen: false,
    group: {
        name: "My group",
        loading: false,
        groupUserHomeOpen: false,
        description: "My special group that I made",
        user: {
            loading: false,
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
        ],
        users: [
            {
                "key": "1",
                "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "givenName": "Robert",
                "familyName": "Wolfkisser",
                "email": "rob_wolf@gmail.com",
                "role": "Member",
                "lastActivity": new Date()
            },
            {
                "key": "2",
                "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "givenName": "Jill",
                "familyName": "Jailbreaker",
                "email": "jj@breaker.com",
                "role": "Member",
                "lastActivity": new Date('2022-01-01')
            },
            {
                "key": "3",
                "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "givenName": "Henry",
                "familyName": "Silkeater",
                "email": "henry@silkeater.io",
                "role": "Member",
                "lastActivity": new Date((new Date()).getTime() - (1000*60*60*24))
            },
            {
                "key": "4",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "givenName": "Bill",
                "familyName": "Horsefighter",
                "email": "bhorsefighter@gmail.com",
                "role": "Member",
                "lastActivity": new Date((new Date()).getTime() - (1000*60*60)),
            },
            {
                "key": "5",
                "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
                "givenName": "Jeremy",
                "familyName": "Footviewer",
                "email": "jeremy@foot.dev",
                "role": "Admin",
                "lastActivity": new Date((new Date()).getTime() - (1000*60*5)),
            }
        ]
    },
    groups: [
        {
            key: "0",
            name: 'Extreme performance',
            description:
                'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
        },
        {
            key: "1",
            name: 'Privacy focused',
            description:
                'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
        },
        {
            key: "2",
            name: 'No third parties',
            description:
                'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
        },
    ]
}

/**
 * Component storybook template
 */
const Template: Story<GroupsProps> = (args) => (
    <MgmtProvider>
      <div className="h-full w-full overscroll-none font-proxima">
        <Groups {...args} data={args.data || mockdata} onViewGroupUser={async (u) => args.onViewGroupUser(u)}/>
      </div>
    </MgmtProvider>
);

/**
 * Component stories
 */
export const Component: Story<GroupsProps> = Template.bind({});
Component.args = {};
