import {openConfirmModal} from "@mantine/modals";
import * as React from 'react';
import { Avatar, Table as MantineTable, Group, Text, ActionIcon, UnstyledButton, ScrollArea } from '@mantine/core';
import {IconCheck, IconTrash}                                                                 from '@tabler/icons';
import {
    PlaceholderBanner
}                                                                                             from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {relativeTimeFromDates} from "../../utils/time";

/**
 * Item
 */
export type Item = {
    classId: string,
    studentId: string,
    avatar: string,
    email: string,
    givenName: string,
    familyName: string,
    lastActivity: Date | null
    readonly: boolean
    hasAccount: boolean
    badgesEarned: number
    lessonsCompleted: number
}

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];

    onViewProfile: (student: Item) => void
    onDelete?: (student: Item) => void
}

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No students to display"
            description="You have not rostered any students yet."
            loading={props.loading}
            icon="groups"
        />
    }

    const openDeleteModal = (student: Item) => openConfirmModal({
        title: `Delete "${student.givenName && student.familyName ? `${student.givenName} ${student.familyName}` : student.email}"?`,
        centered: true,
        children: (
            <Text size="sm">
                Are you sure you want to delete this person? This action is destructive and you will have
                to contact support to restore your data.
            </Text>
        ),
        labels: { confirm: 'Delete', cancel: "No don't delete them" },
        confirmProps: { color: 'red' },
        onConfirm: () => props.onDelete && props.onDelete(student),
    });

    const rows = props.items.map((row) => (
        <tr key={row.email}>
            <td>
                <UnstyledButton onClick={() => props.onViewProfile && props.onViewProfile(row)}>
                    <Group spacing="sm">
                        <Avatar size={40} src={row.avatar} radius={40} />
                        <div>
                            <Text size="sm" weight={500}>
                                {row.givenName && row.familyName ? `${row.givenName} ${row.familyName}` : row.email}
                            </Text>
                            <Text size="xs" color="dimmed">
                                {row.email}
                            </Text>
                        </div>
                    </Group>
                </UnstyledButton>
            </td>
            <td>{row.badgesEarned}</td>
            <td>{row.lessonsCompleted}</td>
            <td>{row.hasAccount && <IconCheck color="green" />}</td>
            <td>{row.lastActivity ? relativeTimeFromDates(row.lastActivity) : ""}</td>
            <td>
                <Group noWrap spacing={0} position="right">
                    { !row.readonly && !!props.onDelete && <ActionIcon color="red">
                        <IconTrash onClick={() => openDeleteModal(row)} size={16} stroke={1.5} />
                    </ActionIcon> }
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea style={{width: '100%'}}>
            <MantineTable verticalSpacing={20} sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Badges Earned</th>
                        <th>Lessons Completed</th>
                        <th>Account Created?</th>
                        <th>Last Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea>
    );
}