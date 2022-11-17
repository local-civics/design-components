import {IconArrowLeft, IconCategory2} from "@tabler/icons";
import * as React                     from 'react';
import {
    createStyles,
    Badge as BadgeCore,
    Title,
    Text,
    Container, Stack, Grid,
    Select, TabsValue, ActionIcon, Group,
    Button, Divider,
} from '@mantine/core';
import {Tabs}                           from "../../../components/navigation/Tabs/Tabs";
import {BadgeUserTable, BadgeUserItem} from "./BadgeUserTable";

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
 * BadgeData
 */
export interface BadgeData {
    key: string
    name: string,
    description: string
    groups: {name: string, active?: boolean}[]
    tab: TabsValue
    users: BadgeUserItem[]
}

/**
 * BadgeProps
 */
export interface BadgeProps{
    data: BadgeData

    onBackClick: () => void
    onGroupChange: (next: string) => void;
    onPreview: (badge: BadgeData) => void;
    onTabChange: (next: TabsValue) => void;
    onUserClick: (user: BadgeUserItem) => void;
}

/**
 * Badge
 * @param props
 * @constructor
 */
export const Badge = (props: BadgeProps) => {
    const groups = useGroups(props.data.groups, props.onGroupChange)
    const tabs = useTabs(props.data.tab, props.onTabChange)
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
                                    {props.data.name || "Badge"}
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
                    <BadgeUserTable
                        data={props.data.users}
                        onClick={props.onUserClick}
                    />
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