import * as React       from "react"
import {Icon}           from "../../../components/Icon/Icon";
import {onScrollBottom} from "../../../utils/pagination";
import {CreateClass} from "../CreateClass/CreateClass";
import {RemoveClass} from "../RemoveClass/RemoveClass";
import {LoaderIcon} from "../../../components";

/**
 * ListClasses
 */
export type ListClassesProps = {
    isLoading?: boolean
    classes?: Class[]

    onClassClick?: (cls: Class) => void;
    onCreateClass?: (displayName: string) => Promise<void>;
    onRemoveClass?: (cls: Class) => Promise<void>;
    onMoreClasses?: () => void;
}

/**
 * Class
 */
export type Class = {
    classId?: string
    displayName?: string
}


/**
 * ListClasses
 * @param props
 * @constructor
 */
export const ListClasses = (props: ListClassesProps) => {
    const classes = props.classes || []
    const [createClass, setCreateClass] = React.useState(false)
    const [activeId, setActiveId] = React.useState("")

    return <>
        { createClass && <CreateClass
            onCancel={() => setCreateClass(false)}
            onSubmit={(displayName) => {
                props.onCreateClass && props.onCreateClass(displayName)
                setCreateClass(false)
            }}
        /> }
        <div onClick={() => setActiveId("")} className="text-gray-600 h-full pb-10">
            <div className="flex bg-white sticky z-[2] top-0 border-gray-200 py-8">
                <div className="flex gap-x-2">
                    <div className="w-8 h-8">
                        <Icon title="Classes" name="formal group" />
                    </div>
                    <p className="text-xl font-bold">Classes</p>
                </div>
                { !props.isLoading && <button
                    onClick={() => setCreateClass(true)}
                    className="ml-auto py-2.5 px-5 rounded-md text-white flex gap-x-2 text-gray-500 hover:text-gray-600">
                    <div className="my-auto w-4 h-4">
                         <Icon title="Add class" name="plus & circle" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Add Class</p>
                    </div>
                </button> }
            </div>

            { props.isLoading && <div className="flex h-full pb-16"><div className="m-auto w-6 h-6 stroke-gray-400"><LoaderIcon  /></div></div> }

            { !props.isLoading && <>
                <div className="h-full pb-16">
                    <div className="relative flex gap-y-4 flex-col overflow-hidden max-h-full w-full">
                        { classes.length > 0 && <div className="overflow-y-auto" onScroll={onScrollBottom(props.onMoreClasses)}>
                            { classes.map(o => <ClassItem
                                    key={o.classId}
                                    {...props}
                                    {...o}
                                    activeId={activeId}
                                    setActiveId={setActiveId}
                                />
                            )}
                        </div>}
                    </div>
                </div>
            </>}
        </div>
  </>
}

type ClassItemProps = ListClassesProps & Class & {
    activeId?: string;
    setActiveId: (activeId: string) => void;
}

const ClassItem = (props: ClassItemProps) => {
    const onClick = () => props.onClassClick && props.onClassClick(props)
    return <button onClick={onClick} className="p-2 w-full border-b border-gray-100 hover:bg-gray-50 active:bg-gray-50">
        <div className="flex gap-x-4 text-gray-600">
            <div className="my-auto">
                <p className="w-max text-lg font-bold">{props.displayName}</p>
            </div>

            <div className="flex ml-auto items-center gap-x-4">
                {AltClassAction(props)}
            </div>
        </div>
    </button>
}

const AltClassAction = (c: ClassItemProps) => {
    const [modal, setModal] = React.useState(null as React.ReactNode)

    const confirmRemove = () => {
        setModal(<RemoveClass
            displayName={c.displayName}
            onCancel={() => setModal(null)}
            onSubmit={() => {
                if(c.onRemoveClass){
                    return c.onRemoveClass(c)
                }
                setModal(null)
            }}
        />)
    }

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    return <>
        {modal}
        <div onClick={stopPropagation} className="relative">
            <div onClick={confirmRemove} className="cursor-pointer p-1 rounded-md w-max text-gray-500 hover:text-gray-600">
                <div className="mx-auto w-6 h-6">
                    <Icon title="Remove class" name="formal pencil" />
                </div>
                <p className="text-sm w-20">Remove class</p>
            </div>
        </div>
    </>
}