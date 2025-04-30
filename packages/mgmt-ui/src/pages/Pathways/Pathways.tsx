import * as React                       from 'react';
import {
    createStyles,
    Badge as BadgeCore,
    Title,
    Text,
    Container, Stack, Grid, LoadingOverlay,
}                                       from '@mantine/core';
import {Table, Item}         from "./Table";

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 34,
        fontWeight: 900,
        [theme.fn.smallerThan('sm')]: {
            fontSize: 24,
        },
    },

    description: {
        maxWidth: 600,
    },
}));

/**
 * PathwaysItem
 */
export type PathwaysItem = Item

/**
 * PathwaysProps
 */
export type PathwaysProps = {
    loading: boolean
    pathways: PathwaysItem[]
}

/**
 * PathwaysPage
 * @param props
 * @constructor
 */
export const Pathways = (props: PathwaysProps) => {
    const { classes } = useStyles();
    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <BadgeCore variant="filled" size="lg">
                            Pathways
                        </BadgeCore>
                        <Title order={2} className={classes.title} mt="md">
                            Pathways
                        </Title>

                        <Text color="dimmed" className={classes.description} mt="sm">
                            Curated learning experiences for skill-building
                        </Text>
                    </Grid.Col>
                </Grid>

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    <Table
                        loading={props.loading}
                        items={props.pathways}
                    />
                </div>
            </Stack>
        </Container>
    )
}