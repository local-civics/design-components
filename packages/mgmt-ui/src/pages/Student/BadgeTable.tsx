import * as React                                                                      from 'react';
import {Avatar, Table as MantineTable, Group, Text, ScrollArea, UnstyledButton, Badge} from '@mantine/core';
import {
    PlaceholderBanner
}                                                                                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
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
 * TableMethods
 */
export type TableMethods = {
    onClick: (item: Item) => void
}


/**
 * TableProps
 */
export type TableProps = TableData & TableMethods

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

    const rows = props.items.map((row) => (
        <tr key={row.badgeName}>
            <td>{row.badgeName}</td>
            <td>
                {!!row.isComplete && <Badge variant="filled">Complete</Badge>}
                {!row.isComplete && <Badge color="red" variant="filled">Incomplete</Badge>}
            </td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={500}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <th>Badge Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}