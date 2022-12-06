import * as React                                         from 'react';
import { Table as MantineTable, Group, Text, ScrollArea, UnstyledButton } from '@mantine/core';
import {PlaceholderBanner}                                from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    badgeId: string,
    name: string;
    description: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[];
}

/**
 * TableMethods
 */
export type TableMethods = {
    onClick: (badge: Item) => void
}

/**
 * TableProps
 */
export type TableProps = TableData & TableMethods

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner loading={props.loading} icon="badges"/>
    }

    const rows = props.items.map((row) => (
        <tr key={row.badgeId}>
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
                        <div>
                            <Text size="sm" weight={500}>
                                {row.name}
                            </Text>
                            <Text size="xs" color="dimmed">
                                {row.description}
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