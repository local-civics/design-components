import { DataTable, DataTableSortStatus }         from "mantine-datatable";
import * as React                                 from 'react';
import {Avatar, Group, Text, ScrollArea, Badge}   from '@mantine/core';
import {Link}                                     from "react-router-dom";
import {PlaceholderBanner}                        from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Stack as FileStack} from "./FileStack";
import { useSortableData }                        from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    submissions: SubmissionItem[]
}

export interface SubmissionItem {
    link: string
    badgeName: string
    lessonName: string
    question: string
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
    // Map status boolean to a number so it can be sorted
    const preparedItems = React.useMemo(() => {
        return props.items.map(item => ({
            ...item,
            submissionCount: item.submissions?.length || 0,
        }));
    }, [props.items]);

    const { items: sortedItems, requestSort, sortConfig } = useSortableData(preparedItems); //add sort logic
     
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No files to display"
            description="There are no submitted files to display yet."
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
                withBorder={false}
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                records={sortedItems}
                sortStatus={sortStatus}
                onSortStatusChange={(status) => requestSort(status.columnAccessor)}
                idAccessor="userId"
                columns={[{
                    accessor: 'name',
                    title: 'Student Name',
                    sortable: true,
                    render: (row: Item) => (
                        <Group spacing="sm">
                            <Avatar size={40} src={row.avatar} radius={40}/>
                            <div>
                                <Text size="sm" weight={500}>
                                    {row.name}
                                </Text>
                                <Text size="xs" color="dimmed">
                                    {row.email}
                                </Text>
                            </div>
                        </Group>
                    ),
                },{
                    accessor: 'submissionCount',
                    title: 'Files',
                    sortable: true,
                    render: (row: Item) => row.submissions.length
                }]}
                rowExpansion={{
                    content: ({ record }: {record: Item}) => (
                <FileStack items={record.submissions}/>                    ),
                }}
            />
        </ScrollArea.Autosize>
    );
}