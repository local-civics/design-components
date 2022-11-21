import * as React              from 'react';
import { MantineProvider }     from '@mantine/core';
import { ModalsProvider }      from '@mantine/modals';
import {NotificationsProvider} from "@mantine/notifications";

/**
 * MgmtProviderProps
 */
export interface MgmtProviderProps {
    notificationLimit?: number
    children?: React.ReactNode
}

/**
 * MgmtProvider
 * @constructor
 * @param props
 */
export const MgmtProvider = (props: MgmtProviderProps) => {
    return <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider limit={props.notificationLimit || 5}>
            <ModalsProvider>
                { props.children }
            </ModalsProvider>
        </NotificationsProvider>
    </MantineProvider>
}