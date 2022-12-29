import * as React                                                      from 'react';
import {Grid, Badge, Title} from '@mantine/core';

/**
 * Item
 */
export interface Item {
    lessonName: string
    isStarted?: boolean
    isComplete?: boolean
}

/**
 * StackData
 */
export type StackData = {
    items: Item[]
}

/**
 * StackMethods
 */
export type StackMethods = {}

/**
 * StackProps
 */
export type StackProps = StackData & StackMethods

/**
 * Stack
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    if(props.items.length === 0){
        return null
    }

    const rows = props.items.map((row) => (
        <>
            <Grid.Col span={6}>
                <Title color="dark.4" size="lg">{row.lessonName}</Title>
            </Grid.Col>
            <Grid.Col span={6}>
                {!!row.isComplete && <Badge variant="filled">Complete</Badge>}
                {!row.isComplete && !row.isStarted && <Badge color="red" variant="filled">Not started</Badge>}
                {!row.isComplete && !!row.isStarted && <Badge color="violet" variant="filled">In progress</Badge>}
            </Grid.Col>
        </>
    ));

    return <Grid grow gutter="lg" sx={{ padding: 20, minWidth: 700 }}>
        {rows}
    </Grid>
}