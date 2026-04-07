import * as React                         from 'react';
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { ScrollArea } from '@mantine/core';
import { PlaceholderBanner }                from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import { useSortableData }                from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    studentName: string
    reflection: string
    rating: number
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * TableMethods
 */
export type TableMethods = {}


/**
 * TableProps
 */
export type TableProps = TableData & TableMethods

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const { items: sortedItems, requestSort, sortConfig } = useSortableData(props.items);

    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No reflections to display"
            description="There has not been any lesson progress just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    const sortStatus: DataTableSortStatus = {
        columnAccessor: sortConfig.key as string,
        direction: sortConfig.direction === 'desc' ? 'desc' : 'asc',
    };
    
    return (
        <ScrollArea.Autosize maxHeight={600}>
            <DataTable
                records={sortedItems} // sorted items instead of props.items
                sortStatus={sortStatus}
                onSortStatusChange={(status) => requestSort(status.columnAccessor)}
                columns={[
                    { accessor: 'studentName', title: 'Student Name', sortable: true },
                    { accessor: 'reflection', title: 'Reflection' },
                    { accessor: 'rating', title: 'Rating', sortable: true },
                ]}
            />
        </ScrollArea.Autosize>
    );
}