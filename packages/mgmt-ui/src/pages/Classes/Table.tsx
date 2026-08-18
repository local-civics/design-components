import {openConfirmModal} from "@mantine/modals";
import {Text} from '@mantine/core';
import * as React from 'react';
import {Link} from "react-router-dom";
import {IconTrash} from '@tabler/icons';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export type Item = {
    href: string,
    classId: string,
    name: string;
    description: string,
    numberOfStudents: number
}

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];
    onDeleteClass: (item: Item) => void
}

const openDeleteModal = (group: Item, onDeleteClass: (item: Item) => void) => openConfirmModal({
    title: `Delete "${group.name}"?`,
    centered: true,
    children: (
        <Text size="sm">
            Are you sure you want to delete this class? This action is destructive and you will have
            to contact support to restore your data.
        </Text>
    ),
    labels: { confirm: 'Delete class', cancel: "No don't delete it" },
    confirmProps: { color: 'red' },
    onConfirm: () => onDeleteClass(group),
});

/**
 * Table. Same delete-confirmation (openConfirmModal) and data as before this round's restyle -
 * only the row markup moved from mantine-datatable to Tailwind, reusing the already-wired
 * useSortableData hook.
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    const {items: sortedItems, requestSort, sortConfig} = useSortableData(props.items);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No classes to display"
            description="You don't have any classes yet. Try creating one first..."
            loading={props.loading}
            icon="groups"
        />
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-[1.5fr_2fr_1fr_0.6fr] gap-3 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <button onClick={() => requestSort("name")} className="flex items-center text-left hover:text-slate-700">Class Name{indicator("name")}</button>
                <div>Description</div>
                <button onClick={() => requestSort("numberOfStudents")} className="flex items-center justify-center text-center hover:text-slate-700"># of Students{indicator("numberOfStudents")}</button>
                <div />
            </div>
            {sortedItems.map((row, i) => (
                <div
                    key={row.classId}
                    className={`grid grid-cols-[1.5fr_2fr_1fr_0.6fr] items-center gap-3 px-5 py-3.5 ${
                        i < sortedItems.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                >
                    {row.href ? (
                        <Link to={row.href} className="truncate text-xs font-bold text-dark-blue-400 no-underline hover:text-sky-blue-400">
                            {row.name}
                        </Link>
                    ) : (
                        <span className="truncate text-xs font-bold text-dark-blue-400">{row.name}</span>
                    )}

                    <div className="truncate text-xs text-slate-500">{row.description}</div>

                    <div className="text-center text-xs font-bold text-dark-blue-400">{row.numberOfStudents || 0}</div>

                    <div>
                        <button
                            type="button"
                            onClick={() => openDeleteModal(row, props.onDeleteClass)}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500"
                        >
                            <IconTrash size={14} stroke={1.75} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
