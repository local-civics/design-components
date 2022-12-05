import * as React                                          from 'react';
import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: theme.spacing.xl * 1.5,
        paddingBottom: theme.spacing.xl * 1.5,
    },

    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

interface StatsGridProps {
    data: { title: string; value: number; diff: number }[];
}

/**
 * StatsGrid
 * @param data
 * @constructor
 */
export const StatsGrid = ({ data }: StatsGridProps) => {
    const { classes } = useStyles();
    const stats = data.map((stat) => {
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group position="apart">
                    <div>
                        <Text
                            color="dimmed"
                            transform="uppercase"
                            weight={700}
                            size="xs"
                            className={classes.label}
                        >
                            {stat.title}
                        </Text>
                        <Text weight={700} size="xl">
                            {stat.value.toLocaleString()}
                        </Text>
                    </div>
                    { stat.diff && <ThemeIcon
                        color="gray"
                        variant="light"
                        sx={(theme) => ({ color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6] })}
                        size={38}
                        radius="md"
                    >
                        <DiffIcon size={28} stroke={1.5} />
                    </ThemeIcon> }
                </Group>
                { stat.diff && <Text color="dimmed" size="sm" mt="md">
                    <Text component="span" color={stat.diff > 0 ? 'teal' : 'red'} weight={700}>
                        {stat.diff}%
                    </Text>{' '}
                    {stat.diff > 0 ? 'increase' : 'decrease'} compared to last period
                </Text> }
            </Paper>
        );
    });

    return (
        <div className={classes.root}>
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                {stats}
            </SimpleGrid>
        </div>
    );
}