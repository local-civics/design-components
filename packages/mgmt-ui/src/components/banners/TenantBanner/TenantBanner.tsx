import * as React                                             from "react";
import { Card, CardProps, createStyles, Overlay, Text, Group, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

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
    code: {
        color: theme.white,
        maxWidth: 220,
    },
}));

interface TenantBannerProps {
    title: string;
    description: string;
    image: string;
    code?: string;
}

/**
 * TenantBanner
 * @param title
 * @param description
 * @param image
 * @param style
 * @param className
 * @param code
 * @param others
 * @constructor
 */
export const TenantBanner = ({
                          title,
                          description,
                          image,
                          style,
                          className,
                          code,
                          ...others
                      }: TenantBannerProps & Omit<CardProps, keyof TenantBannerProps | 'children'>) => {
    const { classes, cx, theme } = useStyles();
    const handleCopy = async () => {
        if (!code) return;
      
        try {
          await navigator.clipboard.writeText(code);
          showNotification({
            title: "Copied!",
            message: "Community code copied to clipboard.",
            autoClose: 3000,
          });
        } catch (err) {
          console.error("Failed to copy code", err);
        }
      };

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
                
              
                <Group mt="sm" spacing="xs">
                    <Text size="sm" className={classes.code}>
                        Community Code: {code || "—"}
                    </Text>

                    {code && (
                        <Button
                        size="xs"
                        variant="white"
                        onClick={handleCopy}
                        styles={{
                            root: {
                            backgroundColor: "rgba(255,255,255,0.9)",
                            },
                        }}
                        >
                        Copy
                        </Button>
                    )}
                </Group>
            </div>
        </Card>
    );
}