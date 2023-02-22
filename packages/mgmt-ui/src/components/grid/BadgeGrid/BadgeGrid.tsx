import * as React                                                                      from "react";
import {Card, Avatar, Text, Progress, Badge, Group, SimpleGrid, ThemeIcon, UnstyledButton} from '@mantine/core';
import {IconBadge}                                                             from '@tabler/icons';
import AvatarInit                                                                                      from 'avatar-initials';
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
    users: {name: string}[]
}

export function TaskCard(props: TaskCardProps) {
    const avatars = props.users.slice(0, 3).map((u, i) => {
        const fullName = u.name
        let initials = fullName.split(/[ -]/).map((n) => n.charAt(0)).join('');
        const src = AvatarInit.initialAvatar({
            background: '#f4f6f7',
            color: '#888888',
            fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
            fontSize: 10,
            fontWeight: 250,
            size: 30,
            initials: initials,
        })

        return <Avatar key={i} src={src} radius="xl" />
    })

    const remainingUsers = props.users.slice(3).length
    const isComplete = props.lessonsCompleted >= props.lessonsTotal

    return (
        <Card withBorder radius="md">
            {!!props.lessonsTotal && <Group position="apart">
                <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
                    <IconBadge size={20} />
                </ThemeIcon>
                {isComplete && <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Complete</Badge>}
                {!isComplete && <Badge variant="filled">Incomplete</Badge>}
            </Group>}

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

            <Group position="apart" mt="md">
                <Avatar.Group spacing="sm">
                    {avatars}
                    {!!remainingUsers && <Avatar radius="xl">+{remainingUsers}</Avatar> }
                </Avatar.Group>
            </Group>
        </Card>
    );
}