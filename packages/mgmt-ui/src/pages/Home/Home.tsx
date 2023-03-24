import * as React               from 'react';
import {Container, Grid, Stack} from '@mantine/core';
import {CardGradient}           from "../../components/cards/CardGradient";
import {UserInfo}               from "../../components/users/UserInfo/UserInfo";
import {TenantBanner}           from "../../components/banners/TenantBanner/TenantBanner";

/**
 * HomeProps
 */
export type HomeProps = {
    loading: boolean
    avatarURL: string
    name: string
    impactStatement: string
    organization: {name: string, description: string, image: string, website: string}

    onDashboardClick: () => void;
    onClassesClick: () => void;
    onLessonsClick: () => void;
    onBadgesClick: () => void;
}

/**
 * Home
 * @param props
 * @constructor
 */
export const Home = (props: HomeProps) => {
    return <Container size="lg">
        <Stack spacing="lg">
            <Grid gutter="md">
                <Grid.Col md={6}>
                    <UserInfo
                        variant="compact"
                        name={props.name}
                        impactStatement={props.impactStatement}
                    />
                </Grid.Col>
                <Grid.Col md={6}>
                    <TenantBanner
                        title={props.organization.name}
                        description={props.organization.description}
                        image={props.organization.image}
                    />
                </Grid.Col>
            </Grid>

            <Grid gutter="md">
                <Grid.Col>
                    <CardGradient
                        title="Dashboard"
                        description="Track class performance across core areas of focus."
                        onClick={props.onDashboardClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="Classes"
                        description="Organize people into classes."
                        onClick={props.onClassesClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="Lessons"
                        description="Explore units of instruction and/or see corresponding class progress."
                        onClick={props.onLessonsClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="Badges"
                        description="Project-sized skills acquisition and standards alignment."
                        onClick={props.onBadgesClick}
                    />
                </Grid.Col>
            </Grid>
        </Stack>
    </Container>
}