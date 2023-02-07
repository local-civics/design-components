import {DataTable}                                                                     from "mantine-datatable";
import * as React                                                                      from 'react';
import {ScrollArea, Badge, Text} from '@mantine/core';
import {
    PlaceholderBanner
}                                                 from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    badgeId: string
    badgeName: string
    isComplete?: boolean
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

/**
 * Table
 * @constructor
 * @param props
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No badges to display"
            description="There has not been any badge progress just yet."
            loading={props.loading}
            icon="badges"
        />
    }

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
                records={props.items}
                idAccessor="badgeId"
                columns={[{
                    accessor: 'name',
                    title: 'Badge Name',
                    render: (row: Item) => (
                        <>
                            <Text>{row.badgeName}</Text>
                        </>
                    ),
                },{
                    accessor: 'status',
                    render: (row: Item) => (
                        <>
                            {!!row.isComplete && <Badge variant="filled">Complete</Badge>}
                            {!row.isComplete && <Badge color="red" variant="filled">Incomplete</Badge>}
                        </>
                    )
                }]}
            />
        </ScrollArea.Autosize>
    );
}