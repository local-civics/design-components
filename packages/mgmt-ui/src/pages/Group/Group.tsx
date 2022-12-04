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
import * as papa              from 'papaparse'
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
 * GroupUserItem
 */
export type GroupUserItem = Item

/**
 * GroupProps
 */
export type GroupProps = {
    loading: boolean
    displayName: string
    description: string
    users: GroupUserItem[]

    onBackClick: () => void;
    onCreateUsers: (users: GroupUserItem[]) => void;
    onDeleteUser: (user: GroupUserItem) => void;
    onRoleChange: (user: GroupUserItem, role: string | null) => void;
    onUserClick: (item: GroupUserItem) => void;
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
            groupId: '',
            userId: '',
            email: '',
            givenName: '',
            familyName: '',
            avatar: '',
            role: '',
            readonly: false,
            lastActivity: null,
        },

        validate: {
            email: (value) => /^\S+@\S+$/.test(value) && props.users.filter(u => u.email === value).length === 0 ? null : 'Invalid email',
        },
    });
    const [opened, setOpened] = useState(false);
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
                            {props.displayName || "Group"}
                        </Title>

                        <Text color="dimmed" className={classes.description} mt="sm">
                            {props.description || "No description"}
                        </Text>
                    </Grid.Col>
                    <Grid.Col sm="content">
                        { !props.loading && <Button
                            onClick={() => setOpened(true)}
                            leftIcon={<IconPlaylistAdd size={14} />}>
                            Add people
                        </Button> }
                    </Grid.Col>
                </Grid>

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    <Table
                        loading={props.loading}
                        items={props.users}
                        onDelete={props.onDeleteUser}
                        onChangeRole={props.onRoleChange}
                        onViewProfile={(user) => props.onUserClick(user)}
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
                        .filter(v => /^\S+@\S+$/.test(v.email) && props.users.filter(u => u.email === v.email).length === 0)
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