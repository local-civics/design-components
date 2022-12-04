import * as React from 'react';
import { Avatar, Table, Group, Text, ScrollArea, UnstyledButton } from '@mantine/core';
import {
    PlaceholderBanner
} from "../../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * LessonUserItem
 */
export interface LessonUserItem {
    key: string
    avatar: string
    name: string
    email: string
}

/**
 * LessonUserTableProps
 */
export interface LessonUserTableProps {
    loading: boolean
    data: LessonUserItem[];

    onClick: (user: LessonUserItem) => void
}

/**
 * LessonUserTable
 * @constructor
 * @param props
 */
export function LessonUserTable(props: LessonUserTableProps) {
    if(props.data.length === 0){
        return <PlaceholderBanner
            loading={props.loading}
            data={{
                title: "No data for group",
                icon: "thinking",
                description: "You don't have any data for people in this group yet. Check back later or adjust your search."
            }}
        />
    }

    const rows = props.data.map((row) => (
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
            <Table horizontalSpacing={0} verticalSpacing={0} sx={{ minWidth: 700 }}>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea.Autosize>
    );
}