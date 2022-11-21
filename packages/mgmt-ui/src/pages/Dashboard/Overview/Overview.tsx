import * as React      from 'react';
import {AreaChart}     from "../../../components/charts/AreaChart/AreaChart";
import {StatsGrid}     from "../../../components/stats/StatsGrid/StatsGrid";

/**
 * OverviewData
 */
export interface OverviewData {
    stats: {
        "PROBLEMS SOLVED": {
            value: number
            diff: number
        },
        "LESSONS COMPLETED": {
            value: number
            diff: number
        },
        "BADGES EARNED": {
            value: number
            diff: number
        },
    },
    areaChart: {
        metric: string
        points: {name: string, value: number}[]
    }
}

/**
 * OverviewProps
 */
export interface OverviewProps{
    data: OverviewData

    onMetricChange: (next: string) => void
}

/**
 * Overview
 * @param props
 * @constructor
 */
export const Overview = (props: OverviewProps) => {
    return <>
        <StatsGrid data={[
            {
                title: "PROBLEMS SOLVED",
                value: props.data.stats["PROBLEMS SOLVED"].value,
                diff: props.data.stats["PROBLEMS SOLVED"].diff,
            },
            {
                title: "LESSONS COMPLETED",
                value: props.data.stats["LESSONS COMPLETED"].value,
                diff: props.data.stats["LESSONS COMPLETED"].diff,
            },
            {
                title: "BADGES EARNED",
                value: props.data.stats["BADGES EARNED"].value,
                diff: props.data.stats["BADGES EARNED"].diff,
            },
        ]}/>

        <AreaChart
            data={props.data.areaChart}
            onMetricChange={props.onMetricChange}
        />
    </>
}