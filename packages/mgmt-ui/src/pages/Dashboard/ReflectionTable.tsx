import * as React                          from 'react';
import {Table as MantineTable, ScrollArea} from '@mantine/core';
import {
    PlaceholderBanner
}                                          from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {relativeTimeFromDates}             from "../../utils/time";

/**
 * Item
 */
export interface Item {
    lessonName: string
    studentName: string
    reflection: string
    updatedAt: string
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
            title="No reflections to display"
            description="There has not been any lesson progress just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    const rows = props.items.map((row) => (
        <tr key={row.studentName+row.lessonName}>
            <td>{row.studentName}</td>
            <td>{row.lessonName}</td>
            <td>{row.reflection}</td>
            <td>{relativeTimeFromDates(new Date(row.updatedAt))}</td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Lesson Name</th>
                    <th>Reflection</th>
                    <th>Updated At</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}