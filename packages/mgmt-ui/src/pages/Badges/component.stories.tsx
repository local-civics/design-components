import * as React            from "react";
import {MemoryRouter}        from "react-router-dom";
import {Badges, BadgesProps} from "./Badges";
import { Story }             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Badges",
  component: Badges,
};

/**
 * Component storybook template
 */
const Template: Story<BadgesProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Badges
                {...args}
                badges={args.badges || []}
                onAutocompleteChange={args.onAutocompleteChange || (() => {})}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<BadgesProps> = Template.bind({});
Component.args = {
    loading: false,
    badges: [
        {
            badgeId: "art101",
            name: "ART101: Visual Art Experience (3 credits, Brockport)",
            description: "This can be fulfilled as Dual ART250 or in the summer.",
            href: "/badges/art101/overview",
        },
        {
            badgeId: "asl102",
            name: "ASL102: American Sign Language II (3 credits, MCC)",
            description: "This can be fulfilled in ASL IV Fall.",
            href: "/badges/asl102/overview",
        },
        {
            badgeId: "career-exploration",
            name: "Career Exploration Badge",
            description: "This career exploration badge includes 11 tasks, including Student Profile, Self Assessment, Four-Year Plan, Career Research Project, Resume, Podcast Analysis, Healthcare Expo, Med Talks, Healthcare Career Fair, Career Portfolio & Presentation, and College Bootcamp.",
            href: "/badges/career-exploration/overview",
        },
    ],
};
