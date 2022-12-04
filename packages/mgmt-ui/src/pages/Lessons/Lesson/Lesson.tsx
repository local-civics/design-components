import {IconArrowLeft, IconCategory2} from "@tabler/icons";
import * as React                     from 'react';
import {
    createStyles,
    Badge,
    Title,
    Text,
    Container, Stack, Grid,
    Select, TabsValue, ActionIcon, Group,
    Button, Divider, LoadingOverlay,
} from '@mantine/core';
import {Tabs}                        from "../../../components/navigation/Tabs/Tabs";
import {LessonUserTable, LessonUserItem} from "./LessonUserTable";

const tabsData = [{value: "Complete"}, {value: "Incomplete"}]

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
 * LessonData
 */
export type LessonData = {
    loading: boolean
    id: string
    name: string,
    description: string
    group: string
    groups: {name: string, active?: boolean}[]
    tab: TabsValue
    users: LessonUserItem[]
}

/**
 * LessonMethods
 */
export type LessonMethods = {
    onBackClick: () => void
    onGroupChange: (value: string) => void;
    onPreview: (id: string) => void;
    onTabChange: (value: TabsValue) => void;
    onUserClick: (item: LessonUserItem) => void;
}

/**
 * LessonProps
 */
export type LessonProps = LessonData & LessonMethods

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
                                    {props.name || "Lesson"}
                                </Title>

                                <Text color="dimmed" className={classes.description} mt="sm">
                                    {props.description || "No description"}
                                </Text>
                            </Stack>

                            <Stack ml="auto">
                                <Button
                                    variant="gradient"
                                    onClick={() => props.onPreview && props.onPreview(props.id)}
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
                    <Tabs
                        data={tabsData}
                        value={props.tab}
                        onChange={props.onTabChange}
                    />
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay visible={props.loading} overlayBlur={2} />
                        <LessonUserTable
                            loading={props.loading}
                            data={props.users}
                            onClick={props.onUserClick}
                        />
                    </div>
                </div>
            </Stack>
        </Container>
    )
}