import React from "react";
import { Story } from "@storybook/react";
import { IconAlbum, IconRoute } from "@tabler/icons";
import { PageHeader, PageHeaderProps } from "./PageHeader";

export default {
    title: "Library/PageHeader",
    component: PageHeader,
};

const Template: Story<PageHeaderProps> = (args) => <PageHeader {...args} />;

/**
 * Bare header - Lesson/Class/Student/People/Organization/FileLocker's shape (no Emblem, no
 * secondary link, no breadcrumb).
 */
export const Bare: Story<PageHeaderProps> = Template.bind({});
Bare.args = {
    onBackClick: () => {},
    title: "Reflective Essay Lesson",
    description: "Students reflect on their civic engagement experience.",
    actions: <button className="rounded-lg bg-gold-400 px-4 py-2 text-xs font-bold text-dark-blue-400">Export data (.csv)</button>,
};

/**
 * Badge-shaped: Emblem + Back + the "Go to Pathway" secondary link + breadcrumb.
 */
export const BadgeShaped: Story<PageHeaderProps> = Template.bind({});
BadgeShaped.args = {
    icon: IconAlbum,
    iconAccent: "mint",
    onBackClick: () => {},
    onSecondaryClick: () => {},
    secondaryLabel: "Go to Pathway",
    breadcrumb: [
        { label: "Pathways", onClick: () => {} },
        { label: "Civic Readiness", onClick: () => {} },
        { label: "NYS Seal Badge" },
    ],
    title: "NYS Seal Badge",
    description: "Demonstrate civic knowledge and participation.",
};

/**
 * Pathway-shaped: Emblem + tags, no secondary link (top of hierarchy).
 */
export const PathwayShaped: Story<PageHeaderProps> = Template.bind({});
PathwayShaped.args = {
    icon: IconRoute,
    iconAccent: "cyan",
    onBackClick: () => {},
    breadcrumb: [{ label: "Pathways", onClick: () => {} }, { label: "Civic Readiness" }],
    title: "Civic Readiness",
    tags: ["Civics", "Service Learning"],
    description: "A pathway toward the NYS Seal of Civic Readiness.",
};
