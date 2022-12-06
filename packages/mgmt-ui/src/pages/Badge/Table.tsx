import * as React                                                                      from 'react';
import {Avatar, Table as MantineTable, Group, Text, ScrollArea, UnstyledButton, Badge} from '@mantine/core';
import {
    PlaceholderBanner
}                                                                                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    isComplete?: boolean
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
export type TableMethods = {
    onClick: (item: Item) => void
}


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
    if(props.items.length === 0){
        return <PlaceholderBanner
            loading={props.loading}
            title="No data for group"
            icon="thinking"
            description="You don't have any data for people in this group yet. Check back later or adjust your search."
        />
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
                {!!row.isComplete && <Badge>Complete</Badge>}
                {!row.isComplete && <Badge color="gray">Incomplete</Badge>}
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