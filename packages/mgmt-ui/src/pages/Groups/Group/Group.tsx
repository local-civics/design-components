import {IconArrowLeft, IconPlaylistAdd, IconCloudUpload, IconX, IconDownload} from "@tabler/icons";
import {ParseResult}                                                          from "papaparse";
import {useState}                                                             from "react";
import * as React                                                             from 'react';
import {
    createStyles,
    Title,
    Text,
    Container, Stack, Grid,
    Drawer,
    Button, TextInput, Badge,
    ActionIcon,
    Group as GroupCore, Divider, LoadingOverlay
} from '@mantine/core';
import { Dropzone, MIME_TYPES }        from '@mantine/dropzone';
import { useForm }                     from '@mantine/form';
import * as papa                       from 'papaparse'
import {Timeline}                      from "../../../components/data/Timeline/Timeline";
import {StatsGroup}                    from "../../../components/stats/StatsGroup/StatsGroup";
import {UserInfo}                      from "../../../components/users/UserInfo/UserInfo";
import {GroupUserTable, GroupUserItem} from "./GroupUserTable";

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
    wrapper: {
        position: 'relative',
        marginBottom: 30,
    },

    dropzone: {
        borderWidth: 1,
        paddingBottom: 50,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: 250,
        left: 'calc(50% - 125px)',
        bottom: -20,
    },
}));

/**
 * GroupData
 */
export interface GroupData {
    description: string
    name: string
    groupUserHomeOpen: boolean
    user: {
        loading: boolean
        avatar: string
        givenName: string
        familyName: string
        email: string
        job: string
        quote: string
    }
    tenant: {
        name: string
        description: string
        image: string
        website: string
    }
    stats: {
        "PROBLEMS SOLVED": {
            value: number
            diff: number
        },
        "LESSONS COMPLETED": {
            value: number
            diff: number
        },
        "BADGES EARNED": {
            value: number
            diff: number
        },
    }
    timeline: {key: string, name: string, link?: string, description: string, time: string}[],
    users: GroupUserItem[]
    loading: boolean
}

/**
 * GroupProps
 */
export interface GroupProps{
    data: GroupData

    onBackClick: () => void
    onCreateUsers: (users: GroupUserItem[]) => void;
    onDelete: (user: GroupUserItem) => void;
    onRoleChange: (user: GroupUserItem, role: string | null) => void;
    onViewProfile: (user: GroupUserItem) => Promise<void>;
    onTimelineScrollBottom: () => void;
}

/**
 * Group
 * @param props
 * @constructor
 */
