import React     from "react";
import {Icon}    from "../icon";

/**
 * TagWidgetProps
 */
export interface TagWidgetProps{
    tags: string[] | null
    onTagClick: (tags: string[]) => void;
    className?: string
}

/**
 * TagWidget
 * @param props
 * @constructor
 */
export const TagWidget = (props: TagWidgetProps) => {
    const timeTags = [
        "time:morning",
        "time:afternoon",
        "time:evening",
        "time:weekend",
    ]

    const skillTags = [
        "skill:leadership",
        "skill:speaking",
        "skill:group",
        "skill:navigation",
    ]

    const locationTags = [
        "location:online",
        "location:in-person",
        "location:at school",
        "location:community",
    ]

    const init: Record<string, boolean> = {}
    props.tags?.map((tag) => {
        init[tag] = true
    })

    const [active, setActive] = React.useState(init)
    const onTagClick = (tag: string) => {
        if(active[tag]){
            setActive({...active, [tag]: false})
        } else {
            setActive({...active, [tag]: true})
        }
    }

    React.useEffect(() => {
        const tags = Object.entries(active).filter(([, active]) => active).map(([tag, ]) => tag)
        props.onTagClick(tags)
    }, [active])

    return <article className={["w-full", props.className || ""].join(" ")}>
        <div className="grow p-5 shadow-sm rounded-md bg-sky-100">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                <div>
                    <Icon className="inline-block w-4 h-4 max-w-4 stroke-gray-600 fill-gray-600" icon="clock"/>
                    <span className="ml-2 text-gray-600 font-semibold">Time</span>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        {
                            timeTags.map((tag, i) => {
                                const base = "cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md capitalize hover:text-gray-600 hover:bg-gray-50 active:bg-gray-50 px-4 py-2 text-xs"
                                const bg = active[tag] ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600"
                                const className = [base, bg].join(" ")
                                return <button onClick={() => onTagClick(tag)} key={tag + i} className={className}> {tag.replace("time:", "")} </button>
                            })
                        }
                    </div>
                </div>

                <div>
                    <Icon className="inline-block w-4 h-4 max-w-4 stroke-gray-600 fill-gray-600" icon="clock"/>
                    <span className="ml-2 text-gray-600 font-semibold">Skills</span>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        {
                            skillTags.map((tag, i) => {
                                const base = "cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md capitalize hover:text-gray-600 hover:bg-gray-50 active:bg-gray-50 px-4 py-2 text-xs"
                                const bg = active[tag] ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600"
                                const className = [base, bg].join(" ")
                                return <button onClick={() => onTagClick(tag)} key={tag + i} className={className}> {tag.replace("skill:", "")} </button>
                            })
                        }
                    </div>
                </div>

                <div>
                    <Icon className="inline-block w-4 h-4 max-w-4 stroke-gray-600 fill-gray-600" icon="pin"/>
                    <span className="ml-2 text-gray-600 font-semibold">Location</span>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        {
                            locationTags.map((tag, i) => {
                                const base = "cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md capitalize hover:text-gray-600 hover:bg-gray-50 active:bg-gray-50 px-4 py-2 text-xs"
                                const bg = active[tag] ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600"
                                const className = [base, bg].join(" ")
                                return <button onClick={() => onTagClick(tag)} key={tag + i} className={className}> {tag.replace("location:", "")} </button>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </article>
}