import * as React                                                                 from 'react';
import { Avatar, Badge, Table as MantineTable, Group, Text, ScrollArea, UnstyledButton } from '@mantine/core';
import {
    PlaceholderBanner
}                                                                                 from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    isStarted?: boolean
    isComplete?: boolean
}

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];

    onClick: (user: Item) => void
}

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner loading={props.loading} icon="lessons"/>
    }

    const rows = props.items.map((row) => (
        <tr key={row.name}>
            <td>
                <UnstyledButton onClick={() => props.onClick && props.onClick(row)}>
                    <Group>
                        <Avatar size={40} src={row.avatar} radius={40} />
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
            </td>
            <td>
                {!!row.isComplete && <Badge variant="filled">Complete</Badge>}
                {!row.isComplete && !row.isStarted && <Badge color="red" variant="filled">Not started</Badge>}
                {!row.isComplete && !!row.isStarted && <Badge color="violet" variant="filled">In progress</Badge>}
            </td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={500}>
            <MantineTable horizontalSpacing={0} verticalSpacing="sm" sx={{ minWidth: 700 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}