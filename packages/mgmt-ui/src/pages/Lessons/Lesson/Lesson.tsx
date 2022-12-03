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
export interface LessonData {
    key: string
    name: string,
    description: string
    groups: {name: string, active?: boolean}[]
    tab: TabsValue
    users: LessonUserItem[]
}

/**
 * LessonProps
 */
export interface LessonProps{
    loading: boolean
    data: LessonData

    onBackClick: () => void
    onGroupChange: (next: string) => void;
    onPreview: (lesson: LessonData) => void;
    onTabChange: (next: TabsValue) => void;
    onUserClick: (user: LessonUserItem) => void;
}

/**
 * Lesson
 * @param props
 * @constructor
 */
export const Lesson = (props: LessonProps) => {
    const groups = useGroups(props.data.groups, props.onGroupChange)
    const tabs = useTabs(props.data.tab, props.onTabChange)
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
                                    {props.data.name || "Lesson"}
                                </Title>

                                <Text color="dimmed" className={classes.description} mt="sm">
                                    {props.data.description || "No description"}
                                </Text>
                            </Stack>

                            <Stack ml="auto">
                                <Button
                                    variant="gradient"
                                    onClick={() => props.onPreview && props.onPreview(props.data)}
                                >
                                    Preview
                                </Button>
                                <Divider label="or" labelPosition="center" my="xs" variant="dashed" />
                                <Select
                                    size="sm"
                                    placeholder="Select a group"
                                    nothingFound="No options"
                                    value={groups.select}
                                    onChange={groups.onSelectChange}
                                    icon={<IconCategory2/>}
                                    data={props.data.groups.map(g => g.name)}
                                />
                            </Stack>
                        </Group>
                    </Grid.Col>
                </Grid>
                <div>
                    <Tabs
                        data={tabsData}
                        value={tabs.value}
                        onChange={tabs.onChange}
                    />
                    <div style={{ position: 'relative' }}>
                        <LoadingOverlay visible={props.loading} overlayBlur={2} />
                        <LessonUserTable
                            loading={props.loading}
                            data={props.data.users}
                            onClick={props.onUserClick}
                        />
                    </div>
                </div>
            </Stack>
        </Container>
    )
}

const useGroups = (initialState: {name: string, active?: boolean}[], onGroupChange: (next: string) => void) => {
    const active = initialState.filter(g => g.active)
    const [group, setGroup] = React.useState(active.length > 0 ? active[0].name : null)

    return {
        select: group,
        onSelectChange: (next: string) => {
            setGroup(next)
            onGroupChange && onGroupChange(next)
        }
    }
}

const useTabs = (initialState: TabsValue, onTabChange: (next: TabsValue) => void) => {
    const [tab, setTab] = React.useState<TabsValue>(initialState);

    return {
        value: tab,
        onChange: (next: TabsValue) => {
            setTab(next)
            onTabChange && onTabChange(next)
        }
    }
}