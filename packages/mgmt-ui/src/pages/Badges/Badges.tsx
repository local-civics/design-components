import {useState}              from "react";
import * as React              from 'react';
import {
    createStyles,
    Badge as BadgeCore,
    Title,
    Text,
    Container, Stack, Grid, Autocomplete, TabsValue, LoadingOverlay,
} from '@mantine/core';
import {PlaceholderBanner}     from "../../banners/PlaceholderBanner/PlaceholderBanner";
import {Badge, BadgeData}      from "./Badge/Badge";
import {BadgeUserItem}         from "./Badge/BadgeUserTable";
import {BadgeTable, BadgeItem} from "./BadgeTable";

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
 * BadgesData
 */
export interface BadgesData {
    loading: boolean
    badge: BadgeData
    badgeOpen: boolean
    badges: BadgeItem[]
}

/**
 * BadgesProps
 */
export interface BadgesProps{
    data: BadgesData

    onAutocompleteChange: (next: string) => void
    onGroupChange: (next: string) => void;
    onBadgeClick: (badge: BadgeItem) => void
    onPreview: (badge: BadgeItem) => void;
    onTabChange: (tab: TabsValue) => void;
    onUserClick: (user: BadgeUserItem) => void;
}

/**
 * Badges
 * @param props
 * @constructor
 */
export const Badges = (props: BadgesProps) => {
    const { classes } = useStyles();

    const [badgeOpened, setBadgeOpened] = useState(props.data.badgeOpen);

    if(badgeOpened){
        return <Badge
            data={props.data.badge}
            onBackClick={() => setBadgeOpened(false)}
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
                    data={props.data.badges.map(item => item.name)}
                    onChange={props.onAutocompleteChange}
                />

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.data.loading} overlayBlur={2} />
                    <BadgeTable
                        data={props.data.badges}
                        onClick={(b) => {
                            props.onBadgeClick && props.onBadgeClick(b)
                            setBadgeOpened(true)
                        }}
                    />
                </div>
            </Stack>
        </Container>
    )
}