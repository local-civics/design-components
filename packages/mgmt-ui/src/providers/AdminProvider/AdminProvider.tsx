import * as React                            from 'react';
import {createEmotionCache, MantineProvider} from '@mantine/core';
import { ModalsProvider }                    from '@mantine/modals';
import {NotificationsProvider} from "@mantine/notifications";

const mycCache = createEmotionCache({
    key: 'mantine',
    prepend: false
});

/**
 * AdminProviderProps
 */
export interface AdminProviderProps {
    notificationLimit?: number
    children: React.ReactNode
}

/**
 * AdminProvider
 * @constructor
 * @param props
 */
export const AdminProvider = (props: AdminProviderProps) => {
    return <MantineProvider
        theme={{
            loader: "bars"
        }}
        withNormalizeCSS withGlobalStyles emotionCache={mycCache}>
        <NotificationsProvider limit={props.notificationLimit || 5}>
            <ModalsProvider>
                { props.children }
            </ModalsProvider>
        </NotificationsProvider>
    </MantineProvider>
}