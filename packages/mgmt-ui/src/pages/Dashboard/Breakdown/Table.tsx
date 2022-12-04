import * as React                                    from 'react';
import { useState } from 'react';
import { createStyles, Table as MantineTable, ScrollArea, Badge } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        transition: 'box-shadow 150ms ease',

        '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
            }`,
        },
    },

    scrolled: {
        boxShadow: theme.shadows.sm,
    },
}));

/**
 * Item
 */
export interface Item {
    name: string;
    email: string;
    value: number
}

/**
 * TableProps
 */
export interface TableProps {
    data: Item[];
}

/**
 * Table
 * @param data
 * @constructor
 */
export const Table = ({ data }: TableProps) => {
    const { classes, cx } = useStyles();
    const [scrolled, setScrolled] = useState(false);

    const values = data.map(row => row.value)
    const average = Math.round(values.reduce((a, b) => a + b) / values.length)

    const rows = data.map((row) => (
        <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.value}</td>
            <td>
                {row.value > average ? (
                    <Badge>Above average</Badge>
                ) : row.value === average ? (
                    <Badge color="gray">
                        Average
                    </Badge>
                ) : <Badge color="red">
                    Below average
                </Badge>}
            </td>
        </tr>
    ));

    return (
        <ScrollArea sx={{ height: 500 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <MantineTable verticalSpacing="md" sx={{ minWidth: 700 }}>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Value</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea>
    );
}