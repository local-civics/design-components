import * as React                                                                      from "react";
import {Card, Text, Progress, Badge, Group, SimpleGrid, ThemeIcon, UnstyledButton} from '@mantine/core';
import {IconBadge}                                                             from '@tabler/icons';
import {Link}                                                                          from "react-router-dom";

/**
 * BadgeGridProps
 */
export type BadgeGridProps = {
    badges: TaskCardProps[]
}

/**
 * BadgeGrid
 * @param props
 * @constructor
 */
export const BadgeGrid = (props: BadgeGridProps) => {
    const badges = props.badges.map(b => <TaskCard key={b.title} {...b}/>)
    return <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {badges}
    </SimpleGrid>
}

export type TaskCardProps = {
    title: string
    description: string
    lessonsCompleted: number
    lessonsTotal: number
    href: string
}

export function TaskCard(props: TaskCardProps) {
    const isComplete = props.lessonsCompleted >= props.lessonsTotal

    return (
        <Card withBorder radius="md">
            <Group position="apart">
                <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    <IconBadge size={20} />
                </ThemeIcon>
                {!!props.lessonsTotal && isComplete && <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Complete</Badge>}
                {!!props.lessonsTotal && !isComplete && <Badge variant="filled">Incomplete</Badge>}
            </Group>

            <UnstyledButton<typeof Link> component={Link} to={props.href} mt="md" sx={{":hover": {textDecoration: "underline"}}}>
                <Text size="lg" weight={500}>
                    {props.title}
                </Text>
            </UnstyledButton>
            <Text size="sm" color="dimmed" mt={5}>
                {props.description}
            </Text>

            {!!props.lessonsCompleted && <Text color="dimmed" size="sm" mt="md">
                Lessons completed:{' '}
                <Text
                    span
                    weight={500}
                    sx={(theme) => ({ color: theme.colorScheme === 'dark' ? theme.white : theme.black })}
                >
                    {props.lessonsCompleted}
                </Text>
            </Text>}

            {!!props.lessonsTotal && <Progress value={(props.lessonsCompleted / props.lessonsTotal) * 100} mt={5} />}
        </Card>
    );
}