import * as React                  from "react";
import {MgmtProvider}              from "../../providers/MgmtProvider/MgmtProvider";
import { Mgmt, MgmtProps, MgmtData } from "./Mgmt";
import { Story }                   from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Shells/Mgmt",
  component: Mgmt,
};

const mockdata: MgmtData = {
    loading: false,
    account: {
        hidden: true,
        active: "1",
        accounts: [{
            key: "1",
            name: "Account #1"
        },{
            key: "2",
            name: "Account #2"
        },{
            key: "3",
            name: "Account #3"
        }],
    },
    dashboard: {
        loading: false,
        breakdown: {
            metric: "PROBLEMS SOLVED",
            users: [
                {
                    "name": "Athena Weissnat",
                    "value": 1,
                    "email": "Elouise.Prohaska@yahoo.com"
                },
                {
                    "name": "Deangelo Runolfsson",
                    "value": 4,
                    "email": "Kadin_Trantow87@yahoo.com"
                },
                {
                    "name": "Danny Carter",
                    "value": 7,
                    "email": "Marina3@hotmail.com"
                },
                {
                    "name": "Trace Tremblay PhD",
                    "value": 2,
                    "email": "Antonina.Pouros@yahoo.com"
                },
                {
                    "name": "Derek Dibbert",
                    "value": 2,
                    "email": "Abagail29@hotmail.com"
                },
                {
                    "name": "Viola Bernhard",
                    "value": 8,
                    "email": "Jamie23@hotmail.com"
                },
                {
                    "name": "Austin Jacobi",
                    "value": 20,
                    "email": "Genesis42@yahoo.com"
                },
                {
                    "name": "Hershel Mosciski",
                    "value": 1,
                    "email": "Idella.Stehr28@yahoo.com"
                },
                {
                    "name": "Mylene Ebert",
                    "value": 1,
                    "email": "Hildegard17@hotmail.com"
                },
                {
                    "name": "Lou Trantow",
                    "value": 0,
                    "email": "Hillard.Barrows1@hotmail.com"
                },
                {
                    "name": "Dariana Weimann",
                    "value": 12,
                    "email": "Colleen80@gmail.com"
                },
                {
                    "name": "Dr. Christy Herman",
                    "value": 12,
                    "email": "Lilyan98@gmail.com"
                },
                {
                    "name": "Katelin Schuster",
                    "value": 5,
                    "email": "Erich_Brekke76@gmail.com"
                },
                {
                    "name": "Melyna Macejkovic",
                    "value": 5,
                    "email": "Kylee4@yahoo.com"
                },
                {
                    "name": "Pinkie Rice",
                    "value": 8,
                    "email": "Fiona.Kutch@hotmail.com"
                },
                {
                    "name": "Brain Kreiger",
                    "value": 8,
                    "email": "Rico98@hotmail.com"
                },
                {
                    "name": "Myrtice McGlynn",
                    "value": 10,
                    "email": "Julius_Tremblay29@hotmail.com"
                },
                {
                    "name": "Chester Carter PhD",
                    "value": 10,
                    "email": "Jensen_McKenzie@hotmail.com"
                },
                {
                    "name": "Mrs. Ericka Bahringer",
                    "value": 10,
                    "email": "Lisandro56@hotmail.com"
                },
                {
                    "name": "Korbin Buckridge Sr.",
                    "value": 10,
                    "email": "Leatha9@yahoo.com"
                },
                {
                    "name": "Dr. Daisy Becker",
                    "value": 1,
                    "email": "Keaton_Sanford27@gmail.com"
                },
                {
                    "name": "Derrick Buckridge Sr.",
                    "value": 1,
                    "email": "Kay83@yahoo.com"
                },
                {
                    "name": "Ernie Hickle",
                    "value": 5,
                    "email": "Americo.Leffler89@gmail.com"
                },
                {
                    "name": "Jewell Littel",
                    "value": 5,
                    "email": "Hester.Hettinger9@hotmail.com"
                },
                {
                    "name": "Cyrus Howell",
                    "value": 23,
                    "email": "Rick0@gmail.com"
                },
                {
                    "name": "Dr. Orie Jast",
                    "value": 20,
                    "email": "Anna56@hotmail.com"
                },
                {
                    "name": "Luisa Murphy",
                    "value": 23,
                    "email": "Christine32@yahoo.com"
                },
                {
                    "name": "Lea Witting",
                    "value": 10,
                    "email": "Ford_Kovacek4@yahoo.com"
                },
                {
                    "name": "Kelli Runolfsson",
                    "value": 0,
                    "email": "Dimitri87@yahoo.com"
                },
                {
                    "name": "Brook Gaylord",
                    "value": 2,
                    "email": "Immanuel77@gmail.com"
                }
            ]
        },
        dateRange: [new Date(), new Date()],
        groups: [
            {name: 'Group 1', active: true},
            {name: 'Group 2'},
        ],
        overview: {
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
            areaChart: {
                metric: "PROBLEMS SOLVED",
                points: [
                    {
                        name: '2022-01-01',
                        value: 4000,
                    },
                    {
                        name: '2022-01-02',
                        value: 3000,
                    },
                    {
                        name: '2022-01-03',
                        value: 2000,
                    },
                    {
                        name: '2022-01-04',
                        value: 2780,
                    },
                    {
                        name: '2022-01-04',
                        value: 1890,
                    },
                    {
                        name: '2022-01-05',
                        value: 2390,
                    },
                    {
                        name: '2022-01-06',
                        value: 3490,
                    },
                ]
            }
        },
        tab: "Overview",
    },
    groups: {
        loading: false,
        groupOpen: false,
        formOpen: false,
        group: {
            loading: false,
            name: "My group",
            description: "My special group that I made",
            groupUserHomeOpen: false,
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
    },
    home: {
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
                diff: 13,
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
    },
    lessons: {
        loading: false,
        lesson: {
            loading: false,
            key: "1234",
            name: "Lessons in society",
            description: "A lesson in governing societies",
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
        lessonOpen: false,
        lessons: [
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
    },
    badges: {
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
    },
    navbar: {active: "Home"},
}

/**
 * Component storybook template
 */
const Template: Story<MgmtProps> = (args) => (
    <MgmtProvider>
      <div className="h-full w-full overscroll-none font-proxima">
        <Mgmt {...args} data={args.data || mockdata} onViewGroupUser={async (u) => args.onViewGroupUser(u)}/>
      </div>
    </MgmtProvider>
);

/**
 * Component stories
 */
export const Component: Story<MgmtProps> = Template.bind({});
Component.args = {};
