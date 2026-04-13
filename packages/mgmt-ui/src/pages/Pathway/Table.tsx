import {DataTable, DataTableSortStatus}           from "mantine-datatable";
import * as React                                 from 'react';
import {Avatar, Group, Text, ScrollArea, Badge}   from '@mantine/core';
import {Link}                                     from "react-router-dom";
import {
    PlaceholderBanner
}                                                 from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
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
    // flatten category points for sorting hook
const preparedItems = React.useMemo(() => {
    // 1. Log the RAW data coming from the hook
    console.group("Pathway Table Data Check");
    console.log("Raw items from props:", props.items);
    console.log("Categories available:", props.categories);

    const mapped = props.items.map(item => {
        const flatItem = {
            ...item,
            status: item.isComplete ? 1 : 0, 
        };

        if (item.categoryPoints) {
            Object.keys(item.categoryPoints).forEach(catId => {
                flatItem[catId] = item.categoryPoints![catId];
            });
        }
        return flatItem;
    });

    // 2. Log the TRANSFORMED data that the table actually uses
    console.log("Transformed items (Flat):", mapped);
    
    // 3. Specifically check the first student to see if IDs match
    if (mapped.length > 0 && props.categories.length > 0) {
        const firstStudent = mapped[0];
        const firstCatId = props.categories[0].categoryId;
        console.log(`Matching Check: Does student have key [${firstCatId}]?`, 
            firstStudent.hasOwnProperty(firstCatId) ? "YES ✅" : "NO ❌",
            "Value:", firstStudent[firstCatId]
        );
    }
    console.groupEnd();

    return mapped;
}, [props.items, props.categories]);

    const { items: sortedItems, requestSort, sortConfig } = useSortableData(preparedItems);
    
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

    const sortStatus: DataTableSortStatus = {
        columnAccessor: sortConfig.key as string,
        direction: sortConfig.direction === 'desc' ? 'desc' : 'asc',
    };

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
                    accessor: 'status',
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
                    accessor: category.categoryId,
                    title: category.name,
                    sortable: true,
                    titleStyle: { whiteSpace: 'nowrap' as const }, 
                    render: (row: any) => (
                        <Badge color="blue" variant="filled">
                        {row[category.categoryId] ?? 0} pts
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