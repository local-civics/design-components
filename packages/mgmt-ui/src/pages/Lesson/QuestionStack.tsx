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
 * this restyle - only the surrounding card chrome moved from Mantine to Tailwind.
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

    if (props.items.length === 0) {
        return <PlaceholderBanner
            title="No questions to display"
            description="There are no questions in this lesson."
            loading={props.loading}
            icon="lessons"
        />
    }

    return (
        <div className="flex flex-col gap-3">
            {props.items.map((row) => {
                if (row.chart) {
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
                }

                return (
                    <div key={row.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="text-base font-extrabold text-dark-blue-400">{row.question}</div>
                        <div className="mt-1 text-xs text-slate-500">{row.answers.length} answers</div>

                        <div className="mt-4 flex flex-col gap-2">
                            {row.answers.map(a => {
                                const answerText = a.join("\n")
                                return (
                                    <div key={answerText} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                                        {answerText}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const truncateWithEllipses = (text: string, max: number) => text.substr(0,max-1)+(text.length>max?'&hellip;':'')
