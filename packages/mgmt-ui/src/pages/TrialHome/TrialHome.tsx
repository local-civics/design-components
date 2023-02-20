import * as React                from 'react';
import {Badge, Container, Stack}   from '@mantine/core';
import {BadgeGrid, BadgeGridProps} from "../../components/grid/BadgeGrid/BadgeGrid";
import {UserInfo}                  from "../../components/users/UserInfo/UserInfo";
import {TenantBanner}            from "../../components/banners/TenantBanner/TenantBanner";

/**
 * TrialHomeProps
 */
export type TrialHomeProps = BadgeGridProps & {
    loading: boolean
    name: string
    daysRemaining: number
    upgradeHref: string
}

/**
 * TrialHome
 * @param props
 * @constructor
 */
export const TrialHome = (props: TrialHomeProps) => {
    return <Container size="lg">
        <Badge>{props.daysRemaining} day{props.daysRemaining !== 1 ? "s" : ""} left</Badge>
        <Stack spacing="sm">
            <Stack spacing={0}>
                <UserInfo
                    variant="compact"
                    name={props.name}
                    impactStatement=""
                />
                <TenantBanner
                    title="Trial Account"
                    description="Welcome to Local Civics! You are currently interacting with our trial experience."
                    image="https://cdn.localcivics.io/hub/landing.jpg"
                    action={
                        {
                            label: "UPGRADE NOW",
                            link: props.upgradeHref,
                        }
                    }
                />
            </Stack>
            <BadgeGrid badges={props.badges}/>
        </Stack>
    </Container>
}