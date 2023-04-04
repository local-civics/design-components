import * as React                                                                          from "react";
import {Card, Text, SimpleGrid, UnstyledButton, Button} from '@mantine/core';
import {IconClipboardCopy}                                                      from '@tabler/icons';
import {Link}                                                                              from "react-router-dom";

/**
 * BadgeGridProps
 */
export type BadgeGridProps = {
    badges: TaskCardProps[]
    onAssign: (taskId: string) => void;
}

/**
 * BadgeGrid
 * @param props
 * @constructor
 */
export const BadgeGrid = (props: BadgeGridProps) => {
    const badges = props.badges.map(b => <TaskCard key={b.title} {...b}/>)
    return <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 3 }]}>
        {badges}
    </SimpleGrid>
}

export type TaskCardProps = {
    taskId: string
    title: string
    description: string
    href: string
    onAssign: (taskId: string) => void;
}

export function TaskCard(props: TaskCardProps) {
    return (
        <Card withBorder radius="md">
            <UnstyledButton<typeof Link> component={Link} to={props.href} sx={{":hover": {textDecoration: "underline"}}}>
                <Text size="md" weight={500}>
                    {props.title}
                </Text>
            </UnstyledButton>

            <Text size="sm" color="dimmed" mt={5} mb={25} h={125} sx={{overflowY: "scroll"}}>
                {props.description}
            </Text>

            <Button
                variant="gradient"
                size="xs"
                leftIcon={<IconClipboardCopy size={14} />}
                onClick={() => props.onAssign(props.taskId)}
            >
                Assign
            </Button>
        </Card>
    );
}