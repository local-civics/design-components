import { ProfilePage, ProfilePageProps } from ".";
import { Story }                         from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
    title: "Pages/ProfilePage",
    component: ProfilePage,
};

/**
 * Component storybook template
 */
const Template: Story<ProfilePageProps> = (args) => <ProfilePage {...args} />;

const state = {
    givenName: "Andre",
    familyName: "Carter",
    statement: "This Harlem boi is out to make the world a better place for the fam. The added more for the test. That extends the page to multiple lines.",
    city: "Harlem",
    state: "NY",
    community: "Harlem Children Zone",
    events: 12,
    badges: 3,
    milestones: 7,
    xp: 3475,
    nextXP: 3975,
    stage: 2,
    createdAt: "January 1, 2020",
    pathways: [
        { name: "College & Career", icon: "college", journey: [{}] },
        { name: "Arts & Culture", icon: "culture", journey: [{}] },
        { name: "Policy & Government", icon: "politics", journey: [{}] },
        { name: "Recreation", icon: "recreation", journey: [{}] },
        { name: "Volunteering", icon: "volunteer", journey: [{}] },
    ],
    registered: [
        { name: "Career Interest Inventory I", notBefore: "September 15, 2020"},
        { name: "Career Interest Inventory II", notBefore: "September 15, 2020"},
        { name: "Career Interest Inventory III", notBefore: "September 15, 2020"}
    ]
}

/**
 * Component stories
 */
export const Default: Story<ProfilePageProps> = Template.bind({});
Default.args = {
    ...state,
};

/**
 * Component stories
 */
export const NoRegistrations: Story<ProfilePageProps> = Template.bind({});
NoRegistrations.args = {
    ...Default.args,
    registered: undefined,
};
