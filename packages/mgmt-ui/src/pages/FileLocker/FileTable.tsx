import * as React                                from 'react';
import {ScrollArea, Text}                        from '@mantine/core';
import {Link}                                    from "react-router-dom";
import { DataTable, DataTableSortStatus }        from "mantine-datatable"
import {
    PlaceholderBanner
}                                                from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import { useSortableData }                       from "../../utils/useSortableData";
/**
 * Item
 */
export interface Item {
    lessonId: string
    lessonName: string
    percentageCompletion: number
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
export type TableProps = TableData

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const { items: sortedItems, requestSort, sortConfig } = useSortableData(props.items);

    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No Files to display"
            description="There are no files in this badge."
            loading={props.loading}
            icon="badges"
        />
    }
    const sortStatus: DataTableSortStatus = {
        columnAccessor: sortConfig.key as string,
        direction: sortConfig.direction === 'desc' ? 'desc' : 'asc',
    };

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <DataTable
                verticalSpacing="sm"
                sx={{ minWidth: 700 }}
                highlightOnHover
                striped
                records={sortedItems}
                sortStatus={sortStatus}
                onSortStatusChange={(status) => requestSort(status.columnAccessor)}
                columns={[
                    {
                        accessor: 'lessonName',
                        title: 'Lesson Name',
                        sortable: true,
                        render: (row) => (
                            <Text<typeof Link> component={Link} to={row.href}>
                                {row.lessonName}
                            </Text>
                        )
                    },
                    {
                        accessor: 'percentageCompletion',
                        title: 'Lesson Completion',
                        sortable: true,
                        render: (row) => `${Math.round((row.percentageCompletion + Number.EPSILON) * 100)}%`
                    }
                ]}
            />
        </ScrollArea.Autosize>
    );
}