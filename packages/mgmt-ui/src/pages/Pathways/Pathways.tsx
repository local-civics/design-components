import * as React from 'react';
import {Table, Item} from "./Table";

/**
 * PathwaysItem
 */
export type PathwaysItem = Item

/**
 * PathwaysProps
 */
export type PathwaysProps = {
    loading: boolean
    pathways: PathwaysItem[]
}

/**
 * PathwaysPage
 * @param props
 * @constructor
 */
export const Pathways = (props: PathwaysProps) => {
    return (
        <div className="flex flex-col gap-5 px-4 py-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Pathways</h1>
                <p className="text-sm text-slate-500">Explore all your unique pathway requirements in one clear space</p>
            </div>

            <Table loading={props.loading} items={props.pathways} />
        </div>
    )
}
