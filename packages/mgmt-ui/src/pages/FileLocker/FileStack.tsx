import * as React          from 'react';
import {Grid, Badge, Text} from '@mantine/core';
import {Link}              from "react-router-dom";

export interface Item {
    link: string
    badgeName: string
    lessonName: string
    question: string
}

export type StackProps = {
    items: Item[]
}

/**
 * Stack
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    if (!props.items.length) return null;

    return (
        <Grid gutter="md" sx={{ padding: 20, minWidth: 700 }}>
        {/* Header row */}
        <Grid.Col span={6}><Text color="dark.4" weight="bold" size="md">By link</Text></Grid.Col>
        <Grid.Col span={6}><Text color="dark.4" weight="bold" size="md">By badge</Text></Grid.Col>
        <Grid.Col span={6}><Text color="dark.4" weight="bold" size="md">By Lesson</Text></Grid.Col>
        <Grid.Col span={6}><Text color="dark.4" weight="bold" size="md">By Question</Text></Grid.Col>
        {props.items.map((row, i) => (
            <React.Fragment key={i}>
                <Grid.Col span={6}>
                    <a href={row.link} target="_blank" rel="noopener noreferrer">
                        View File
                    </a>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text>{row.badgeName}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text>{row.lessonName}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text>{row.question}</Text>
                </Grid.Col>
            </React.Fragment>
        ))}
    </Grid>
    );
}