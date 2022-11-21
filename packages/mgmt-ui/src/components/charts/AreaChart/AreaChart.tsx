import {IconInfoCircle} from "@tabler/icons";
import * as React       from 'react';
import {
    ActionIcon,
    Paper,
    createStyles,
    Grid, Group,
    Tooltip as TooltipCore,
    Title, Stack, Select
} from "@mantine/core";
import {
    AreaChart as AreaChartCore,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
}                                                                                               from 'recharts';

const useStyles = createStyles((theme) => ({
    axis: {
        fontSize: '12px',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

/**
 * AreaChartProps
 */
export interface AreaChartProps {
    data: {
        points: {name: string, value: number}[]
        metric: string
    }

    onMetricChange: (next: string) => void
}

/**
 * AreaChart
 * @param props
 * @constructor
 */
export const AreaChart = (props: AreaChartProps) => {
    const { theme } = useStyles();
    return <Paper p="lg" withBorder>
        <Stack>
            <Grid>
                <Grid.Col sm="auto">
                    <Group spacing={0}>
                        <Title size="h5" mb={0}>Performance History</Title>
                        <TooltipCore label="Shows daily increase or decrease across group">
                            <ActionIcon>
                                <IconInfoCircle color="#3b82f6" size={14} />
                            </ActionIcon>
                        </TooltipCore>
                    </Group>
                </Grid.Col>
                <Grid.Col sm={5}>
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
                </Grid.Col>
            </Grid>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChartCore width={730} height={250} data={props.data.points}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis tick={{fontSize: 12, fontFamily: theme.fontFamily}} dataKey="name"/>
                    <YAxis tick={{fontSize: 12, fontFamily: theme.fontFamily}}/>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                    />
                    <Tooltip contentStyle={{fontWeight: 700, fontSize: 12, fontFamily: theme.fontFamily}} labelStyle={{fontSize: 12, fontFamily: theme.fontFamily}} />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBlue)" />
                </AreaChartCore>
            </ResponsiveContainer>
        </Stack>
    </Paper>;
}