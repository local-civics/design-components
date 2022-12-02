import * as React                                 from "react";
import {Dashboard, DashboardData, DashboardProps} from "./Dashboard";
import { Story }                                  from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Dashboard",
  component: Dashboard,
};

const mockdata: DashboardData = {
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
}

/**
 * Component storybook template
 */
const Template: Story<DashboardProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
    <Dashboard {...args} data={args.data || mockdata}/>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<DashboardProps> = Template.bind({});
Component.args = {};
