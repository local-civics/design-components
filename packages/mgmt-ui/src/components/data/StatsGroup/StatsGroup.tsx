import * as React                                     from 'react';
import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][7]
        } 100%)`,
        padding: theme.spacing.xl * 1.5,
        borderRadius: theme.radius.md,
    },

    title: {
        color: theme.white,
        textTransform: 'uppercase',
        fontWeight: 700,
        fontSize: theme.fontSizes.sm,
    },

    count: {
        color: theme.white,
        fontSize: 32,
        lineHeight: 1,
        fontWeight: 700,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    description: {
        color: theme.colors[theme.primaryColor][0],
        fontSize: theme.fontSizes.sm,
        marginTop: 5,
    },

    stat: {
        flex: 1,
        '& + &': {
            paddingLeft: theme.spacing.xl,
            marginLeft: theme.spacing.xl,
            borderLeft: `1px solid ${theme.colors[theme.primaryColor][3]}`,

            [theme.fn.smallerThan('sm')]: {
                paddingLeft: 0,
                marginLeft: 0,
                borderLeft: 0,
                paddingTop: theme.spacing.xl,
                marginTop: theme.spacing.xl,
                borderTop: `1px solid ${theme.colors[theme.primaryColor][3]}`,
            },
        },
    },
}));

interface StatsGroupProps {
    data: { title: string; value: number, unit?: string}[];
    footer?: React.ReactNode
}

/**
 * StatsGroup
 * @param data
 * @param children
 * @constructor
 */
export const StatsGroup = ({ data, footer }: StatsGroupProps) => {
    const { classes } = useStyles();
    const stats = data.map((stat) => {
        const value = (() => {
            if(stat.unit === '%'){
               // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
               return Math.round((stat.value + Number.EPSILON) * 100)
            }

            return stat.value
        })()

        // falls back to 0 for undefined, null, NaN, etc
        const safeValue = Number.isFinite(value) ? value : 0;


        return <div key={stat.title} className={classes.stat}>
            <Text className={classes.count}>{safeValue.toLocaleString()}{stat.unit}</Text>
            <Text className={classes.title}>{stat.title}</Text>
        </div>
    });
    return <div className={classes.root}>
        {stats}
        {footer}
    </div>;
}