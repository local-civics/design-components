import * as React                                                                      from 'react';
import {Table as MantineTable, ScrollArea, UnstyledButton} from '@mantine/core';
import {
    PlaceholderBanner
}                                                                                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    studentId: string
    studentName: string
    className: string
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
    onViewProfile: (item: Item) => void;
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
            title="No students to display"
            description="You don't have any students yet, add them and revisit."
            loading={props.loading}
            icon="groups"
        />
    }

    const rows = props.items.map((row) => (
        <tr key={row.studentName}>
            <td><UnstyledButton onClick={() => props.onViewProfile(row)}>{row.studentName}</UnstyledButton></td>
            <td>{row.className}</td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={500}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Class Name</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}