import {useRef, useState}                                   from "react";
import * as React                                           from 'react';
import {Anchor, Timeline as TimelineCore, Text, ScrollArea} from '@mantine/core';
import {
    IconSchool,
    IconBadges, IconActivityHeartbeat, IconTimelineEvent
}                                                           from '@tabler/icons';
import {relativeTimeFromDates}                              from "../../../utils/time";

const ICONS: {[key: string]: React.ReactNode} = {
    "BadgeCompleted": <IconBadges size={12}/>,
    "BadgeStarted": <IconBadges size={12}/>,
    "LessonCompleted": <IconSchool size={12}/>,
    "LessonStarted": <IconSchool size={12}/>,
    "ProblemSolved": <IconActivityHeartbeat size={12}/>,
}

interface TimelineProps {
    data: {key: string, name: string, link?: string, description: string, time: string}[]
    onScrollBottom: () => void;
}

/**
 * Timeline
 * @param props
 * @constructor
 */
export const Timeline = (props: TimelineProps) => {
    const viewport = useRef<HTMLDivElement>(null);
    const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        if(!viewport.current){
            return
        }

        if(scrollPosition.y === (viewport.current.scrollHeight - viewport.current.offsetHeight)){
            props.onScrollBottom && props.onScrollBottom()
        }
    }, [scrollPosition.y])

    let prev: string
    const items = props.data.map(item => {
        const namespace = item.name.split(/(?=[A-Z])/)
        const lineVariant = namespace[0] === prev ? "dashed" : "solid"
        prev = namespace[0]
        const title = item.link ?  <Anchor color="dark" unstyled href={item.link} target="_blank">
            {`${namespace[0]} ${namespace[1].toLowerCase()}`}
        </Anchor> : `${namespace[0]} ${namespace[1].toLowerCase()}`

        return <TimelineCore.Item
            key={item.key}
            bullet={namedIcon(item.name)}
            lineVariant={lineVariant}
            title={title}>
                <Text color="dimmed" size="sm">{item.description}</Text>
                <Text size="xs" mt={4}>{relativeTimeFromDates(new Date(item.time))}</Text>
        </TimelineCore.Item>
    })

    return (
        <ScrollArea.Autosize maxHeight={300} onScrollPositionChange={onScrollPositionChange} viewportRef={viewport}>
            <TimelineCore ml="lg" active={1} bulletSize={24} lineWidth={2}>
                {items}
            </TimelineCore>
        </ScrollArea.Autosize>
    );
}

const namedIcon = (name: string) => {
    const icon = ICONS[name]
    if(icon){
        return icon
    }
    return <IconTimelineEvent size={12}/>
}