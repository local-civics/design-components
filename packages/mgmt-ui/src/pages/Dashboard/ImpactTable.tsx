import * as React                                                                      from 'react';
import {Table as MantineTable, ScrollArea} from '@mantine/core';
import {
    PlaceholderBanner
}                                                                                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    studentName: string
    impactStatement: string
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
export type TableMethods = {}


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
            title="No impact statements to display"
            description="There are no students with impact statements yet."
            loading={props.loading}
            icon="kindergarten"
        />
    }

    const rows = props.items.map((row) => (
        <tr key={row.studentName}>
            <td>{row.studentName}</td>
            <td>{row.impactStatement}</td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={500}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Impact Statement</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}