import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";
import {FormInput}       from "../../components/Form/FormInput/FormInput";
import {Icon}            from "../../components/Icon/Icon";
import {AddRequirement}  from "./AddRequirement/AddRequirement";

/**
 * ManageCriteria
 */
export type ManageCriteriaProps = {
    criteria?: ManagedCriteria
    onCriteriaChange?: (criteria: ManagedCriteria) => void
}

/**
 *
 */
export type ManagedCriteria = ManagedRequirement[]

/**
 * ManagedRequirement
 */
export type ManagedRequirement = {
    displayName?: string
    tags?: string[]
    skills?: string[]
    activityIds?: string[]
}


/**
 * ManageCriteria
 * @param props
 * @constructor
 */
export const ManageCriteria = (props: ManageCriteriaProps) => {
    const [criteria, setCriteria] = React.useState(props.criteria || [])
    const criteriaKey = JSON.stringify(criteria)
    const [createRequirement, setAddRequirement] = React.useState(false)
    const [activeNumber, setActiveNumber] = React.useState(-1)
    const [requirementPreview, setRequirementPreview] = React.useState(null as React.ReactNode)
    const onRequirementPreviewClick = (r: ManagedRequirement) => setRequirementPreview(<RequirementPreview
        {...r}
        onCancel={onRequirementPreviewCancel}
    />)
    const onRequirementPreviewCancel = () => setRequirementPreview(null)

    React.useEffect(() => {
        props.onCriteriaChange && props.onCriteriaChange(criteria)
    }, [criteriaKey])

    return <>
        { createRequirement && <AddRequirement
            onCancel={() => setAddRequirement(false)}
            onSubmit={(displayName: string, tags, skills, activityIds) => {
                const next = [...criteria, {
                    displayName,
                    tags,
                    skills,
                    activityIds,
                }]
                setCriteria(next)
                props.onCriteriaChange && props.onCriteriaChange(next)
                setAddRequirement(false)
            }}
        /> }

        {requirementPreview}

        <div onClick={() => setActiveNumber(-1)} className="text-zinc-600 h-full">
            <div className="flex">
                <button
                    className="ml-auto py-2.5 px-5 rounded-md text-white bg-emerald-500 flex gap-x-2 hover:bg-emerald-600"
                    type="button"
                    onClick={() => setAddRequirement(true)}>
                    <div className="my-auto w-2.5 h-2.5">
                        <Icon title="Add requirement" name="plus" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Add Requirement</p>
                    </div>
                </button>
            </div>

            <div className="h-full mt-5">
                <div className="relative flex flex-col h-full max-h-full w-full">
                    { criteria.length > 0 && criteria.map((r, ri) => <RequirementItem
                            key={r.displayName}
                            {...props}
                            {...r}
                            number={ri}
                            activeNumber={activeNumber}
                            setActiveNumber={setActiveNumber}
                            onRemove={() => {
                                const next = [...criteria]
                                setCriteria(next.filter((_, i) => i !== ri))
                            }}
                            onClick={() => onRequirementPreviewClick(r)}
                        />
                    )}
                </div>
            </div>
        </div>
  </>
}

type RequirementItemProps = ManageCriteriaProps & ManagedRequirement & {
    number: number
    activeNumber?: number;

    setActiveNumber: (activeNumber: number) => void;
    onRemove: () => void
    onClick: () => void
}

const RequirementItem = (props: RequirementItemProps) => {
    return <button type="button" onClick={props.onClick} className="p-2 w-full border-b border-zinc-100 hover:bg-zinc-50 active:bg-zinc-50">
        <div className="flex gap-x-4 text-zinc-600">
            <div className="flex bg-zinc-100 rounded-md px-3 py-2">
                <div className="my-auto w-7 h-7">
                    <Icon title={props.displayName} name="checkbox"/>
                </div>
            </div>

            <p className="my-auto w-max text-md font-bold">{props.displayName}</p>

            <div className="flex ml-auto items-center gap-x-4">
                {More(props)}
            </div>
        </div>
    </button>
}

const More = (r: RequirementItemProps) => {
    const [menu, setMenu] = React.useState(false)
    const [modal, setModal] = React.useState(null as React.ReactNode)

    React.useEffect(() => {
        if(r.activeNumber !== undefined && r.activeNumber !== r.number){
            setMenu(false)
            setModal(null)
        } else if(r.activeNumber === undefined) {
            setMenu(false)
            setModal(null)
        }
    }, [r.activeNumber])

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        if(!menu){
            r.setActiveNumber(r.number)
        } else {
            r.setActiveNumber(-1)
        }
        setMenu(!menu)
    }

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    return <>
        {modal}
        <div onClick={stopPropagation} className="relative">
            {menu && <div className="absolute z-10 top-7 right-0">
                <div className="border mt-1 text-sm shadow-sm grid grid-cols-1 w-60 rounded-md bg-white border-zinc-200 transition ease-in-out duration-600">
                    <ul className="text-left">
                        <li onClick={r.onRemove} className="hover:bg-zinc-100">
                            <p className="p-2">Remove</p>
                        </li>
                    </ul>
                </div>
            </div>}
            <div onClick={toggleMenu} className="cursor-pointer border border-zinc-100 p-1 bg-white hover:bg-zinc-100 rounded-md w-max">
                <div className="my-auto w-4 h-4">
                    <Icon title="More" name="more" />
                </div>
            </div>
        </div>
    </>
}

type RequirementPreviewProps = ManagedRequirement & {
    onCancel?: () => void
}

const RequirementPreview = (props: RequirementPreviewProps) => {
    return <Overlay onClick={props.onCancel}>
        <div onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]">
            <h1 className="text-xl my-auto grow font-bold">{props.displayName}</h1>
            <div className="flex flex-col gap-y-4 max-h-96 overflow-y-auto">
                <FormInput
                    disabled
                    type="tags"
                    displayName="Tags"
                    description="Comma-separated list of tags describing which activity tags qualify for the requirement."
                    tagsValue={props.tags}
                />

                <FormInput
                    disabled
                    type="tags"
                    displayName="Skills"
                    description="Comma-separated list of tags describing which activity skills qualify for the requirement."
                    tagsValue={props.skills}
                />

                <FormInput
                    disabled
                    type="tags"
                    displayName="Activity IDs"
                    description="Comma-separated list of IDs describing which activities qualify for the requirement."
                    tagsValue={props.activityIds}
                />
            </div>
            <div className="flex">
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                </div>
            </div>
        </div>
    </Overlay>
}