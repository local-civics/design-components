import {IconInfoCircle, IconPlaylistAdd} from "@tabler/icons";
import {useState}                                        from "react";
import * as React                        from 'react';
import {
    createStyles,
    Badge,
    Title,
    Text,
    Container, Stack, Grid,
    Drawer,
    Button, TextInput, ActionIcon,
    Tooltip, Group as GroupCore,
}                                    from '@mantine/core';
import { useForm }                   from '@mantine/form';
import {Group, GroupData}            from "./Group/Group";
import {GroupUserItem}               from "./Group/GroupUserTable";
import {GroupStackItem, GroupsStack} from "./GroupsStack";

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
 * GroupsData
 */
export interface GroupsData {
    formOpen: boolean
    group: GroupData
    groupOpen: boolean
    groups: GroupStackItem[]
}

/**
 * GroupsProps
 */
export interface GroupsProps{
    data: GroupsData

    onCreateGroup:  (group: GroupStackItem) => void
    onCreateGroupUsers: (users: GroupUserItem[]) => void
    onDeleteGroup:  (group: GroupStackItem) => void
    onDeleteGroupUser: (user: GroupUserItem) => void
    onEditGroup: (group: GroupStackItem) => void
    onViewGroupUser: (user: GroupUserItem) => Promise<void>
    onGroupUserRoleChange: (user: GroupUserItem, next: string | null) => void
    onTimelineScrollBottom: () => void;
}

/**
 * Groups
 * @param props
 * @constructor
 */
export const Groups = (props: GroupsProps) => {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            key: '',
            name: '',
            description: '',
        },

        validate: {
            name: (val) => (val.length <= 6 ? 'Name should include at least 6 characters' : null),
        },
    });
    const [opened, setOpened] = useState(props.data.formOpen);
    const [groupOpened, setGroupOpened] = useState(props.data.groupOpen);

    if(groupOpened){
        return <Group
            data={props.data.group}
            onBackClick={() => setGroupOpened(false)}
            onCreateUsers={props.onCreateGroupUsers}
            onDelete={props.onDeleteGroupUser}
            onViewProfile={props.onViewGroupUser}
            onRoleChange={props.onGroupUserRoleChange}
            onTimelineScrollBottom={props.onTimelineScrollBottom}
        />
    }

    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title={<GroupCore spacing={0}>
                    <Title size="h5">Create a group</Title>
                    <Tooltip label="Groups settings cannot be modified once created">
                        <ActionIcon>
                            <IconInfoCircle color="#3b82f6" size={14} />
                        </ActionIcon>
                    </Tooltip>
            </GroupCore>}
                padding="xl"
                size="xl"
            >
                <form onSubmit={form.onSubmit(() => {
                    const values = form.values
                    form.reset()
                    setOpened(false)
                    props.onCreateGroup && props.onCreateGroup(values)
                })}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="Group name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            label="Description"
                            placeholder="A group for my first period class"
                            {...form.getInputProps('description')}
                        />
                    </Stack>
                    <Button type="submit" fullWidth mt="md">
                        Submit
                    </Button>
                </form>
            </Drawer>
            <Container size="lg" py="xl">
                <Stack spacing="md">
                    <Grid>
                        <Grid.Col sm="auto">
                            <Badge variant="filled" size="lg">
                                Groups
                            </Badge>
                            <Title order={2} className={classes.title} mt="md">
                                Organize people into groups
                            </Title>

                            <Text color="dimmed" className={classes.description} mt="sm">
                                A group can be a class, team, or other functioning organizations.
                            </Text>
                        </Grid.Col>
                        <Grid.Col sm="content">
                            <Button
                                onClick={() => setOpened(true)}
                                leftIcon={<IconPlaylistAdd size={14} />}>
                                Create group
                            </Button>
                        </Grid.Col>
                    </Grid>

                    <GroupsStack
                        data={props.data.groups}
                        onDeleteGroup={props.onDeleteGroup}
                        onEditGroup={(g) => {
                            props.onEditGroup && props.onEditGroup(g)
                            setGroupOpened(true)
                        }}
                    />
                </Stack>
            </Container>
        </>
    )
}