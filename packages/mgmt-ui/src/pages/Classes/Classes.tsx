import {IconInfoCircle, IconPlaylistAdd, IconSearch} from "@tabler/icons";
import {useState} from "react";
import * as React from 'react';
import {
    Title,
    Drawer,
    TextInput, ActionIcon,
    Tooltip, Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {StatsGroup} from "../../components/data/StatsGroup/StatsGroup";
import {Table, Item} from "./Table";

/**
 * ClassItem
 */
export type ClassItem = Item

/**
 * ClassesProps
 */
export type ClassesProps = {
    loading: boolean
    classes: ClassItem[]

    onCreateClass:  (group: ClassItem) => void
    onDeleteClass:  (group: ClassItem) => void
    onAutocompleteChange: (next: string) => void
}

/**
 * Classes
 * @param props
 * @constructor
 */
export const Classes = (props: ClassesProps) => {
    const form = useForm({
        initialValues: {
            classId: '',
            name: '',
            description: '',
            href: '',
            numberOfStudents: 0,
        },

        validate: {
            name: (val) => (val.length <= 6 ? 'Name should include at least 6 characters' : null),
        },
    });
    const [opened, setOpened] = useState(false);
    return (
        <>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                title={<Group spacing={0}>
                    <Title size="h5">Create a class</Title>
                    <Tooltip label="Classes settings cannot be modified once created">
                        <ActionIcon>
                            <IconInfoCircle color="#3b82f6" size={14} />
                        </ActionIcon>
                    </Tooltip>
                </Group>}
                padding="xl"
                size="xl"
            >
                <form onSubmit={form.onSubmit(() => {
                    const values = form.values
                    form.reset()
                    setOpened(false)
                    props.onCreateClass && props.onCreateClass(values)
                })}>
                    <div className="flex flex-col gap-3">
                        <TextInput
                            withAsterisk
                            label="Name"
                            placeholder="Class name"
                            {...form.getInputProps('name')}
                        />
                        <TextInput
                            label="Description"
                            placeholder="A class for my first period English students"
                            {...form.getInputProps('description')}
                        />
                        <button
                            type="submit"
                            className="mt-2 rounded-lg bg-dark-blue-400 px-4 py-2.5 text-xs font-bold text-white"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Drawer>

            <div className="flex flex-col gap-5 px-4 py-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-1.5">
                        <h1 className="text-2xl font-extrabold tracking-tight text-dark-blue-400">Organize people into classes</h1>
                        <p className="max-w-xl text-sm text-slate-500">Create classes, cohorts, or custom subgroups</p>
                    </div>

                    {!props.loading && (
                        <button
                            type="button"
                            onClick={() => setOpened(true)}
                            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-gold-400 to-[#f5c300] px-3.5 py-2 text-xs font-bold text-dark-blue-400 shadow-[0_3px_12px_rgba(255,212,77,0.35)]"
                        >
                            <IconPlaylistAdd size={13} stroke={2} />
                            Create class
                        </button>
                    )}
                </div>

                <StatsGroup data={[
                    {
                        title: "# OF CLASSES",
                        value: props.classes.length,
                    },
                ]}/>

                <div className="relative">
                    <IconSearch size={16} stroke={2} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for classes"
                        onChange={(e) => props.onAutocompleteChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-dark-blue-400 placeholder:text-slate-400 focus:border-sky-blue-400 focus:outline-none"
                    />
                </div>

                <Table
                    loading={props.loading}
                    items={props.classes}
                    onDeleteClass={props.onDeleteClass}
                />
            </div>
        </>
    )
}
