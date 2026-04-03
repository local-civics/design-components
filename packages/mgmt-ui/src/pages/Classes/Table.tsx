import {openConfirmModal} from "@mantine/modals";
import * as React from 'react';
import {
    Table as MantineTable, 
    Group, 
    Text, 
    ActionIcon, 
    ScrollArea, 
    UnstyledButton, 
    createStyles, 
    Center
} from '@mantine/core';
import {
    IconTrash,
    IconSelector,
    IconChevronDown,
    IconChevronUp
} from '@tabler/icons';
import {Link} from "react-router-dom";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {useSortableData} from "../../utils/hooks"; // Import the hook

const useStyles = createStyles((theme) => ({
    th: { padding: '0 !important' },
    control: {
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));

export type Item = { href: string, classId: string, name: string; description: string, numberOfStudents: number }

export interface TableProps {
    loading: boolean
    items: Item[];
    onDeleteClass: (item: Item) => void
}

/**
 * Internal Header Component to handle the Sort UI
 */
function Th({ children, reversed, sorted, onSort }: { children: React.ReactNode, reversed: boolean, sorted: boolean, onSort(): void }) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text weight={500} size="sm">{children}</Text>
                    <Center><Icon size={14} stroke={1.5} /></Center>
                </Group>
            </UnstyledButton>
        </th>
    );
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

    // 2. Map over sortedItems instead of props.items
    const rows = sortedItems.map((row) => (
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
                    {/* 3. Link headers to the sorting hook */}
                    <Th 
                        sorted={sortConfig.key === 'name'} 
                        reversed={sortConfig.direction === 'desc'} 
                        onSort={() => requestSort('name')}
                    >Class Name</Th>
                    <Th 
                        sorted={sortConfig.key === 'description'} 
                        reversed={sortConfig.direction === 'desc'} 
                        onSort={() => requestSort('description')}
                    >Description</Th>
                    <Th 
                        sorted={sortConfig.key === 'numberOfStudents'} 
                        reversed={sortConfig.direction === 'desc'} 
                        onSort={() => requestSort('numberOfStudents')}
                    ># of Students</Th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}