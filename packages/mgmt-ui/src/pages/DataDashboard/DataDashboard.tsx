import * as React                                               from 'react';
import {IconCalendar, IconCategory2}                                            from "@tabler/icons";
import {Container, Grid, LoadingOverlay, Select, Stack, TabsValue, Text, Title} from '@mantine/core';
import {DateRangePicker, DateRangePickerValue}                                  from '@mantine/dates';
import {Tabs}                                                   from "../../components/navigation/Tabs/Tabs";

const tabs = [{value: "Overview"}, {value: "Breakdown"}]

/**
 * DataGroup
 */
export type DataGroup = {
    name: string,
    active: boolean
}

/**
 * DataDashboardProps
 */
export type DataDashboardProps = {
    loading: boolean
    group: string
    tab: string
    body: React.ReactNode
    metric: string
    dateRange: DateRangePickerValue
    groups: DataGroup[]

    onDateRangeChange: (dateRange: DateRangePickerValue) => void
    onGroupChange: (group: string) => void;
    onTabChange: (tab: TabsValue) => void;
}

/**
 * DataDashboard
 * @param props
 * @constructor
 */
export const DataDashboard = (props: DataDashboardProps) => {
    return <Container size="lg" py="xl">
        <Stack>
            <Grid>
                <Grid.Col sm="auto">
                    <Title size="h3">Dashboard</Title>
                    <Text color="dimmed" size="sm" mt="md">
                        View core metrics on the state of your groups.
                    </Text>
                </Grid.Col>
                <Grid.Col sm={2.5}>
                    <Select
                        placeholder="Select a group"
                        nothingFound="No options"
                        value={props.group}
                        onChange={props.onGroupChange}
                        icon={<IconCategory2/>}
                        data={props.groups.map(g => g.name)}
                    />
                </Grid.Col>
                <Grid.Col sm="auto">
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
                <Tabs
                    data={tabs}
                    value={props.tab}
                    onChange={props.onTabChange}
                />

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    { props.body }
                </div>
            </Stack>
        </Stack>
    </Container>
}