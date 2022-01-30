import React  from "react";
import {Icon} from "../icon";

/**
 * DateWidgetProps
 */
export interface DateWidgetProps{
    month: Date | null
    day: Date | null
    onSetDay: (day: Date | null) => void;
}

/**
 * DateWidget
 */
export const DateWidget = (props: DateWidgetProps) => {
    const weekdays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]
    const today = new Date()
    const [day, setDay] = React.useState(props.day)
    const [month, setMonth] = React.useState(day || props.month || new Date(today.getFullYear(), today.getMonth(), 1))
    const [start, end] = getRange(month)
    const days = []
    const onDayClick = (cur: Date) => {
        if(day && isSameDay(day, cur)){
            setDay(null)
            props.onSetDay(null)
            return
        }

        setDay(cur)
        props.onSetDay(cur)
    }

    for (let cur = start; cur <= end; cur = new Date(cur.getFullYear(), cur.getMonth(), cur.getDate() + 1)){
        const base = "w-8 h-8 text-center cursor-pointer p-2 hover:text-white hover:font-semibold hover:bg-sky-400"
        const currentMonth = day && isSameDay(day, cur) ? "text-white font-semibold bg-sky-400" : isSameDay(today, cur) ? "font-semibold bg-slate-100 rounded-full" : cur.getMonth() === month.getMonth() ? "text-slate-500 font-semibold" : "text-slate-400"
        const className = [base, currentMonth].join(" ")
        days.push(<span onClick={() => onDayClick(cur)} className={className}>
                { cur.getDate() }
            </span>
        )
    }

    return (
        <article className="border-gray-200 border shadow-sm rounded-md min-h-48 lg:w-60 w-full overflow-hidden">
            <div className="p-2 bg-gray-200" />
            <div className="min-h-60">
                <div className="p-2 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="grow">
                            <h4 className="capitalize align-middle font-semibold text-slate-600 inline-block">
                                Calendar
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="p-2 mt-2">
                    <div className="flex items-center">
                        <div className="grow">
                            <span className="font-semibold text-md text-slate-300">
                                {Intl.DateTimeFormat("en-US", {
                                    month: "long",
                                }).format(month)}
                            </span>
                            <span className="text-md ml-1 text-slate-300">
                                {Intl.DateTimeFormat("en-US", {
                                    year: "numeric"
                                }).format(month)}
                            </span>
                        </div>
                        <Icon onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="cursor-pointer w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500" icon="leftArrow"/>
                        <Icon onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="cursor-pointer ml-2 w-3 h-3 min-w-3 fill-slate-300 stroke-slate-300 hover:stroke-slate-500 hover:fill-slate-500" icon="rightArrow"/>
                    </div>

                    <div className="mt-4 grid grid-cols-7 gap-1 text-xs justify-items-center">
                        {
                            weekdays.map((day, i) => {
                                return <span key={day + i} className="w-8 text-center text-slate-400">
                                    {day}
                                </span>
                            })
                        }

                        { days }
                    </div>
                </div>
            </div>
        </article>
    )
}

const getRange = (month: Date, weeks = 6) => {
    const bom = new Date(month.getFullYear(), month.getMonth(), 1)
    const start = new Date(bom.getFullYear(), bom.getMonth(), bom.getDate() - bom.getDay())
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + weeks * 7 - 1)
    return [start, end]
}

const isSameDay = (compare: Date, to: Date) => {
    return compare.getFullYear() === to.getFullYear() &&
        compare.getMonth() === to.getMonth() &&
        compare.getDate() === to.getDate()
}