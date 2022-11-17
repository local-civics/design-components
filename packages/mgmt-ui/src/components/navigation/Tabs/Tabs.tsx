import * as React                    from 'react';
import {Tabs as TabsCore, TabsValue} from '@mantine/core';

/**
 * TabProps
 */
export interface TabsProps{
    data?: {label?: string, value: string}[]
    value?: TabsValue

    onChange: (next: string) => void
}

/**
 * Tabs
 * @param props
 * @constructor
 */
export const Tabs = (props: TabsProps) => {
    const tabs = props.data?.map(item => <TabsCore.Tab key={item.value} value={item.value}>{item.label||item.value}</TabsCore.Tab>)

    return (
        <TabsCore value={props.value} onTabChange={props.onChange}>
            <TabsCore.List>
                {tabs}
            </TabsCore.List>
        </TabsCore>
    );
}