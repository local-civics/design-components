import {openConfirmModal} from "@mantine/modals";
import * as React from         'react';
import {
    Avatar,
    Table as MantineTable,
    Group,
    Text,
    ActionIcon,
    UnstyledButton,
    ScrollArea,
    Select,
    Box,
    Center,
    createStyles
}                              from '@mantine/core';
import {
    IconCheck, 
    IconTrash,
    IconSelector,
    IconChevronDown,
    IconChevronUp
}                              from '@tabler/icons';
import {Link}                  from "react-router-dom";
import {
    PlaceholderBanner
}                              from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {relativeTimeFromDates} from "../../utils/time";
import {useSortableData}       from "../../utils/useSortableData";

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
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];

    onDelete?: (member: Item) => void
    onRoleChange?: (user: Item, role: string | null) => void;
}

/**
 * Th Helper for Sortable Headers
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

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    // Initialize sorting hook
    const { items: sortedItems, requestSort, sortConfig } = useSortableData(props.items);
    
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No members to display"
            description="You have not rostered any students yet."
            loading={props.loading}
            icon="groups"
        />
    }

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

    const rows = props.items.map((row) => (
        <tr key={row.email}>
            <td>
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
            </td>
            <td>
                <Box maw={150}>
                    <Select
                        size="sm"
                        value={row.isAdmin ? "educator" : "student"}
                        onChange={(value) => props.onRoleChange && props.onRoleChange(row, value)}
                        data={[{value: "student", label: "Student"}, {value: "educator", label: "Educator"}]}
                    />
                </Box>
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
        <ScrollArea>
            <MantineTable verticalSpacing={20} sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                    <tr>
                        {/* 3. Link headers to sorting keys */}
                        <Th 
                            sorted={sortConfig.key === 'givenName'} 
                            reversed={sortConfig.direction === 'desc'} 
                            onSort={() => requestSort('givenName')}
                        >Name</Th>
                        
                        <Th 
                            sorted={sortConfig.key === 'isAdmin'} 
                            reversed={sortConfig.direction === 'desc'} 
                            onSort={() => requestSort('isAdmin')}
                        >Role</Th>
                        
                        <Th 
                            sorted={sortConfig.key === 'badgesEarned'} 
                            reversed={sortConfig.direction === 'desc'} 
                            onSort={() => requestSort('badgesEarned')}
                        >Badges Earned</Th>
                        
                        <Th 
                            sorted={sortConfig.key === 'lessonsCompleted'} 
                            reversed={sortConfig.direction === 'desc'} 
                            onSort={() => requestSort('lessonsCompleted')}
                        >Lessons Completed</Th>
                        
                        <Th 
                            sorted={sortConfig.key === 'hasAccount'} 
                            reversed={sortConfig.direction === 'desc'} 
                            onSort={() => requestSort('hasAccount')}
                        >Account Created?</Th>
                        
                        <Th 
                            sorted={sortConfig.key === 'lastActivity'} 
                            reversed={sortConfig.direction === 'desc'} 
                            onSort={() => requestSort('lastActivity')}
                        >Last Active</Th>
                        
                        <th></th> {/* Actions column (Trash can) */}
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea>
    );
}