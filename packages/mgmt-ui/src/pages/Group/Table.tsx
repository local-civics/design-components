import {openConfirmModal} from "@mantine/modals";
import * as React from 'react';
import { Avatar, Table as MantineTable, Group, Text, ActionIcon, UnstyledButton, ScrollArea, Select } from '@mantine/core';
import {IconTrash} from '@tabler/icons';
import {
    PlaceholderBanner
} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {relativeTimeFromDates} from "../../utils/time";

const rolesData = [{value: 'Member', label: 'Member'}, {value: 'Admin', label: 'Admin'}];

/**
 * Item
 */
export type Item = {
    groupId: string,
    userId: string,
    avatar: string,
    email: string,
    givenName: string,
    familyName: string,
    role: string,
    lastActivity: Date | null
    readonly: boolean
}

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];

    onChangeRole: (user: Item, role: string | null) => void;
    onDelete: (user: Item) => void
    onViewProfile: (user: Item) => void
}

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            loading={props.loading}
            data={{
                title: "No one in group",
                icon: "thinking",
                description: "You don't have any people in this group yet. When your ready, get started by clicking the 'Add people' button above."
            }}
        />
    }

    const openDeleteModal = (user: Item) => openConfirmModal({
        title: `Delete "${user.givenName && user.familyName ? `${user.givenName} ${user.familyName}` : user.email}"?`,
        centered: true,
        children: (
            <Text size="sm">
                Are you sure you want to delete this person? This action is destructive and you will have
                to contact support to restore your data.
            </Text>
        ),
        labels: { confirm: 'Delete', cancel: "No don't delete them" },
        confirmProps: { color: 'red' },
        onConfirm: () => props.onDelete && props.onDelete(user),
    });

    const rows = props.items.map((row) => (
        <tr key={row.email}>
            <td>
                <UnstyledButton
                    onClick={() => props.onViewProfile && props.onViewProfile(row)}>
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
            <td>
                <Select
                    data={[...rolesData].map(role => row.readonly ? {...role, disabled: role.value !== row.role} : role)}
                    defaultValue={row.role}
                    variant="unstyled"
                    onChange={v => !row.readonly && props.onChangeRole && props.onChangeRole(row, v)}
                />
            </td>
            <td>{row.lastActivity ? relativeTimeFromDates(row.lastActivity) : ""}</td>
            <td>
                <Group noWrap spacing={0} position="right">
                    { !row.readonly && <ActionIcon color="red">
                        <IconTrash onClick={() => openDeleteModal(row)} size={16} stroke={1.5} />
                    </ActionIcon> }
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea>
            <MantineTable verticalSpacing={20} sx={{ minWidth: 700 }}>
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Role</th>
                        <th>Last active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea>
    );
}