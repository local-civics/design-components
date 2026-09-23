import * as React from 'react';
import {Chart, AxisOptions} from "react-charts";
import {PlaceholderBanner} from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    question: string
    answers: string[][]
    choices?: string[]
    chart?: boolean
}

/**
 * StackData
 */
export type StackData = {
    loading: boolean
    items: Item[]
}

/**
 * StackProps
 */
export type StackProps = StackData

/**
 * Stack. Chart rendering (react-charts) and its answer-tallying logic are unchanged from before
 * this restyle - only the surrounding card chrome moved from Mantine to Tailwind. This tab is
 * scoped to multiple-choice questions only, per direct decision - its old free-response branch
 * (a raw, unattributed list of every answer to an open-ended question) was strictly worse than
 * what "By student" already shows for the same data (the same raw answers, at least attributed to
 * a specific student), so it was dropped rather than kept as a redundant second place to see it.
 * The chart itself has no equivalent elsewhere - an aggregate answer-choice distribution can't be
 * reconstructed from a per-student view - so this tab stays, just narrower than before.
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    const primaryAxis = React.useMemo<
        AxisOptions<{primary: string, secondary: string}>
        >(
        () => ({
            position: "left",
            getValue: (datum) => datum.primary,
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<{primary: string, secondary: string}>[]
        >(
        () => [
            {
                position: "bottom",
                getValue: (datum) => datum.secondary,
            },
        ],
        []
    );

    const chartItems = props.items.filter((row) => row.chart)

    if (chartItems.length === 0) {
        return <PlaceholderBanner
            title="No multiple-choice questions"
            description="This lesson doesn't have any multiple-choice questions to chart."
            loading={props.loading}
            icon="lessons"
        />
    }

    return (
        <div className="flex flex-col gap-3">
            {chartItems.map((row) => {
                const labelMap: any = {}
                const choices = row.choices || []
                choices.forEach(c => {
                    labelMap[c] = 0
                })

                row.answers.forEach(a => a.forEach(r => {
                    if (r in labelMap) {
                        labelMap[r] = labelMap[r] ? labelMap[r] + 1 : 1
                    }
                }))

                return (
                    <div key={row.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-base font-extrabold text-dark-blue-400">{row.question}</div>
                        <div className="mt-1 text-xs text-slate-500">{row.answers.length} answers</div>

                        <div className="relative mt-4 h-[300px] w-full bg-white">
                            <Chart
                                options={{
                                    data: [{
                                        label: '',
                                        data: choices.map(k => {
                                            return {
                                                primary: truncateWithEllipses(k, 50),
                                                secondary: labelMap[k]
                                            }
                                        }),
                                    }],
                                    primaryAxis,
                                    secondaryAxes,
                                }}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const truncateWithEllipses = (text: string, max: number) => text.substr(0,max-1)+(text.length>max?'&hellip;':'')
