import * as React                                                               from 'react';
import {IconCalendar}                                            from "@tabler/icons";
import {Container, Grid, LoadingOverlay, Stack, Text, Title} from '@mantine/core';
import {DateRangePicker, DateRangePickerValue}                                  from '@mantine/dates';
import {
    DataPoint,
    LineChart
}                                                                               from "../../components/data/LineChart/LineChart";

export {DataPoint}

/**
 * DashboardProps
 */
export type DashboardProps = {
    loading: boolean
    body: React.ReactNode
    dateRange: DateRangePickerValue
    points: DataPoint[]

    onDateRangeChange: (dateRange: DateRangePickerValue) => void
}

/**
 * Dashboard
 * @param props
 * @constructor
 */
export const Dashboard = (props: DashboardProps) => {
    return <Container size="lg" py="xl">
        <Stack>
            <Grid>
                <Grid.Col sm="auto">
                    <Title size="h3">Dashboard</Title>
                    <Text color="dimmed" size="sm" mt="md">
                        View core metrics and extract insights.
                    </Text>
                </Grid.Col>
                <Grid.Col sm={2.5}>
                    <DateRangePicker
                        placeholder="Select a date"
                        allowSingleDateInRange
                        value={props.dateRange}
                        onChange={props.onDateRangeChange}
                        icon={<IconCalendar size={16} />}
                    />
                </Grid.Col>
            </Grid>
            <Stack>
                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    <LineChart points={props.points}/>
                </div>
            </Stack>
        </Stack>
    </Container>
}