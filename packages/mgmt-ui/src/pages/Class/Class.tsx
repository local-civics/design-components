import {IconArrowLeft, IconCloudUpload, IconDownload, IconLink, IconPlus, IconX} from "@tabler/icons";
import {ParseResult} from "papaparse";
import {useState} from "react";
import * as React from 'react';
import {
    Drawer,
    Button, TextInput,
    Group, Divider,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import * as papa from 'papaparse'
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {Table, Item} from "./Table";

/**
 * MemberItem
 */
export type MemberItem = Item

/**
 * ClassProps
 */
export type ClassProps = {
    loading: boolean
    displayName: string
    description: string
    members: MemberItem[]
    percentageOfAccountsCreated: number
    numberOfBadgesEarned: number
    numberOfLessonsCompleted: number

    onBackClick: () => void;
    onCreateMembers: (members: MemberItem[]) => void;
    onDeleteMember: (student: MemberItem) => void;
    onChangeUserRole: (user: MemberItem, role: string | null) => void;
    onCopyLinkClick: () => void;
    onExportDataClick: () => void;

}

/**
 * Class. Chrome (header, actions, stat bar, table) is restyled to match the redesigned educator
 * sidebar/shell; the Add Students drawer (CSV bulk upload + manual entry) and its underlying
 * `onCreateMembers`/Dropzone/form logic are unchanged from before this round.
 * @param props
 * @constructor
 */
export const Class = (props: ClassProps) => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title="Add students"
                padding="xl"
                size="xl"
            >
                <DropzoneButton {...props} close={() => setOpened(false)} />
            </Drawer>

            <div className="mx-auto flex max-w-5xl flex-col gap-5 px-4 py-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                        <div onClick={props.onBackClick} className="flex w-max cursor-pointer items-center gap-1 text-xs font-bold text-sky-blue-400">
                            <IconArrowLeft size={13} stroke={2.5} />
                            Back
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">{props.displayName || "Class"}</h1>
                        <p className="text-sm text-slate-500">{props.description || "No description"}</p>
                    </div>

                    {!props.loading && (
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setOpened(true)}
                                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                            >
                                <IconPlus size={13} stroke={2} />
                                Add students
                            </button>
                            <button
                                type="button"
                                onClick={props.onCopyLinkClick}
                                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                            >
                                <IconLink size={13} stroke={2} />
                                Copy class link
                            </button>
                            <button
                                type="button"
                                onClick={props.onExportDataClick}
                                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3.5 py-2 text-xs font-bold text-dark-blue-400 shadow-[0_3px_12px_rgba(255,212,77,0.35)]"
                            >
                                <IconDownload size={13} stroke={2} />
                                Export data (.csv)
                            </button>
                        </div>
                    )}
                </div>

                <StatsGroup data={[
                    {
                        title: "# OF STUDENTS",
                        value: props.members.filter(a => !a.isAdmin).length,
                    },
                    {
                        title: "ACCOUNT CREATION",
                        value: props.percentageOfAccountsCreated,
                        unit: "%",
                    },
                    {
                        title: "BADGES EARNED",
                        value: props.numberOfBadgesEarned,
                    },
                    {
                        title: "LESSONS COMPLETED",
                        value: props.numberOfLessonsCompleted,
                    },
                ]}/>

                <Table
                    loading={props.loading}
                    items={props.members}
                    onDelete={props.onDeleteMember}
                    onRoleChange={props.onChangeUserRole}
                />
            </div>
        </>
    )
}

const DropzoneButton = (props: ClassProps & {close: () => void}) => {
    const form = useForm({
        initialValues: {
            classId: '',
            userId: '',
            email: '',
            givenName: '',
            familyName: '',
            avatar: '',
            role: '',
            readonly: false,
            lastActivity: null,
            hasAccount: false,
            lessonsCompleted: 0,
            badgesEarned: 0,
            href: "",
            isAdmin: false,
        },

        validate: {
            email: (value) => /^\S+@\S+$/.test(value) && props.members.filter(u => u.email === value).length === 0 ? null : 'Invalid email',
        },
    });
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
                complete: function(results: ParseResult<MemberItem>) {
                    const data = results.data
                        .filter(v => /^\S+@\S+$/.test(v.email) && props.members.filter(u => u.email === v.email).length === 0)
                    data.length > 0 && props.onCreateMembers && props.onCreateMembers(data)
                    setLoading(false)
                    props.close()
                }
            })
        })

    }, [])

    return (
        <div className="flex flex-col gap-4">
            <Dropzone
                loading={loading}
                openRef={openRef}
                onDrop={onDrop}
                accept={[MIME_TYPES.csv]}
                maxSize={5 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <IconCloudUpload size={50} stroke={1.5} />
                    </Group>

                    <p className="mt-6 text-center text-lg font-bold text-dark-blue-400">Upload multiple</p>
                    <p className="mt-2 text-center text-sm text-slate-400">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that
                        are less than 5mb in size.
                    </p>
                </div>
            </Dropzone>

            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => openRef.current?.()}
                    className="rounded-full bg-dark-blue-400 px-6 py-2.5 text-xs font-bold text-white"
                >
                    Select file
                </button>
            </div>

            <Divider label="or" labelPosition="center" my="md" variant="dashed"/>

            <form onSubmit={form.onSubmit(() => {
                const values = form.values
                form.reset()
                props.close()
                props.onCreateMembers && props.onCreateMembers([values])
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
    );
}
