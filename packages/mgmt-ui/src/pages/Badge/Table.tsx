import * as React from 'react';
import { Avatar, Table as MantineTable, Group, Text, ScrollArea, UnstyledButton } from '@mantine/core';
import {
    PlaceholderBanner
} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface BadgeUserItem {
    badgeId: string
    userId: string
    avatar: string
    name: string
    email: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: BadgeUserItem[]
}

/**
 * TableMethods
 */
export type TableMethods = {
    onClick: (item: BadgeUserItem) => void
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
            data={{
                title: "No data for group",
                icon: "thinking",
                description: "You don't have any data for people in this group yet. Check back later or adjust your search."
            }}
        />
    }

    const rows = props.items.map((row) => (
        <tr key={row.name}>
            <td>
                <UnstyledButton
                    sx={(theme) => ({
                        display: 'block',
                        width: '100%',
                        padding: theme.spacing.md,
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                        '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                        },
                    })}
                    onClick={() => props.onClick && props.onClick(row)}
                >
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
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={500}>
            <MantineTable horizontalSpacing={0} verticalSpacing={0} sx={{ minWidth: 700 }}>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}