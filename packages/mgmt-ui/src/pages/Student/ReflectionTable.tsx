import * as React                                from 'react';
import {Table as MantineTable, ScrollArea, Text} from '@mantine/core';
import {Link}                                    from "react-router-dom";
import {
    PlaceholderBanner
}                                                from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    lessonId: string
    lessonName: string
    reflection: string
    rating: number
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
        <tr key={row.lessonName}>
            <td><Text<typeof Link> component={Link} to={row.href}>{row.lessonName}</Text></td>
            <td>{row.reflection}</td>
            <td>{row.rating.toLocaleString()}</td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                    <tr>
                        <th>Lesson Name</th>
                        <th>Reflection</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}