import * as React                                         from 'react';
import { Table as MantineTable, Group, Text, ScrollArea, UnstyledButton } from '@mantine/core';
import {PlaceholderBanner}                                from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    lessonId: string,
    name: string;
    description: string
    percentageCompletion: number
}

/**
 * TableData
 */
export type TableData = {
    loading: boolean
    items: Item[];
}

/**
 * TableMethods
 */
export type TableMethods = {
    onClick: (badge: Item) => void
}

/**
 * TableProps
 */
export type TableProps = TableData & TableMethods

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No lessons to display"
            description="We don't have any lessons to show you just yet."
            loading={props.loading}
            icon="lessons"
        />
    }

    const rows = props.items.map((row) => (
        <tr key={row.lessonId}>
            <td>
                <UnstyledButton onClick={() => props.onClick && props.onClick(row)}>
                    {row.name}
                </UnstyledButton>
            </td>
            <td>{row.description}</td>
            <td>{Math.round((row.percentageCompletion + Number.EPSILON) * 100)}%</td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                    <tr>
                        <th>Lesson Name</th>
                        <th>Description</th>
                        <th>Completion</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}