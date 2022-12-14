import * as React from 'react';
import { createStyles, Paper, Text, ThemeIcon } from '@mantine/core';
import { IconColorSwatch } from '@tabler/icons';

const useStyles = createStyles((theme, props: CardGradientProps) => {
    const from = props.from || 'blue'
    const to = props.to || 'green'
    return {
        card: {
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'transform 150ms ease, box-shadow 100ms ease',
            padding: theme.spacing.xl,
            paddingLeft: theme.spacing.xl * 2,

            '&:hover': {
                boxShadow: theme.shadows.md,
                transform: 'scale(1.02)',
            },

            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: 6,
                backgroundImage: theme.fn.linearGradient(0, theme.colors[from][6], theme.colors[to][6]),
            },
        },
    }
});

export type CardGradientProps = {
    title: string;
    description: string;
    onClick: () => void;
    icon?: React.ReactNode
    from?: string
    to?: string
}

export function CardGradient(props: CardGradientProps) {
    const { classes } = useStyles(props);
    const from = props.from || 'blue'
    const to = props.to || 'green'
    const icon = props.icon || <IconColorSwatch size={28} stroke={1.5} />
    return (
        <Paper withBorder radius="md" className={classes.card} onClick={props.onClick}>
            <ThemeIcon
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ deg: 0, from, to }}
            >
                {icon}
            </ThemeIcon>
            <Text size="xl" weight={500} mt="md">
                {props.title}
            </Text>
            <Text size="sm" mt="sm" color="dimmed">
                {props.description}
            </Text>
        </Paper>
    );
}