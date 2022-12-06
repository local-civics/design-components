import {IconArrowLeft, IconCategory2} from "@tabler/icons";
import * as React                     from 'react';
import {
    createStyles,
    Badge,
    Title,
    Text,
    Container, Stack, Grid,
    Select, ActionIcon, Group,
    Button, Divider, LoadingOverlay,
}                              from '@mantine/core';
import {Table, Item}                  from "./Table";

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
 * LessonUserItem
 */
export type LessonUserItem = Item

/**
 * LessonGroup
 */
export type LessonGroup = {
    groupId: string
    name: string
    active: boolean
}

/**
 * LessonProps
 */
export type LessonProps = {
    loading: boolean
    displayName: string
    description: string
    groupId: string
    groups: LessonGroup[]
    users: LessonUserItem[]

    onBackClick: () => void;
    onGroupChange: (group: string) => void;
    onPreviewClick: () => void;
    onUserClick: (user: LessonUserItem) => void;
}

/**
 * Lesson
 * @param props
 * @constructor
 */
export const Lesson = (props: LessonProps) => {
    const { classes } = useStyles();

    return (
        <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <Badge
                            variant="filled"
                            leftSection={<ActionIcon onClick={props.onBackClick} color="blue" size="xs" radius="xl" variant="filled">
                                <IconArrowLeft size={14} />
                            </ActionIcon>}
                            size="lg">
                            Lessons
                        </Badge>
                        <Group>
                            <Stack spacing={0}>
                                <Title order={2} className={classes.title} mt="md">
                                    {props.displayName || "Lesson"}
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
                                    value={props.groupId}
                                    onChange={props.onGroupChange}
                                    icon={<IconCategory2/>}
                                    data={props.groups.map(g => {return {value: g.groupId, label: g.name}})}
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