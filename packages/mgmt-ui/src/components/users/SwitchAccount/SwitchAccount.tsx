import {IconBackpack, IconBooks, IconBuilding} from "@tabler/icons";
import * as React from 'react';
import {Loader, Modal} from '@mantine/core';
import {Emblem, EmblemAccent, EmblemIcon} from "../../media/Emblem/Emblem";

/**
 * AccountItem
 */
export type AccountItem = {
    accountId: string
    name: string
    isAdmin?: boolean
    isGroupAdmin?: boolean
}

/**
 * SwitchAccountProps
 */
export type SwitchAccountProps = {
    opened: boolean
    account: string
    loading: boolean
    accounts: AccountItem[]
    onClick: (account: string) => void;
    onClose: () => void;
}

const ROLE: Record<"admin" | "educator" | "student", {icon: EmblemIcon, accent: EmblemAccent, label: string}> = {
    admin: {icon: IconBuilding, accent: "gold", label: "Admin"},
    educator: {icon: IconBooks, accent: "mint", label: "Educator"},
    student: {icon: IconBackpack, accent: "cyan", label: "Student"},
}

const PILL: Record<EmblemAccent, string> = {
    cyan: "bg-sky-blue-400/15 text-dark-blue-400",
    mint: "bg-mint-400/15 text-dark-blue-400",
    gold: "bg-gold-400/15 text-dark-blue-400",
}

// Mirrors the icon-rendering priority already used elsewhere in this file: admin wins outright,
// then group-admin (educator), everything else falls to student - not a per-flag lookup.
const roleFor = (a: AccountItem) => a.isAdmin ? ROLE.admin : a.isGroupAdmin ? ROLE.educator : ROLE.student

/**
 * SwitchAccount
 * @param props
 * @constructor
 */
export const SwitchAccount = (props: SwitchAccountProps) => {
    const options = props.accounts.map((a) => {
        const role = roleFor(a)
        return (
            <button
                type="button"
                key={a.accountId}
                onClick={() => props.onClick && props.onClick(a.accountId)}
                className="flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-center hover:bg-slate-50"
            >
                <Emblem icon={role.icon} accent={role.accent} size="lg" />
                <span className="text-base font-extrabold text-dark-blue-400">{a.name}</span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${PILL[role.accent]}`}>{role.label}</span>
            </button>
        )
    })

    return (
        <Modal
            centered
            fullScreen
            title={<span className="text-base font-extrabold text-dark-blue-400">Change account</span>}
            opened={props.opened}
            onClose={() => props.onClose && props.onClose()}
        >
            <div className="relative">
                {props.loading && (
                    <div className="flex h-[400px] items-center justify-center">
                        <Loader />
                    </div>
                )}
                {!props.loading && (
                    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3">
                        {options}
                    </div>
                )}
            </div>
        </Modal>
    )
}
