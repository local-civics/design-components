import * as React                                                                      from 'react';
import {Table as MantineTable, ScrollArea, UnstyledButton} from '@mantine/core';
import {
    PlaceholderBanner
}                                                                                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    lessonId: string
    lessonName: string
    percentageCompletion: number
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
            title="No lessons to display"
            description="There are not lessons in badge."
            loading={props.loading}
            icon="badges"
        />
    }

    const rows = props.items.map((row) => {
        const percentageCompletion = Math.round((row.percentageCompletion + Number.EPSILON) * 100)
        return <tr key={row.lessonName}>
            <td>
                <UnstyledButton onClick={() => props.onClick && props.onClick(row)}>
                    {row.lessonName}
                </UnstyledButton>
            </td>
            <td>{percentageCompletion}%</td>
        </tr>
    });

    return (
        <ScrollArea.Autosize maxHeight={500}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <th>Lesson Name</th>
                    <th>Lesson Completion</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}