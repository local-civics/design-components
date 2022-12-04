import {Paper, Grid, ActionIcon, Title, Tooltip, Group, Select, Stack} from "@mantine/core";
import {IconInfoCircle}                                                from "@tabler/icons";
import * as React                                                      from 'react';
import {
    PlaceholderBanner
}                                                                      from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {Table}                                                         from "./Table";

/**
 * DataBreakdownPoint
 */
export type DataBreakdownPoint = {
    name: string;
    email: string;
    value: number
}

/**
 * DataBreakdownProps
 */
export type DataBreakdownProps = {
    loading: boolean
    metric: string
    points: DataBreakdownPoint[],

    onMetricChange: (next: string) => void
}

/**
 * DataBreakdown
 * @param props
 * @constructor
 */
export const DataBreakdown = (props: DataBreakdownProps) => {
    if(props.loading || props.points.length === 0){
        return <PlaceholderBanner
            loading={props.loading}
            title="No data for period"
            icon="dashboard"
            description="We haven't received any data during this period. Check back later once progress has been made."
        />
    }


    return <Paper mih={150} p="lg" withBorder>
        <Stack>
            <Grid>
                <Grid.Col sm="auto">
                    <Group spacing={0}>
                        <Title size="h5" mb={0}>Performance History</Title>
                        <Tooltip label="Shows group performance per person">
                            <ActionIcon>
                                <IconInfoCircle color="#3b82f6" size={14} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Grid.Col>
            </Grid>

            <Group spacing="sm">
                <Select
                    placeholder="Select a metric"
                    value={props.metric}
                    onChange={props.onMetricChange}
                    data={
                        [{
                            label: "PROBLEMS SOLVED",
                            value: "PROBLEMS SOLVED",
                        },{
                            label: "LESSONS COMPLETED",
                            value: "LESSONS COMPLETED",
                        },{
                            label: "BADGES EARNED",
                            value: "BADGES EARNED",
                        }]
                    }
                />
            </Group>

            <Table items={props.points}/>
        </Stack>
    </Paper>
}