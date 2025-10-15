import * as React          from 'react';
import {Grid, Badge, Text} from '@mantine/core';
import {Link}              from "react-router-dom";

/**
 * Item
 */
export interface Item {
    badgeName: string
    completion: number
    isStarted?: boolean
    href: string
}

/**
 * StackData
 */
export type StackData = {
    items: Item[]
}

/**
 * StackProps
 */
export type StackProps = StackData

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
                <Text<typeof Link> component={Link} to={row.href} color="dark.4" weight="bold" size="md">
                    {row.badgeName}
                </Text>
            </Grid.Col>
            <Grid.Col span={6}>
                {row.completion >= 1 && <Badge variant="filled">Complete</Badge>}
                {row.completion === 0 && !row.isStarted && <Badge color="red" variant="filled">Not started</Badge>}
                {row.completion > 0 && row.completion < 1 && <Badge color="violet" variant="filled">{Math.round((row.completion + Number.EPSILON) * 100)}% Complete</Badge>}
            </Grid.Col>
        </>
    ));

    return <Grid grow gutter="lg" sx={{ padding: 20, minWidth: 700 }}>
        {rows}
    </Grid>
}