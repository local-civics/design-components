import * as React             from 'react';
import {PlaceholderBanner}    from "../../components/banners/PlaceholderBanner/PlaceholderBanner";
import {AreaChart, DataPoint} from "../../components/data/AreaChart/AreaChart";

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
    onMetricChange: (metric: string) => void
}

/**
 * DataOverview
 * @param props
 * @constructor
 */
export const DataOverview = (props: DataOverviewProps) => {
    if(props.loading){
        return <PlaceholderBanner loading={props.loading} icon="dashboard"/>
    }

    return <>
        <AreaChart
            metric={props.metric}
            points={props.points}
            onMetricChange={props.onMetricChange}
        />
    </>
}