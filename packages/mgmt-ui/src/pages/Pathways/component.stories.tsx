import * as React            from "react";
import {MemoryRouter}        from "react-router-dom";
import {Pathways, PathwaysProps} from "./Pathways";
import { Story }             from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Pathways",
  component: Pathways,
};

/**
 * Component storybook template
 */
const Template: Story<PathwaysProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Pathways
                {...args}
                pathways={args.pathways || []}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<PathwaysProps> = Template.bind({});
Component.args = {
    loading: false,
    pathways: [
        {
            pathwayId: "career-pathway",
            name: "Pathlink Career Pathway",
            description: "This career exploration badge includes 11 tasks, including Student Profile, Self Assessment, Four-Year Plan, Career Research Project, Resume, Podcast Analysis, Healthcare Expo, Med Talks, Healthcare Career Fair, Career Portfolio & Presentation, and College Bootcamp.",
            imageURL: "https://cdn.localcivics.io/v1/store/images/8vhAmnj4MS48HEDT9crNGo?version=RnfxctTo3ZjcHahfo34EAR",
            displayTags: ["NYS SEAL", "Career Readiness"],
            numberOfBadges: 11,
            href: "/pathways/career-pathway/overview",
        },
        {
            pathwayId: "dual-enrollment",
            name: "Pathlink Dual Enrollment Pathway",
            description: "A college & career readiness pathway that awards college credit for dual enrollment high school courses.",
            numberOfBadges: 4,
            href: "/pathways/dual-enrollment/overview",
        },
        {
            pathwayId: "seal-of-biliteracy",
            name: "Pathlink Seal of Biliteracy",
            description: "A pathway designed to highlight student skills in English and a second language other than English.",
            href: "/pathways/seal-of-biliteracy/overview",
        },
    ],
};
