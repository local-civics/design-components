import * as React                                               from 'react';
import {IconCalendar, IconCategory2}                            from "@tabler/icons";
import {Container, Grid, Select, Stack, TabsValue, Text, Title} from '@mantine/core';
import {DateRangePicker, DateRangePickerValue}                  from '@mantine/dates';
import {Tabs}                     from "../../components/navigation/Tabs/Tabs";
import {Breakdown, BreakdownData} from "./Breakdown/Breakdown";
import {Overview, OverviewData}   from "./Overview/Overview";

const tabsData = [{value: "Overview"}, {value: "Breakdown"}]

/**
 * DashboardData
 */
export interface DashboardData{
    dateRange: DateRangePickerValue
    overview: OverviewData
    breakdown: BreakdownData
    groups: {name: string, active?: boolean}[]
    tab: TabsValue
}

/**
 * DashboardProps
 */
export interface DashboardProps {
    data: DashboardData

    onBreakdownMetricChange: (next: string) => void;
    onDateRangeChange: (next: DateRangePickerValue) => void
    onGroupChange: (next: string) => void;
    onOverviewMetricChange: (next: string) => void;
    onTabChange: (next: TabsValue) => void;
}

/**
 * Dashboard
 * @param props
 * @constructor
 */
export const Dashboard = (props: DashboardProps) => {
    const breakdown = useBreakdown(props.data.breakdown, props.onBreakdownMetricChange)
    const dateRange = useDateRange(props.data.dateRange, props.onDateRangeChange)
    const groups = useGroups(props.data.groups, props.onGroupChange)
    const overview = useOverview(props.data.overview, props.onOverviewMetricChange)
    const tabs = useTabs(props.data.tab, props.onTabChange)

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
                        value={groups.select}
                        onChange={groups.onSelectChange}
                        icon={<IconCategory2/>}
                        data={props.data.groups.map(g => g.name)}
                    />
                </Grid.Col>
                <Grid.Col sm="auto">
                    <DateRangePicker
                        placeholder="Select a date"
                        allowSingleDateInRange
                        value={dateRange.value}
                        onChange={dateRange.onChange}
                        icon={<IconCalendar size={16} />}
                    />
                </Grid.Col>
            </Grid>
            <Stack>
                <Tabs
                    data={tabsData}
                    value={tabs.value}
                    onChange={tabs.onChange}
                />
                <TabBody
                    {...props}
                    data={{...props.data, overview: overview.data, breakdown: breakdown.data}}
                    active={tabs.value}
                    onBreakdownMetricChange={breakdown.onMetricChange}
                    onOverviewMetricChange={overview.onMetricChange}
                />
            </Stack>
        </Stack>
    </Container>
}

const TabBody = (props: DashboardProps & {active: TabsValue}) => {
    switch (props.active){
    case 'Overview':
        return <Overview
            data={props.data.overview}
            onMetricChange={props.onOverviewMetricChange}
        />
    case 'Breakdown':
        return <Breakdown
            data={props.data.breakdown}
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