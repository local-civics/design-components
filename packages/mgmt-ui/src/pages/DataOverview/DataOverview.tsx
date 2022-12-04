import * as React             from 'react';
import {PlaceholderBanner}    from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {AreaChart, DataPoint} from "../../components/data/AreaChart/AreaChart";
import {StatsGrid}            from "../../components/data/StatsGrid/StatsGrid";

/**
 * DataOverviewPoint
 */
export type DataOverviewPoint = DataPoint

/**
 * DataOverviewProps
 */
export type DataOverviewProps = {
    loading: boolean
    metric: string
    points: DataOverviewPoint[]
    problemsSolved: number
    problemsSolvedDiff: number
    lessonsCompleted: number
    lessonsCompletedDiff: number
    badgesCompleted: number
    badgesCompletedDiff: number

    onMetricChange: (next: string) => void
}

/**
 * DataOverview
 * @param props
 * @constructor
 */
export const DataOverview = (props: DataOverviewProps) => {
    if(props.loading || !props.problemsSolved){
        return <PlaceholderBanner
            loading={props.loading}
            title="No data for period"
            icon="dashboard"
            description="We haven't received any data during this period. Check back later once progress has been made."
        />
    }

    return <>
        <StatsGrid data={[
            {
                title: "PROBLEMS SOLVED",
                value: props.problemsSolved,
                diff: props.problemsSolvedDiff,
            },
            {
                title: "LESSONS COMPLETED",
                value: props.lessonsCompleted,
                diff: props.lessonsCompletedDiff,
            },
            {
                title: "BADGES EARNED",
                value: props.badgesCompleted,
                diff: props.badgesCompletedDiff,
            },
        ]}/>

        <AreaChart
            metric={props.metric}
            points={props.points}
            onMetricChange={props.onMetricChange}
        />
    </>
}