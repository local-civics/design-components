import {IconInfoCircle} from "@tabler/icons";
import dayjs           from "dayjs";
import * as React       from 'react';
import {
    ActionIcon,
    Paper,
    createStyles,
    Group,
    Tooltip as TooltipCore,
    Title, Stack
}                          from "@mantine/core";
import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
}                          from 'recharts';
import {PlaceholderBanner} from "../../banners/PlaceholderBanner/PlaceholderBanner";

const useStyles = createStyles((theme) => ({
    axis: {
        fontSize: '12px',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

/**
 * DataPoint
 */
export type DataPoint = {
    time: string
}

/**
 * ChartProps
 */
export interface LineChartProps {
    points: DataPoint[]
}

/**
 * LineChart
 * @param props
 * @constructor
 */
export const LineChart = (props: LineChartProps) => {
    const { theme } = useStyles();
    const points = groupedPoints(props.points)

    if(points.length === 0){
        return <PlaceholderBanner icon="dashboard" loading={false}/>
    }

    return <Paper p="lg" withBorder>
        <Stack spacing={40}>
            <Group spacing={0}>
                <Title weight={500} color="gray" size="h5" mb={0}>Daily Lesson Completion</Title>
                <TooltipCore label="Shows aggregated performance history for period">
                    <ActionIcon>
                        <IconInfoCircle color="#3b82f6" size={14} />
                    </ActionIcon>
                </TooltipCore>
            </Group>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart width={730} height={250} data={points}
                               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis
                        style={{fontSize: 14, fontFamily: theme.fontFamily}}
                        tick={{fontSize: 12, fontFamily: theme.fontFamily}}
                        axisLine={false}
                        tickLine={false}
                        interval={Math.floor(points.length/7)}
                        dataKey="time"
                        tickFormatter={timeStr => dayjs(timeStr).format('MMM D')}
                    />
                    <YAxis
                        style={{fontSize: 14, fontFamily: theme.fontFamily}}
                        dataKey="total"
                        tick={{fontSize: 12, fontFamily: theme.fontFamily}}
                        axisLine={false}
                        tickLine={false}
                    />
                    <CartesianGrid
                        horizontal={true}
                        vertical={false}
                    />
                    <Tooltip contentStyle={{fontWeight: 700, fontSize: 12, fontFamily: theme.fontFamily}} labelStyle={{fontSize: 12, fontFamily: theme.fontFamily}} />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                </RechartsLineChart>
            </ResponsiveContainer>
        </Stack>
    </Paper>;
}

const groupBy = function<TItem>(xs: TItem[], key: keyof TItem): {[key: string]: TItem[]} {
    return xs.reduce(function(rv: any, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const groupedPoints = (points: DataPoint[]) => {
    const groupedBy = groupBy(points.map((point: any) => {
        return {
            ...point,
            day: dayjs(point.time).format('YYYY-MM-DD'),
        }
    }), "day")

    const ans: any = []
    Object.keys(groupedBy).forEach(k => {
        ans.push({
            time: k,
            total: groupedBy[k].length,
        })
    })

    return ans.sort((a: any, b: any) => a.time < b.time ? -1 : 1)
}