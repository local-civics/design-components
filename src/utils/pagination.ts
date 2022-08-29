import {SyntheticEvent} from "react";

export const onScrollBottom = (fn?: () => void) => {
    return (e: SyntheticEvent) => {
        const target = e.target as HTMLDivElement;
        const isBottom = target.scrollHeight - target.scrollTop === target.clientHeight
        if(isBottom && fn){
            fn()
        }
    }
}