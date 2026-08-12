import * as React from 'react';
import {IconSearch} from "@tabler/icons";
import {Table, Item} from "./Table";

/**
 * BadgeItem
 */
export type BadgeItem = Item

/**
 * BadgesProps
 */
export type BadgesProps = {
    loading: boolean
    badges: BadgeItem[]

    onAutocompleteChange: (value: string) => void
}

/**
 * Badges
 * @param props
 * @constructor
 */
export const Badges = (props: BadgesProps) => {
    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Badges and micro-credentials</h1>
                <p className="text-sm text-slate-500">Project-sized skills acquisition and standards alignment.</p>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <IconSearch size={15} stroke={1.75} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Search for a badge that fits your needs"
                    onChange={(e) => props.onAutocompleteChange(e.target.value)}
                    className="flex-1 border-none bg-transparent text-sm text-dark-blue-400 outline-none placeholder:text-slate-400"
                />
            </div>

            <Table loading={props.loading} items={props.badges} />
        </div>
    )
}
