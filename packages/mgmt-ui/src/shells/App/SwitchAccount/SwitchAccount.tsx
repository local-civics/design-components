import {useForm}               from "@mantine/form";
import * as React                     from 'react';
import {Modal, Select, Button, Title} from '@mantine/core';

/**
 * AccountItem
 */
export type AccountItem = {
    accountId: string
    name: string
}

/**
 * SwitchAccountProps
 */
export type SwitchAccountProps = {
    opened: boolean
    account: string
    accounts: AccountItem[]
    onChange: (account: string) => void;
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
            active: props.account,
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
                defaultValue={props.account}
                data={props.accounts.map(a => { return {value: a.accountId, label: a.name}})}
                {...form.getInputProps("active")}
            />
            <Button type="submit" fullWidth mt="xl">
                Switch
            </Button>
        </form>
    </Modal>
}