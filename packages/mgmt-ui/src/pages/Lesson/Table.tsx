import * as React                                                                                from 'react';
import {
    Avatar,
    Badge,
    Group,
    Text,
    ScrollArea,
    UnstyledButton,
} from '@mantine/core';
import {
    PlaceholderBanner
} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Stack as AnswerStack, Item as AnswerItem} from "./AnswerStack"
import {DataTable} from "mantine-datatable"

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    answers: AnswerItem[]
    isStarted?: boolean
    isComplete?: boolean
    href: string
}

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];
}

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No students to display"
            description="You don't have any student data yet for this lesson"
            loading={props.loading}
            icon="lessons"
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
                idAccessor="userId"
                records={props.items}
                columns={[{
                    accessor: 'name',
                    title: 'Student Name',
                    render: (row: Item) => (
                        <UnstyledButton>
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
                        </UnstyledButton>
                    ),
                },{
                    accessor: 'status',
                    render: (row: Item) => (
                        <>
                            {!!row.isComplete && <Badge variant="filled">Complete</Badge>}
                            {!row.isComplete && !row.isStarted && <Badge color="red" variant="filled">Not started</Badge>}
                            {!row.isComplete && !!row.isStarted && <Badge color="violet" variant="filled">In progress</Badge>}
                        </>
                    )
                }]}
                rowExpansion={{
                    content: ({ record }: {record: Item}) => (
                        <AnswerStack href={record.href} items={record.answers}/>
                    ),
                }}
            />
        </ScrollArea.Autosize>
    );
}