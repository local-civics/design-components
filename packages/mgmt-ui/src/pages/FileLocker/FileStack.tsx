import * as React          from 'react';
import {Grid, Badge, Text} from '@mantine/core';
import {Link}              from "react-router-dom";
import { Button } from "@mantine/core"

export interface Item {
    link: string
    badgeName: string
    lessonName: string
    question: string
}

export type StackProps = {
    items: Item[]
    hideBadge?: boolean
    hideLesson?: boolean
}

/**
 * Stack
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    const { items, hideBadge, hideLesson } = props
    if (!items.length) return null;

    const visibleColumns = [
        true,               // Link (always)
        !hideBadge,
        !hideLesson,
        true                // Question (always)
    ].filter(Boolean).length

    const span = 12 / visibleColumns

    return (
        <Grid gutter="md" sx={{ padding: 20, minWidth: 700 }}>
            {/* Header row */}
            <Grid.Col span={span}><Text weight="bold">Link</Text></Grid.Col>

            {!hideBadge && (
                <Grid.Col span={span}>
                    <Text weight="bold">Badge</Text>
                </Grid.Col>
            )}

            {!hideLesson && (
                <Grid.Col span={span}>
                    <Text weight="bold">Lesson</Text>
                </Grid.Col>
            )}

            <Grid.Col span={span}><Text weight="bold">Question</Text></Grid.Col>

            {/* Rows */}
            {items.map((row, i) => (
                <React.Fragment key={i}>
                    <Grid.Col span={span}>
                        <Button
                            component="a"
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="xs"
                            variant="light"
                        >
                            View File
                        </Button>
                    </Grid.Col>

                    {!hideBadge && (
                        <Grid.Col span={span}>
                            <Text>{row.badgeName}</Text>
                        </Grid.Col>
                    )}

                    {!hideLesson && (
                        <Grid.Col span={span}>
                            <Text>{row.lessonName}</Text>
                        </Grid.Col>
                    )}

                    <Grid.Col span={span}>
                        <Text>{row.question}</Text>
                    </Grid.Col>
                </React.Fragment>
            ))}
        </Grid>
    )
}