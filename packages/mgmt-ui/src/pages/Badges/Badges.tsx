import * as React                       from 'react';
import {
    createStyles,
    Badge as BadgeCore,
    Title,
    Text,
    Container, Stack, Grid, Autocomplete, LoadingOverlay,
}                                       from '@mantine/core';
import {Badge, BadgeData, BadgeMethods} from "./Badge/Badge";
import {Item, Table}         from "./Table";

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
 * BadgeData
 */
export type BadgesData = {
    loading: boolean
    badges: Item[]
    badge: BadgeData | null
}

export type BadgesMethods = BadgeMethods & {
    onAutocompleteChange: (value: string) => void
    onGroupChange: (value: string) => void;
    onBadgeClick: (item: Item) => void;
}

/**
 * BadgesProps
 */
export type BadgesProps = BadgesData & BadgesMethods

/**
 * Badges
 * @param props
 * @constructor
 */
export const Badges = (props: BadgesProps) => {
    const { classes } = useStyles();
    if(props.badge){
        return <Badge
            {...props.badge}
            onBackClick={props.onBackClick}
            onGroupChange={props.onGroupChange}
            onTabChange={props.onTabChange}
            onUserClick={props.onUserClick}
            onPreview={props.onPreview}
        />
    }

    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <BadgeCore variant="filled" size="lg">
                            Badges
                        </BadgeCore>
                        <Title order={2} className={classes.title} mt="md">
                            Badges and micro-credentials
                        </Title>

                        <Text color="dimmed" className={classes.description} mt="sm">
                            Project-sized skills acquisition and standards alignment.
                        </Text>
                    </Grid.Col>
                </Grid>

                <Autocomplete
                    placeholder="Search for a badge that fits your needs"
                    data={props.badges.map(item => item.name)}
                    onChange={props.onAutocompleteChange}
                />

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    <Table
                        loading={props.loading}
                        data={props.badges}
                        onClick={props.onBadgeClick}
                    />
                </div>
            </Stack>
        </Container>
    )
}