export const Group = (props: GroupProps) => {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            key: '',
            email: '',
            givenName: '',
            familyName: '',
            avatar: '',
            role: '',
            readonly: false,
            lastActivity: null,
        },

        validate: {
            email: (value) => /^\S+@\S+$/.test(value) && props.data.users.filter(u => u.email === value).length === 0 ? null : 'Invalid email',
        },
    });
    const [opened, setOpened] = useState(false);
    const [groupUserOpened, setGroupUserOpened] = useState(props.data.groupUserHomeOpen);

    if(groupUserOpened){
        return <Container size="lg" py="xl">
            <Stack spacing="md">
                <Grid>
                    <Grid.Col sm="auto">
                        <Badge
                            variant="filled"
                            leftSection={<ActionIcon onClick={() => setGroupUserOpened(false)} color="blue" size="xs" radius="xl" variant="filled">
                                <IconArrowLeft size={14} />
                            </ActionIcon>}
                            size="lg">
                            Users
                        </Badge>

                        <UserInfo variant="compact" data={props.data.user}/>
                    </Grid.Col>
                </Grid>

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.data.user.loading} overlayBlur={2} />
                    <Stack spacing="lg">
                        <StatsGroup data={[
                            {
                                title: "PROBLEMS SOLVED",
                                value: props.data.stats["PROBLEMS SOLVED"].value,
                                diff: props.data.stats["PROBLEMS SOLVED"].diff,
                            },
                            {
                                title: "LESSONS COMPLETED",
                                value: props.data.stats["LESSONS COMPLETED"].value,
                                diff: props.data.stats["LESSONS COMPLETED"].diff,
                            },
                            {
                                title: "BADGES EARNED",
                                value: props.data.stats["BADGES EARNED"].value,
                                diff: props.data.stats["BADGES EARNED"].diff,
                            },
                        ]}/>

                        <Timeline onScrollBottom={props.onTimelineScrollBottom} data={props.data.timeline} />
                    </Stack>
                </div>
            </Stack>
        </Container>
    }

    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title={<Title size="h5">Add people</Title>}
                padding="xl"
                size="xl"
            >
                <Stack spacing="md">
                    <DropzoneButton {...props} close={() => setOpened(false)} />

                    <Divider label="or" labelPosition="center" my="md" variant="dashed"/>

                    <form onSubmit={form.onSubmit(() => {
                        const values = form.values
                        form.reset()
                        setOpened(false)
                        props.onCreateUsers && props.onCreateUsers([values])
                    })}>
                        <Stack>
                            <TextInput
                                withAsterisk
                                label="Email"
                                placeholder="Email"
                                {...form.getInputProps('email')}
                            />
                            <GroupCore grow>
                                <TextInput
                                    label="Given name"
                                    placeholder="Given name"
                                    {...form.getInputProps('givenName')}
                                />
                                <TextInput
                                    label="Family name"
                                    placeholder="Family name"
                                    {...form.getInputProps('familyName')}
                                />
                            </GroupCore>
                            <Button type="submit" fullWidth mt="md">
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Drawer>
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
                            Groups
                        </Badge>
                        <Title order={2} className={classes.title} mt="md">
                            {props.data.name || "Group"}
                        </Title>

                        <Text color="dimmed" className={classes.description} mt="sm">
                            {props.data.description || "No description"}
                        </Text>
                    </Grid.Col>
                    <Grid.Col sm="content">
                        <Button
                            onClick={() => setOpened(true)}
                            leftIcon={<IconPlaylistAdd size={14} />}>
                            Add people
                        </Button>
                    </Grid.Col>
                </Grid>

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.data.loading} overlayBlur={2} />
                    <GroupUserTable
                        data={props.data.users}
                        onDelete={props.onDelete}
                        onChangeRole={props.onRoleChange}
                        onViewProfile={(user) => props.onViewProfile(user).then(() => {
                            setGroupUserOpened(true)
                        })}
                    />
                </div>
            </Stack>
            </Container>
        </>
    )
}

const DropzoneButton = (props: GroupProps & {close: () => void}) => {
    const { classes, theme } = useStyles();
    const openRef = React.useRef<() => void>(null);
    const [loading, setLoading] = React.useState(false)
    const onDrop = React.useCallback((acceptedFiles: File[]) => {
        setLoading(true)
        acceptedFiles.forEach((file) => {
            papa.parse(file, {
                download: true,
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                worker: true,
                complete: function(results: ParseResult<GroupUserItem>) {
                    const data = results.data
                        .filter(v => /^\S+@\S+$/.test(v.email) && props.data.users.filter(u => u.email === v.email).length === 0)
                    data.length > 0 && props.onCreateUsers && props.onCreateUsers(data)
                    setLoading(false)
                    props.close()
                }
            })
        })

    }, [])

    return (
        <div className={classes.wrapper}>
            <Dropzone
                loading={loading}
                openRef={openRef}
                onDrop={onDrop}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.csv]}
                maxSize={5 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <GroupCore position="center">
                        <Dropzone.Accept>
                            <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload
                                size={50}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                    </GroupCore>

                    <Text align="center" weight={700} size="lg" mt="xl">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        <Dropzone.Reject>Csv file less than 5mb</Dropzone.Reject>
                        <Dropzone.Idle>Upload multiple</Dropzone.Idle>
                    </Text>
                    <Text align="center" size="sm" mt="xs" color="dimmed">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that
                        are less than 5mb in size.
                    </Text>
                </div>
            </Dropzone>

            <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
                Select file
            </Button>
        </div>
    );
}