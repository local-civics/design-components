import {openConfirmModal} from "@mantine/modals";
import {Text} from '@mantine/core';
import * as React from 'react';
import {Link} from "react-router-dom";
import {IconCheck, IconTrash} from '@tabler/icons';
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export type Item = {
    classId: string,
    userId: string,
    avatar: string,
    email: string,
    givenName: string,
    familyName: string,
    lastActivity: Date | null
    readonly: boolean
    hasAccount: boolean
    badgesEarned: number
    lessonsCompleted: number
    isAdmin: boolean
    href: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * TableProps
 */
export type TableProps = TableData & {
    onDelete: (member: Item) => void
    onRoleChange: (user: Item, role: string | null) => void;
}

const openDeleteModal = (student: Item, onDelete: (member: Item) => void) => openConfirmModal({
    title: `Remove "${student.givenName && student.familyName ? `${student.givenName} ${student.familyName}` : student.email}" from this class?`,
    centered: true,
    children: (
        <Text size="sm">
            Click confirm if you want to remove the student from this specific class. This will NOT remove the student from the Tech Platform.
        </Text>
    ),
    labels: { confirm: 'Remove Student', cancel: "Cancel" },
    confirmProps: { color: 'red' },
    onConfirm: () => onDelete(student),
});

/**
 * Table. Same delete-confirmation (`openConfirmModal`) and role-change behavior as before this
 * round's restyle — only the row markup moved from `mantine-datatable` to Tailwind.
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    const preparedItems = React.useMemo(() => {
        return props.items.map(item => ({
            ...item,
            fullName: item.givenName && item.familyName ? `${item.givenName} ${item.familyName}`.toLowerCase() : item.email.toLowerCase(),
        }));
    }, [props.items]);

    const {items: sortedItems, requestSort, sortConfig} = useSortableData(preparedItems);

    if (props.loading) {
        return <div className="text-sm text-slate-400">Loading…</div>;
    }

    if (props.items.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400 shadow-sm">
                You have not rostered any students yet.
            </div>
        );
    }

    const indicator = (key: string) => sortConfig.key !== key ? "" : (sortConfig.direction === "desc" ? " ▾" : " ▴");

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header/email text intentionally darker (slate-500) than the shared slate-400 token Pathways/Badges/Lessons/FileLocker's tables still use — scoped to this page pending design feedback, see plan. */}
            <div className="grid grid-cols-[2.2fr_1.2fr_1fr_1.2fr_1fr_0.6fr] gap-3 border-b border-slate-100 px-5 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                <button onClick={() => requestSort("fullName")} className="flex items-center text-left hover:text-slate-700">Name{indicator("fullName")}</button>
                <button onClick={() => requestSort("isAdmin")} className="flex items-center justify-center text-center hover:text-slate-700">Role{indicator("isAdmin")}</button>
                <button onClick={() => requestSort("badgesEarned")} className="flex items-center justify-center text-center hover:text-slate-700">Badges Earned{indicator("badgesEarned")}</button>
                <button onClick={() => requestSort("lessonsCompleted")} className="flex items-center justify-center text-center hover:text-slate-700">Lessons Completed{indicator("lessonsCompleted")}</button>
                <button onClick={() => requestSort("hasAccount")} className="flex items-center justify-center text-center hover:text-slate-700">Account Created?{indicator("hasAccount")}</button>
                <div />
            </div>
            {sortedItems.map((row, i) => {
                const name = row.givenName && row.familyName ? `${row.givenName} ${row.familyName}` : row.email;
                const initials = (row.givenName?.[0] || row.email[0] || "?") + (row.familyName?.[0] || "");
                const identity = (
                    <>
                        {row.avatar ? (
                            <img className="h-8 w-8 shrink-0 rounded-full object-cover" src={row.avatar} alt={name} />
                        ) : (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mint-400/20 text-[10px] font-bold text-dark-blue-400">
                                {initials.toUpperCase()}
                            </div>
                        )}
                        <div className="min-w-0">
                            <div className="truncate text-xs font-bold text-dark-blue-400">{name}</div>
                            <div className="truncate text-[10.5px] text-slate-500">{row.email}</div>
                        </div>
                    </>
                );
                return (
                    <div
                        key={row.email}
                        className={`grid grid-cols-[2.2fr_1.2fr_1fr_1.2fr_1fr_0.6fr] items-center gap-3 px-5 py-3.5 ${
                            i < sortedItems.length - 1 ? "border-b border-slate-100" : ""
                        }`}
                    >
                        {row.href ? (
                            <Link to={row.href} className="flex min-w-0 items-center gap-2.5 no-underline">
                                {identity}
                            </Link>
                        ) : (
                            <div className="flex min-w-0 items-center gap-2.5">
                                {identity}
                            </div>
                        )}

                        <div className="flex justify-center">
                            <select
                                disabled={row.readonly}
                                value={row.isAdmin ? "educator" : "student"}
                                onChange={(e) => props.onRoleChange && props.onRoleChange(row, e.target.value)}
                                className="w-fit rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 disabled:opacity-50"
                            >
                                <option value="student">Student</option>
                                <option value="educator">Educator</option>
                            </select>
                        </div>

                        <div className="text-center text-xs font-bold text-dark-blue-400">{row.badgesEarned}</div>
                        <div className="text-center text-xs font-bold text-dark-blue-400">{row.lessonsCompleted}</div>
                        <div className="flex justify-center">{row.hasAccount && <IconCheck size={16} stroke={3} className="text-mint-400" />}</div>
                        <div>
                            {!row.readonly && !!props.onDelete && (
                                <button
                                    type="button"
                                    onClick={() => openDeleteModal(row, props.onDelete)}
                                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-500"
                                >
                                    <IconTrash size={14} stroke={1.75} />
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
