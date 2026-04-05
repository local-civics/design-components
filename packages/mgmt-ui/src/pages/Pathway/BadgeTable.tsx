import * as React                                                                           from 'react';
import {Table as MantineTable, ScrollArea, TextUnstyledButton, Group, Center, createStyles} from '@mantine/core';
import {Link}                                                                               from "react-router-dom";
import {
    PlaceholderBanner
}                                                                                           from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {IconSelector, IconChevronDown, IconChevronUp}                                       from '@tabler/icons';
import { useSortableData }                                                                  from "../../utils/useSortableData";

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
export interface Item {
    badgeId: string
    badgeName: string
    percentageCompletion: number
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
export type TableProps = TableData

function Th({ children, reversed, sorted, onSort }: { children: React.ReactNode, reversed: boolean, sorted: boolean, onSort(): void }) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart" noWrap spacing="xs"> 
                    <Text weight={500} size="sm" sx={{ whiteSpace: 'nowrap' }}>
                        {children}
                    </Text>
                    <Center><Icon size={14} stroke={1.5} /></Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const { items: sortedItems, requestSort, sortConfig } = useSortableData(props.items);

    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No badges to display"
            description="There are no badges in this pathway."
            loading={props.loading}
            icon="badges"
        />
    }

    const rows = props.sortedItems.map((row) => {
        const percentageCompletion = Math.round((row.percentageCompletion + Number.EPSILON) * 100)
        return <tr key={row.badgeName}>
            <td>
                <Text<typeof Link> component={Link} to={row.href}>
                    {row.badgeName}
                </Text>
            </td>
            <td>{percentageCompletion}%</td>
        </tr>
    });

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <Th 
                        sorted={sortConfig.key === 'badgeName'} 
                        reversed={sortConfig.direction === 'desc'} 
                        onSort={() => requestSort('badgeName')}
                    >Badge Name</Th>
                    <Th 
                        sorted={sortConfig.key === 'percentageCompletion'} 
                        reversed={sortConfig.direction === 'desc'} 
                        onSort={() => requestSort('percentageCompletion')}
                    >Badge Completion</Th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}