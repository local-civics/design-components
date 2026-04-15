import {DataTable, DataTableSortStatus}           from "mantine-datatable";
import * as React                                 from 'react';
import {Avatar, Group, Text, ScrollArea, Badge}   from '@mantine/core';
import { IconSelector, IconChevronUp }            from '@tabler/icons';
import {Link}                                     from "react-router-dom";
import { PlaceholderBanner }                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Stack as BadgeStack, Item as BadgeItem}   from "./BadgeStack";
import { useSortableData }                        from "../../utils/useSortableData";

/**
 * Item
 */
export interface Item {
    userId: string
    avatar: string
    name: string
    email: string
    isComplete?: boolean
    badges: BadgeItem[]
    categoryPoints?: Record<string, number>
    [key: string]: any;
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[]
}
/**
 * Category
 */
export type Category = {
    categoryId: string
    name: string
}

/**
 * TableProps
 */
export type TableProps = TableData & {
    categories: Category[]
}

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    const preparedItems = React.useMemo(() => {
        return (props.items || []).map(item => ({
            ...item,
            ...item.categoryPoints, // Spreads all category IDs and their point values
        }));
    }, [props.items]);

    const { items: sortedItems, requestSort, sortConfig } = useSortableData(props.items);
    
    if(props.loading && props.items.length === 0){
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

    const sortStatus: DataTableSortStatus | undefined = 
        sortConfig.direction !== null 
            ? {
                columnAccessor: sortConfig.key as string,
                direction: sortConfig.direction, // Now strictly 'asc' | 'desc'
            } 
            : undefined;

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <DataTable
                verticalSpacing="sm"
                sx={{ minWidth: 700 }}
                withBorder={false}
                borderRadius="sm"
                withColumnBorders
                striped
                highlightOnHover
                records={sortedItems}
                idAccessor="userId"
                sortStatus={sortStatus}
                onSortStatusChange={(status) => requestSort(status.columnAccessor)} // Added to trigger sort
                sortIcons={{
                    sorted: <IconChevronUp size={14} />,   // Mantine flips this automatically for desc
                    unsorted: <IconSelector size={14} />,  // The double-arrow "neutral" state
                }}
                columns={[{
                    accessor: 'name',
                    title: 'Student Name',
                    sortable: true,
                    titleStyle: { whiteSpace: 'nowrap' as const }, // Prevents UI stacking
                    render: (row: Item) => (
                        <Group spacing="sm" noWrap>
                            <Avatar size={40} src={row.avatar} radius={40}/>
                            <div>
                                <Text size="sm" weight={500}>
                                    {row.name}
                                </Text>
                                <Text size="xs" color="dimmed">
                                    {row.email}
                                </Text>
                            </div>
                        </Group>
                    ),
                },{
                    accessor: 'isComplete',
                    title: 'Status',
                    sortable: true, 
                    titleStyle: { whiteSpace: 'nowrap' as const },
                    render: (row: Item) => ( 
                        <Badge color={row.isComplete ? "blue" : "red"} variant="filled">
                                {row.isComplete ? "Complete" : "Incomplete"}
                        </Badge>
                    )
                },
                ...props.categories.map((category) => ({
                    // Use dot notation: 'categoryPoints.ID'
                    accessor: `categoryPoints.${category.categoryId}`,
                    title: category.name,
                    sortable: true,
                    titleStyle: { whiteSpace: 'nowrap' as const }, 
                    render: (row: any) => (
                        <Badge color="blue" variant="filled">
                        {row.categoryPoints?.[category.categoryId] ?? 0} pts
                        </Badge>
                    )
                }))
            ]}
                rowExpansion={{
                    content: ({ record }: {record: Item}) => (
                        <BadgeStack items={record.badges}/>
                    ),
                }}
            />
        </ScrollArea.Autosize>
    );
}