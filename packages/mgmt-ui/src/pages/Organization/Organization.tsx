import {IconArrowLeft} from "@tabler/icons";
import * as React from 'react';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
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
            <div className="space-y-1.5">
                <div onClick={props.onBackClick} className="flex w-max cursor-pointer items-center gap-1 text-xs font-bold text-sky-blue-400">
                    <IconArrowLeft size={13} stroke={2.5} />
                    Back
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.displayName || "Overview"}</h1>
                <p className="max-w-xl text-sm text-slate-500">{props.description || "No description"}</p>
            </div>

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
