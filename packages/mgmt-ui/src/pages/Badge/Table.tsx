import * as React from 'react';
import {IconChevronDown} from '@tabler/icons';
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {SortableHeader} from "../../components/data/SortableHeader/SortableHeader";
import {StudentNameCell} from "../../components/data/StudentNameCell/StudentNameCell";
import {Stack as LessonStack, Item as LessonItem} from "./LessonStack";
import {useSortableData} from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    isComplete?: boolean
    // True once any of this badge's lessons has answers or has been finished. When supplied, the
    // status pill has three states (Complete / In progress / Not started) instead of two.
    isStarted?: boolean
    lessons: LessonItem[]
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
    // Forwarded to every row's nested LessonStack - see Pathway/BadgeStack.tsx's `state` field.
    linkState?: any
    // Jumps to this student's own profile - see Pathway/Table.tsx's identical field.
    onStudentClick?: (userId: string) => void
}

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const [expanded, setExpanded] = React.useState<Record<string, boolean>>({})

    const preparedItems = React.useMemo(() => {
        return props.items.map(item => ({
            ...item,
            status: item.isComplete ? 2 : (item.isStarted ? 1 : 0),
        }));
    }, [props.items]);

    const {items: sortedItems, requestSort, sortConfig} = useSortableData(preparedItems);

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 px-4">
                <SortableHeader label="Student Name" sortKey="name" sortConfig={sortConfig} onSort={requestSort} className="flex-1" />
                <SortableHeader label="Status" sortKey="status" sortConfig={sortConfig} onSort={requestSort} align="center" className="w-28 shrink-0" />
                <div className="w-4 shrink-0" />
            </div>

            {sortedItems.map((row) => {
                const isOpen = !!expanded[row.userId]
                return (
                    <div key={row.userId} className="rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div
                            onClick={() => setExpanded({...expanded, [row.userId]: !isOpen})}
                            className="flex cursor-pointer items-center gap-4 p-4"
                        >
                            <StudentNameCell userId={row.userId} name={row.name} email={row.email} avatar={row.avatar} onStudentClick={props.onStudentClick} />
                            <div className="w-28 shrink-0 text-center">
                                {row.isComplete && <span className="rounded-full bg-mint-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">Complete</span>}
                                {!row.isComplete && row.isStarted === undefined && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">Incomplete</span>}
                                {!row.isComplete && row.isStarted === false && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">Not started</span>}
                                {!row.isComplete && row.isStarted === true && <span className="rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-bold text-dark-blue-400">In progress</span>}
                            </div>
                            <IconChevronDown size={15} stroke={2.3} className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}/>
                        </div>
                        {isOpen && (
                            <div className="border-t border-slate-100 px-4 py-3">
                                <LessonStack items={row.lessons} state={props.linkState}/>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
