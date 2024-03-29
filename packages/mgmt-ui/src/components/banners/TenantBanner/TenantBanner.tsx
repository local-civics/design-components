import {Card, CardProps, createStyles, Overlay, Text} from "@mantine/core";
import * as React                                             from "react";

const useStyles = createStyles((theme) => ({
    card: {
        height: 240,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        whiteSpace: 'pre-line'
    },

    content: {
        position: 'absolute',
        padding: theme.spacing.xl,
        zIndex: 1,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },

    title: {
        color: theme.white,
        marginBottom: theme.spacing.xs / 2,
    },

    description: {
        color: theme.white,
        maxWidth: 220,
    },
}));

interface TenantBannerProps {
    title: string;
    description: string;
    image: string;
}

/**
 * TenantBanner
 * @param title
 * @param description
 * @param image
 * @param style
 * @param className
 * @param others
 * @constructor
 */
export const TenantBanner = ({
                          title,
                          description,
                          image,
                          style,
                          className,
                          ...others
                      }: TenantBannerProps & Omit<CardProps, keyof TenantBannerProps | 'children'>) => {
    const { classes, cx, theme } = useStyles();

    return (
        <Card
            radius="md"
            style={{ backgroundImage: `url(${image})`, ...style }}
            className={cx(classes.card, className)}
            {...others}
        >
            <Overlay
                gradient={`linear-gradient(105deg, ${theme.black} 20%, #312f2f 50%, ${theme.colors.gray[6]} 100%)`}
                opacity={0.55}
                zIndex={0}
            />

            <div className={classes.content}>
                <Text size="lg" weight={700} className={classes.title}>
                    {title}
                </Text>

                <Text size="sm" className={classes.description}>
                    {description}
                </Text>
            </div>
        </Card>
    );
}