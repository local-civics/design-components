import {DataTable}                                from "mantine-datatable";
import * as React                                 from 'react';
import {Avatar, Group, Text, ScrollArea, Badge}   from '@mantine/core';
import {Link}                                     from "react-router-dom";
import {
    PlaceholderBanner
}                                                 from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Stack as LessonStack, Item as LessonItem} from "./LessonStack";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    isComplete?: boolean
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
export type TableProps = TableData

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

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
                records={props.items}
                idAccessor="userId"
                columns={[{
                    accessor: 'name',
                    title: 'Student Name',
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
                    accessor: 'status',
                    render: (row: Item) => (
                        <>
                            {!!row.isComplete && <Badge variant="filled">Complete</Badge>}
                            {!row.isComplete && <Badge color="red" variant="filled">Incomplete</Badge>}
                        </>
                    )
                }]}
                rowExpansion={{
                    content: ({ record }: {record: Item}) => (
                        <LessonStack items={record.lessons}/>
                    ),
                }}
            />
        </ScrollArea.Autosize>
    );
}