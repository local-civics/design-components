import {IconArrowLeft, IconCategory2} from "@tabler/icons";
import * as React                     from 'react';
import {
    createStyles,
    Badge as BadgeCore,
    Title,
    Text,
    Container, Stack, Grid,
    Select, ActionIcon, Group,
    Button, Divider, LoadingOverlay,
} from '@mantine/core';
import {Table, Item} from "./Table";

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
 * BadgeUserItem
 */
export type BadgeUserItem = Item

/**
 * BadgeGroup
 */
export type BadgeGroup = {
    name: string
    active: boolean
}

/**
 * BadgeProps
 */
export type BadgeProps = {
    loading: boolean
    displayName: string,
    description: string
    groups: BadgeGroup[]
    group: string
    users: BadgeUserItem[]

    onBackClick: () => void;
    onGroupChange: (group: string) => void;
    onPreviewClick: () => void;
    onUserClick: (user: BadgeUserItem) => void;
}

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
    const { classes } = useStyles();

    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <BadgeCore
                            variant="filled"
                            leftSection={<ActionIcon onClick={props.onBackClick} color="blue" size="xs" radius="xl" variant="filled">
                                <IconArrowLeft size={14} />
                            </ActionIcon>}
                            size="lg">
                            Badges
                        </BadgeCore>
                        <Group>
                            <Stack spacing={0}>
                                <Title order={2} className={classes.title} mt="md">
                                    {props.displayName || "Badge"}
                                </Title>

                                <Text color="dimmed" className={classes.description} mt="sm">
                                    {props.description || "No description"}
                                </Text>
                            </Stack>

                            <Stack spacing="xs" ml="auto">
                                <Button
                                    variant="gradient"
                                    onClick={props.onPreviewClick}
                                >
                                    Preview
                                </Button>
                                <Divider label="or" labelPosition="center" my="xs" variant="dashed" />
                                <Select
                                    size="sm"
                                    placeholder="Select a group"
                                    nothingFound="No options"
                                    value={props.group}
                                    onChange={props.onGroupChange}
                                    icon={<IconCategory2/>}
                                    data={props.groups.map(g => g.name)}
                                />
                            </Stack>
                        </Group>
                    </Grid.Col>
                </Grid>
                <div>
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay visible={props.loading} overlayBlur={2} />
                        <Table
                            loading={props.loading}
                            items={props.users}
                            onClick={props.onUserClick}
                        />
                    </div>
                </div>
            </Stack>
        </Container>
    )
}