import {openConfirmModal}                                                           from "@mantine/modals";
import * as React                                                                   from 'react';
import {Table as MantineTable, Group, Text, ActionIcon, ScrollArea, UnstyledButton} from '@mantine/core';
import {
    IconTrash
}                                                                                   from '@tabler/icons';
import {Link}                                                                       from "react-router-dom";
import {PlaceholderBanner}                                                          from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export type Item = { href: string, classId: string, name: string; description: string, numberOfStudents: number }

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];

    onDeleteClass: (item: Item) => void
}

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No classes to display"
            description="You don't have any classes yet. Try creating one first..."
            loading={props.loading}
            icon="groups"
        />
    }

    const openDeleteModal = (group: Item) => openConfirmModal({
        title: `Delete "${group.name}"?`,
        centered: true,
        children: (
            <Text size="sm">
                Are you sure you want to delete this class? This action is destructive and you will have
                to contact support to restore your data.
            </Text>
        ),
        labels: { confirm: 'Delete class', cancel: "No don't delete it" },
        confirmProps: { color: 'red' },
        onConfirm: () => props.onDeleteClass(group),
    });

    const rows = props.items.map((row) => (
        <tr key={row.classId}>
            <td>
                <UnstyledButton<typeof Link> component={Link} to={row.href}>
                    <Text size={14}>{row.name}</Text>
                </UnstyledButton>
             </td>
            <td><Text size={14}>{row.description}</Text></td>
            <td><Text size={14}>{row.numberOfStudents||0}</Text></td>
            <td>
                <Group noWrap spacing={0} position="right">
                    <ActionIcon color="red">
                        <IconTrash onClick={() => openDeleteModal(row)} size={16} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <MantineTable verticalSpacing={20} sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <th>Class Name</th>
                    <th>Description</th>
                    <th># of Students</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}