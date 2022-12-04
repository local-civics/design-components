import * as React                                               from 'react';
import {IconCalendar, IconCategory2}                                            from "@tabler/icons";
import {Container, Grid, LoadingOverlay, Select, Stack, TabsValue, Text, Title} from '@mantine/core';
import {DateRangePicker, DateRangePickerValue}                                  from '@mantine/dates';
import {
    PlaceholderBanner
}                                                               from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Tabs}                                                   from "../../components/navigation/Tabs/Tabs";
import {Breakdown, BreakdownData}                               from "./Breakdown/Breakdown";
import {Overview, OverviewData}                                 from "./Overview/Overview";

const tabsData = [{value: "Overview"}, {value: "Breakdown"}]


/**
 * DashboardData
 */
export type DashboardData = {
    loading: boolean
    dateRange: DateRangePickerValue
    overview: OverviewData
    breakdown: BreakdownData
    group: string
    groups: {name: string, active?: boolean}[]
    tab: TabsValue
}

/**
 * DashboardMethods
 */
export type DashboardMethods = {
    onBreakdownMetricChange: (next: string) => void;
    onDateRangeChange: (next: DateRangePickerValue) => void
    onGroupChange: (next: string) => void;
    onOverviewMetricChange: (next: string) => void;
    onTabChange: (next: TabsValue) => void;
}

/**
 * DashboardProps
 */
export type DashboardProps = DashboardData & DashboardMethods

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
                    data={tabsData}
                    value={props.tab}
                    onChange={props.onTabChange}
                />

                <div style={{ position: 'relative' }}>
                    <LoadingOverlay visible={props.loading} overlayBlur={2} />
                    <TabBody
                        {...props}
                        active={props.tab}
                        onBreakdownMetricChange={props.onBreakdownMetricChange}
                        onOverviewMetricChange={props.onOverviewMetricChange}
                    />
                </div>
            </Stack>
        </Stack>
    </Container>
}

const TabBody = (props: DashboardProps & {active: TabsValue}) => {
    if(props.overview.stats["PROBLEMS SOLVED"].value === 0){
        return <PlaceholderBanner
            loading={props.loading}
            data={{
                title: "No data for period",
                icon: "dashboard",
                description: "We haven't received any data yet for your group during this period. Check back later once progress has been made."
            }}
        />
    }


    switch (props.active){
    case 'Overview':
        return <Overview
            data={props.overview}
            onMetricChange={props.onOverviewMetricChange}
        />
    case 'Breakdown':
        return <Breakdown
            data={props.breakdown}
            onMetricChange={props.onBreakdownMetricChange}
        />
    default:
        return null
    }
}

const useBreakdown = (initialState: BreakdownData, onMetricChange: (next: string) => void) => {
    const [metric, setMetric] = React.useState(initialState.metric);
    return {
        data: {
            ...initialState,
            metric,
        },
        onMetricChange: (next: string) => {
            setMetric(next)
            onMetricChange && onMetricChange(next)
        }
    }
}

const useDateRange = (initialState: DateRangePickerValue, onDateRangeChange: (next: DateRangePickerValue) => void) => {
    const [dateRange, setDateRange] = React.useState<DateRangePickerValue>(initialState);

    return {
        value: dateRange,
        onChange: (next: DateRangePickerValue) => {
            setDateRange(next)
            onDateRangeChange && onDateRangeChange(next)
        }
    }
}

const useGroups = (initialState: {name: string, active?: boolean}[], onGroupChange: (next: string) => void) => {
    const active = initialState.filter(g => g.active)
    const [group, setGroup] = React.useState(active.length > 0 ? active[0].name : null)

    return {
        select: group,
        onSelectChange: (next: string) => {
            setGroup(next)
            onGroupChange && onGroupChange(next)
        }
    }
}

const useOverview = (initialState: OverviewData, onMetricChange: (next: string) => void) => {
    const [metric, setMetric] = React.useState(initialState.areaChart.metric);
    return {
        data: {
          ...initialState,
          areaChart: {
              ...initialState.areaChart,
              metric,
          },
        },
        onMetricChange: (next: string) => {
            setMetric(next)
            onMetricChange && onMetricChange(next)
        }
    }
}

const useTabs = (initialState: TabsValue, onTabChange: (next: TabsValue) => void) => {
    const [tab, setTab] = React.useState<TabsValue>(initialState);

    return {
        value: tab,
        onChange: (next: TabsValue) => {
            setTab(next)
            onTabChange && onTabChange(next)
        }
    }
}