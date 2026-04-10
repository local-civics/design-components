import * as React                                                                           from 'react';
import { ScrollArea, Text }                                                                 from '@mantine/core';
import { DataTable, DataTableSortStatus }                                                   from 'mantine-datatable';
import { Link }                                                                               from "react-router-dom";
import { PlaceholderBanner }                                                                                           from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import { useSortableData }                                                                  from "../../utils/useSortableData";

/**
 * Item 
 */
export interface Item {
    badgeId: string
    badgeName: string
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
            title="No badges to display"
            description="There are no badges in this pathway."
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
                idAccessor="badgeId"
                sortStatus={sortStatus}
                onSortStatusChange={(status) => requestSort(status.columnAccessor)}
                columns={[
                    {
                        accessor: 'badgeName',
                        title: 'Badge Name',
                        sortable: true,
                        render: (row) => (
                            <Text<typeof Link> component={Link} to={row.href} color="blue">
                                {row.badgeName}
                            </Text>
                        ),
                    },
                    {
                        accessor: 'percentageCompletion',
                        title: 'Badge Completion',
                        sortable: true,
                        render: (row) => {
                            const roundedValue = Math.round((row.percentageCompletion + Number.EPSILON) * 100);
                            return `${roundedValue}%`;
                        },
                    },
                ]}
            />
        </ScrollArea.Autosize>
    );
}