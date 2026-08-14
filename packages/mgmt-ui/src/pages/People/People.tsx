import {IconArrowLeft, IconCloudUpload, IconX, IconDownload, IconSearch} from "@tabler/icons";
import {ParseResult} from "papaparse";
import {useState} from "react";
import * as React from 'react';
import {
    Title,
    Drawer,
    Button, TextInput,
    Group, Divider,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm }              from '@mantine/form';
import * as papa                from 'papaparse'
import {StatsGroup}             from "../../components/data/StatsGroup/StatsGroup";
import {SplitButton}            from "./SplitButton";
import {Table, Item}            from "./Table";

/**
 * UserItem
 */
export type UserItem = Item

/**
 * PeopleProps
 */
export type PeopleProps = {
    loading: boolean
    users: UserItem[]
    percentageOfAccountsCreated: number
    percentageRostered: number
    withOrganizationLink?: boolean

    onBackClick: () => void;
    onCreateUsers: (users: UserItem[]) => void;
    onDeleteUser: (user: UserItem) => void;
    onChangeUserRole: (user: UserItem, role: string | null) => void;
    onCopyLinkClick: () => void;
    onAutocompleteChange: (next: string) => void
}

/**
 * People
 * @param props
 * @constructor
 */
export const People = (props: PeopleProps) => {
    const form = useForm({
        initialValues: {
            userId: '',
            email: '',
            givenName: '',
            familyName: '',
            avatar: '',
            role: '',
            readonly: false,
            lastActivity: null,
            hasAccount: false,
            numberOfClasses: 0,
            href: "",
            isAdmin: false,
            isGroupAdmin: false,
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
                title={<Title size="h5">Add members</Title>}
                padding="xl"
                size="xl"
            >
                <div className="flex flex-col gap-4">
                    <DropzoneButton {...props} close={() => setOpened(false)} />

                    <Divider label="or" labelPosition="center" my="md" variant="dashed"/>

                    <form onSubmit={form.onSubmit(() => {
                        const values = form.values
                        form.reset()
                        setOpened(false)
                        props.onCreateUsers && props.onCreateUsers([values])
                    })}>
                        <div className="flex flex-col gap-3">
                            <TextInput
                                withAsterisk
                                label="Email"
                                placeholder="Email"
                                {...form.getInputProps('email')}
                            />
                            <Group grow>
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
                            </Group>
                            <button
                                type="submit"
                                className="mt-2 rounded-lg bg-dark-blue-400 px-4 py-2.5 text-xs font-bold text-white"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Drawer>

            <div className="flex flex-col gap-5 px-4 py-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                        <div onClick={props.onBackClick} className="flex w-max cursor-pointer items-center gap-1 text-xs font-bold text-sky-blue-400">
                            <IconArrowLeft size={13} stroke={2.5} />
                            Back
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">People</h1>
                        <p className="max-w-xl text-sm text-slate-500">Manage members of your organization</p>
                    </div>

                    {!props.loading && (
                        <SplitButton
                            withOrganizationLink={props.withOrganizationLink}
                            onAddUsersClick={() => setOpened(true)}
                            onCopyOrganizationLinkClick={props.onCopyLinkClick}
                        />
                    )}
                </div>

                <StatsGroup data={[
                    {
                        title: "# OF PEOPLE",
                        value: props.users.length,
                    },
                    {
                        title: "ACCOUNT CREATION",
                        value: props.percentageOfAccountsCreated,
                        unit: "%",
                    },
                    {
                        title: "PERCENTAGE ROSTERED",
                        unit: "%",
                        value: props.percentageRostered,
                    },
                ]}/>

                <div className="relative">
                    <IconSearch size={16} stroke={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for a people in your organization"
                        onChange={(e) => props.onAutocompleteChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-dark-blue-400 placeholder:text-slate-400 focus:border-sky-blue-400 focus:outline-none"
                    />
                </div>

                <Table
                    loading={props.loading}
                    items={props.users}
                    onDelete={props.onDeleteUser}
                    onRoleChange={props.onChangeUserRole}
                />
            </div>
        </>
    )
}

const DropzoneButton = (props: PeopleProps & {close: () => void}) => {
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
                complete: function(results: ParseResult<UserItem>) {
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
        <div className="relative mb-8">
            <Dropzone
                loading={loading}
                openRef={openRef}
                onDrop={onDrop}
                radius="md"
                className="border pb-12"
                accept={[MIME_TYPES.csv]}
                maxSize={5 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <Dropzone.Accept>
                            <IconDownload size={50} color="#1EE2AF" stroke={1.5} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={50} color="#ef4444" stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload size={50} color="#232A3A" stroke={1.5} />
                        </Dropzone.Idle>
                    </Group>

                    <p className="mt-6 text-center text-lg font-bold text-dark-blue-400">
                        <Dropzone.Accept>Drop files here</Dropzone.Accept>
                        <Dropzone.Reject>Csv file less than 5mb</Dropzone.Reject>
                        <Dropzone.Idle>Upload multiple</Dropzone.Idle>
                    </p>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that
                        are less than 5mb in size.
                    </p>
                </div>
            </Dropzone>

            <button
                type="button"
                onClick={() => openRef.current?.()}
                className="absolute bottom-[-20px] left-1/2 w-[250px] -translate-x-1/2 rounded-full bg-dark-blue-400 px-6 py-2.5 text-xs font-bold text-white"
            >
                Select file
            </button>
        </div>
    );
}
