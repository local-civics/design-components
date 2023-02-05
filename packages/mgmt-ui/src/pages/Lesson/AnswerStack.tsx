import * as React                                 from 'react';
import {Stack as MantineStack, UnstyledButton, ScrollArea, Title, Text} from '@mantine/core';

/**
 * Item
 */
export interface Item {
    questionName: string
    answer: string[]
}

/**
 * StackData
 */
export type StackData = {
    href: string
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
        <MantineStack spacing={0} key={row.questionName}>
            <Title color="dark.4" size="lg">{row.questionName}</Title>
            <Text>{row.answer.join(",") || "No answer."}</Text>
        </MantineStack>
    ));

    return (
        <ScrollArea.Autosize maxHeight={600}>
            <UnstyledButton<'a'> component='a' href={props.href}>
                <MantineStack spacing={24} sx={{ padding: 20, minWidth: 700 }}>
                    {rows}
                </MantineStack>
            </UnstyledButton>
        </ScrollArea.Autosize>
    );
}