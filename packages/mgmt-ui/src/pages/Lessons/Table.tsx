import * as React                                         from 'react';
import { Table as MantineTable, Group, Text, ScrollArea, UnstyledButton } from '@mantine/core';
import {PlaceholderBanner}                                from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    lessonId: string,
    name: string;
    description: string
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
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No lessons to display"
            description="We don't have any lessons to show you just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    const rows = props.items.map((row) => (
        <tr key={row.lessonId}>
            <td>
                <UnstyledButton<'a'> component='a'
                    href={row.href}
                    sx={(theme) => ({
                        display: 'block',
                        width: '100%',
                        padding: theme.spacing.md,
                        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                        '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                        },
                    })}>
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
        <ScrollArea.Autosize maxHeight={600}>
            <MantineTable horizontalSpacing={0} verticalSpacing={0} sx={{ minWidth: 700 }}>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}