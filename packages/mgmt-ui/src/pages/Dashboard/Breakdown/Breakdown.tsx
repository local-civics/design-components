import {Paper, Grid, ActionIcon, Title, Tooltip, Group, Select, Stack} from "@mantine/core";
import {IconInfoCircle}                                                       from "@tabler/icons";
import * as React                                                             from 'react';
import {BreakdownUserTable}                                                            from "./BreakdownUserTable";

/**
 * BreakdownData
 */
export interface BreakdownData {
    metric: string
    users: { name: string; email: string; value: number }[],
}

/**
 * BreakdownProps
 */
export interface BreakdownProps{
    data: BreakdownData

    onMetricChange: (next: string) => void
}

/**
 * Breakdown
 * @param props
 * @constructor
 */
export const Breakdown = (props: BreakdownProps) => {
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
                    value={props.data.metric}
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

            <BreakdownUserTable data={props.data.users}/>
        </Stack>
    </Paper>
}