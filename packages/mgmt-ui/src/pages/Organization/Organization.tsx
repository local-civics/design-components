import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {PageHeader} from "../../components/navigation/PageHeader/PageHeader";
import {AccessCode} from "./AccessCode";

/**
 * OrganizationProps
 */
export type OrganizationProps = {
    loading: boolean
    displayName: string
    description: string
    numberOfStudents: number
    numberOfEducators: number
    percentageOfAccountsActive: number
    accessCode: string
    peopleLink: string

    onBackClick: () => void;
    onCopyAccessCode: () => void;
}

/**
 * Organization
 * @param props
 * @constructor
 */
export const Organization = (props: OrganizationProps) => {
    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <PageHeader
                onBackClick={props.onBackClick}
                title={props.displayName || "Overview"}
                description={props.description}
            />

            <AccessCode value={props.accessCode} onCopyCode={props.onCopyAccessCode} peopleLink={props.peopleLink} />

            <StatsGroup data={[
                {
                    title: "# OF STUDENTS",
                    value: props.numberOfStudents || 0,
                },
                {
                    title: "# OF EDUCATORS",
                    value: props.numberOfEducators || 0,
                },
                {
                    // Share of members active in the last 30 days (a rolling window, so it doesn't
                    // drop to ~0 on the 1st of every month).
                    title: "ACTIVE USERS (30 DAYS)",
                    value: props.percentageOfAccountsActive,
                    unit: "%",
                },
            ]}/>
        </div>
    )
}
