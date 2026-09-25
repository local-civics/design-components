import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {PageHeader} from "../../components/navigation/PageHeader/PageHeader";
import {AccessCode} from "./AccessCode";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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
                    title: `ACTIVE USERS (${monthNames[(new Date()).getMonth()]})`,
                    value: props.percentageOfAccountsActive,
                    unit: "%",
                },
            ]}/>
        </div>
    )
}
