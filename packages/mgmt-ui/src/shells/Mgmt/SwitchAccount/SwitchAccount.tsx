import {useForm}               from "@mantine/form";
import * as React                     from 'react';
import {Modal, Select, Button, Title} from '@mantine/core';

/**
 * AccountData
 */
export interface AccountData{
    active: string
    accounts: {key: string, name: string}[]
}

/**
 * SwitchAccountProps
 */
export interface SwitchAccountProps {
    opened: boolean
    data: AccountData

    onChange: (next: string) => void;
    onClose: () => void;
}

/**
 * SwitchAccount
 * @param props
 * @constructor
 */
export const SwitchAccount = (props: SwitchAccountProps) => {
    const form = useForm({
        initialValues: {
            active: props.data.active,
        },
    });

    return <Modal centered
                  opened={props.opened}
                  onClose={() => props.onClose && props.onClose()}
                  size="sm"
                  title={<Title size="h5">Accounts</Title>}
    >
        <form onSubmit={form.onSubmit(() => {
            props.onChange && props.onChange(form.values.active)
        })}>
            <Select
                required
                placeholder="Select an account"
                defaultValue={props.data.active}
                data={props.data.accounts.map(a => { return {value: a.key, label: a.name}})}
                {...form.getInputProps("active")}
            />
            <Button type="submit" fullWidth mt="xl">
                Switch
            </Button>
        </form>
    </Modal>
}