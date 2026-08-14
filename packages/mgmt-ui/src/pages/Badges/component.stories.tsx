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
                pathways={args.pathways || []}
                selectedPathway={args.selectedPathway || ""}
                onAutocompleteChange={args.onAutocompleteChange || (() => {})}
                onPathwayChange={args.onPathwayChange || (() => {})}
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
    pathways: [
        {pathwayId: "civic-readiness", title: "Civic Readiness"},
        {pathwayId: "seal-of-biliteracy", title: "Seal of Biliteracy"},
    ],
    badges: [
        {
            badgeId: "art101",
            name: "ART101: Visual Art Experience (3 credits, Brockport)",
            description: "This can be fulfilled as Dual ART250 or in the summer.",
            imageURL: "https://cdn.localcivics.io/v1/store/images/fai74t6pNTZYATSA4BxTUM?version=JshF8AaANZmRkhnFC45m9p",
            pathway: "Seal of Biliteracy",
            numberOfLessons: 4,
            href: "/badges/art101/overview",
        },
        {
            badgeId: "asl102",
            name: "ASL102: American Sign Language II (3 credits, MCC)",
            description: "This can be fulfilled in ASL IV Fall.",
            pathway: "Seal of Biliteracy",
            numberOfLessons: 6,
            href: "/badges/asl102/overview",
        },
        {
            badgeId: "career-exploration",
            name: "Career Exploration Badge",
            description: "This career exploration badge includes 11 tasks, including Student Profile, Self Assessment, Four-Year Plan, Career Research Project, Resume, Podcast Analysis, Healthcare Expo, Med Talks, Healthcare Career Fair, Career Portfolio & Presentation, and College Bootcamp.",
            pathway: "Civic Readiness",
            numberOfLessons: 11,
            href: "/badges/career-exploration/overview",
        },
    ],
};
