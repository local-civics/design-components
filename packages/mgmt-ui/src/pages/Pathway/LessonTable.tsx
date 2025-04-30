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
    percentageCompletion: number
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
            title="No badges to display"
            description="There are no badges in this pathway."
            loading={props.loading}
            icon="badges"
        />
    }

    const rows = props.items.map((row) => {
        const percentageCompletion = Math.round((row.percentageCompletion + Number.EPSILON) * 100)
        return <tr key={row.lessonName}>
            <td>
                <Text<typeof Link> component={Link} to={row.href}>
                    {row.lessonName}
                </Text>
            </td>
            <td>{percentageCompletion}%</td>
        </tr>
    });

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <MantineTable verticalSpacing="sm" sx={{ minWidth: 700 }} highlightOnHover striped>
                <thead>
                <tr>
                    <th>Badge Name</th>
                    <th>Badge Completion</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}