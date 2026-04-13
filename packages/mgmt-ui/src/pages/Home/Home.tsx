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
    organization: {name: string, description: string, image: string, website: string, accessCode: string}

    onDashboardClick: () => void;
    onClassesClick: () => void;
    onPathwaysClick: () => void;
    onBadgesClick: () => void;
    onLessonsClick: () => void;
    onFileLockerClick: () => void;

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
                        code={props.organization.accessCode}
                    />
                </Grid.Col>
            </Grid>

            <Grid gutter="md">
                <Grid.Col>
                    <CardGradient
                        title="Dashboard"
                        description="Track your students’ pathway progress"
                        onClick={props.onDashboardClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="Classes"
                        description="Create classes, cohorts, or custom subgroups"
                        onClick={props.onClassesClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="Pathways"
                        description="Explore all your unique pathway requirements in one clear space"
                        onClick={props.onPathwaysClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="Badges"
                        description="Key milestones that reflect skill development, micro-credentials, or academic progress"
                        onClick={props.onBadgesClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="Lessons"
                        description="Bite-sized activities and learning experiences accelerating students achievement"
                        onClick={props.onLessonsClick}
                    />
                </Grid.Col>
                <Grid.Col>
                    <CardGradient
                        title="File Locker"
                        description="A secure space to view student-submitted work and provide feedback"
                        onClick={props.onFileLockerClick}
                    />
                </Grid.Col>
            </Grid>
        </Stack>
    </Container>
}