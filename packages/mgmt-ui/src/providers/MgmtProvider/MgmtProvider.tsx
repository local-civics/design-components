import * as React                            from 'react';
import {createEmotionCache, MantineProvider} from '@mantine/core';
import { ModalsProvider }                    from '@mantine/modals';
import {NotificationsProvider} from "@mantine/notifications";

const mycCache = createEmotionCache({
    key: 'mantine',
    prepend: false
});


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
    return <MantineProvider withNormalizeCSS withGlobalStyles emotionCache={mycCache} theme={{ loader: 'bars' }}>
        <NotificationsProvider limit={props.notificationLimit || 5}>
            <ModalsProvider>
                { props.children }
            </ModalsProvider>
        </NotificationsProvider>
    </MantineProvider>
}