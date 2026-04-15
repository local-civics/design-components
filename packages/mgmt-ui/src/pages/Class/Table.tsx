import {openConfirmModal}                                           from "@mantine/modals";
import * as React                                                   from 'react';
import { DataTable, DataTableSortStatus }                           from 'mantine-datatable'
import {
    Avatar,
    Group,
    Text,
    ActionIcon,
    ScrollArea,
    Select,
    Box,
    UnstyledButton,
}                                                                   from '@mantine/core';
import { IconCheck, IconTrash, IconX }                              from '@tabler/icons';
import {Link}                                                       from "react-router-dom";
import { PlaceholderBanner }                                        from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {relativeTimeFromDates}                                      from "../../utils/time";
import {useSortableData}                                            from "../../utils/useSortableData";

/**
 * Item
 */
export type Item = {
    classId: string,
    userId: string,
    avatar: string,
    email: string,
    givenName: string,
    familyName: string,
    lastActivity: Date | null
    readonly: boolean
    hasAccount: boolean
    badgesEarned: number
    lessonsCompleted: number
    isAdmin: boolean
    href: string
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}

/**
 * TableProps
 */
export type TableProps = TableData & {
    onDelete: (member: Item) => void
    onRoleChange: (user: Item, role: string | null) => void;
}

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    const preparedItems = React.useMemo(() => {
        return props.items.map(item => ({
            ...item,
            fullName: item.givenName && item.familyName 
                ? `${item.givenName} ${item.familyName}`.toLowerCase() 
                : item.email.toLowerCase(),
        }));
    }, [props.items]);
    // Initialize sorting hook
    const { items: sortedItems, requestSort, sortConfig } = useSortableData(preparedItems);
    
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No members to display"
            description="You have not rostered any students yet."
            loading={props.loading}
            icon="groups"
        />
    }
    
    const sortStatus: DataTableSortStatus = {
        columnAccessor: sortConfig.key as string,
        direction: sortConfig.direction === 'desc' ? 'desc' : 'asc',
    };

    const openDeleteModal = (student: Item) => openConfirmModal({
        title: `Remove "${student.givenName && student.familyName ? `${student.givenName} ${student.familyName}` : student.email}" from this class?`,
        centered: true,
        children: (
            <Text size="sm">
                Click confirm if you want to remove the student from this specific class. This will NOT remove the student from the Tech Platform.
            </Text>
        ),
        labels: { confirm: 'Remove Student', cancel: "Cancel" },
        confirmProps: { color: 'red' },
        onConfirm: () => props.onDelete && props.onDelete(student),
    });
    
    return (
        <ScrollArea>
            <DataTable
                verticalSpacing={20}
                sx={{ minWidth: 700 }}
                highlightOnHover
                striped
                records={sortedItems}
                idAccessor="email"
                sortStatus={sortStatus}
                onSortStatusChange={(status) => requestSort(status.columnAccessor)}
                columns={[
                    {
                        accessor: 'fullName',
                        title: 'Name',
                        sortable: true,
                        render: (row: Item) => (
                            <UnstyledButton<typeof Link> component={Link} to={row.href}>
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
                        ),
                    },
                    {
                        accessor: 'isAdmin',
                        title: 'Role',
                        sortable: true,
                        render: (row: Item) => (
                            <Box maw={150}>
                                <Select
                                    size="sm"
                                    disabled={row.readonly}
                                    value={row.isAdmin ? "educator" : "student"}
                                    onChange={(value) => props.onRoleChange && props.onRoleChange(row, value)}
                                    data={[
                                        { label: 'Student', value: 'student' },
                                        { label: 'Educator', value: 'educator' },
                                    ]}
                                />
                            </Box>
                        )
                    },
                    {
                        accessor: 'badgesEarned',
                        title: 'Badges Earned',
                        sortable: true,
                    },
                    {
                        accessor: 'lessonsCompleted',
                        title: 'Lessons Completed',
                        sortable: true,
                    },
                    {
                        accessor: 'hasAccount',
                        title: 'Account Created?',
                        sortable: true,
                        render: (row: Item) => row.hasAccount ? <IconCheck color="green" /> : null
                    },
                    {
                        accessor: 'lastActivity',
                        title: 'Last Active',
                        sortable: true,
                        render: (row: Item) => row.lastActivity ? relativeTimeFromDates(row.lastActivity) : ""
                    },
                    {
                        accessor: 'actions',
                        title: '',
                        textAlignment: 'right',
                        render: (row: Item) => (
                            <Group noWrap spacing={0} position="right">
                                { !row.readonly && !!props.onDelete && (
                                    <ActionIcon color="red" onClick={() => openDeleteModal(row)}>
                                        <IconTrash size={16} stroke={1.5} />
                                    </ActionIcon>
                                )}
                            </Group>
                        )
                    }
                ]}
            />
        </ScrollArea>
    );
}