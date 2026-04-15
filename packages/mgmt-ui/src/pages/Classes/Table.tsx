import {openConfirmModal}                                       from "@mantine/modals";
import * as React                                               from 'react';
import { DataTable, DataTableSortStatus }                       from 'mantine-datatable';
import { Group, Text, ActionIcon, ScrollArea, UnstyledButton }  from '@mantine/core';
import { IconTrash }                                            from '@tabler/icons';
import {Link}                                                   from "react-router-dom";
import {PlaceholderBanner}                                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData}                                        from "../../utils/useSortableData";

export type Item = { 
    href: string, 
    classId: string, 
    name: string; 
    description: string, 
    numberOfStudents: number 
}

export interface TableProps {
    loading: boolean
    items: Item[];
    onDeleteClass: (item: Item) => void
}

export function Table(props: TableProps) {
    // 1. Initialize sorting on the underlying data
    const { items: sortedItems, requestSort, sortConfig } = useSortableData(props.items);

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

    const sortStatus: DataTableSortStatus = {
        columnAccessor: sortConfig.key as string,
        direction: sortConfig.direction === 'desc' ? 'desc' : 'asc',
    };

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <DataTable
                withBorder={false}
                borderRadius="sm"
                verticalSpacing="sm"
                sx={{ minWidth: 700 }}
                highlightOnHover
                striped
                records={sortedItems}
                idAccessor="classId"
                sortStatus={sortStatus}
                onSortStatusChange={(status) => requestSort(status.columnAccessor)}
                columns={[
                    {
                        accessor: 'name',
                        title: 'Class Name',
                        sortable: true,
                        render: (row) => (
                            <UnstyledButton<typeof Link> component={Link} to={row.href}>
                                <Text size={14} weight={500}>
                                    {row.name}
                                </Text>
                            </UnstyledButton>
                        ),
                    },
                    {
                        accessor: 'description',
                        title: 'Description',
                        // Static column (no sortable: true)
                        render: (row) =>
                            <Text size={14}>
                                {row.description}
                            </Text>
                    },
                    {
                        accessor: 'numberOfStudents',
                        title: '# of Students',
                        sortable: true,
                        render: (row) =>
                            <Text size={14}>
                                {row.numberOfStudents || 0}
                            </Text>
                    },
                    {
                        accessor: 'actions',
                        title: '',
                        render: (row) => (
                            <Group noWrap spacing={0} position="right">
                                <ActionIcon color="red" onClick={() => openDeleteModal(row)}>
                                    <IconTrash size={16} stroke={1.5} />
                                </ActionIcon>
                            </Group>
                        ),
                    },
                ]}
            />
        </ScrollArea.Autosize>
    );
}