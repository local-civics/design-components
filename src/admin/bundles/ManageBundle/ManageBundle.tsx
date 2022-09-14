import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";
import {ConfirmDialog}   from "../../components/ConfirmDialog/ConfirmDialog";
import {FormDialog}      from "../../components/Form/FormDialog/FormDialog";
import {Icon}            from "../../components/Icon/Icon";

/**
 * ManageBundleProps
 */
export type ManageBundleProps = {
    bundleId?: string
    displayName?: string
    installed?: boolean
    description?: string
    workspace?: boolean

    onDelete?: () => Promise<void>;
    onInstall?: () => Promise<void>;
    onUninstall?: () => Promise<void>;
    onCancel?: () => void;
    onFinish?: () => void;
}

/**
 * ManageBundle
 * @param props
 * @constructor
 */
export const ManageBundle = (props: ManageBundleProps) => {
    const [success, setSuccess] = React.useState(false)
    const [confirmDelete, setConfirmDelete] = React.useState(false)
    const title = props.workspace ? "Manage bundle" : props.installed ? "Uninstall bundle" : "Install bundle"
    const commandPastTense = props.workspace ? "deleted" : props.installed ? "uninstalled" : "installed"
    const commandPresentTense = props.workspace ? "delete" : props.installed ? "uninstall" : "install"
    const commandColor = props.workspace ? "bg-rose-400 hover:bg-rose-500" : props.installed ? "bg-rose-400 hover:bg-rose-500" : "bg-indigo-500 hover:bg-indigo-600"

    const onCommand = async () => {
        switch (commandPresentTense){
        case "delete":
            setConfirmDelete(true)
            break
        case "install":
            if(props.onInstall){
                return props.onInstall().then(() => setSuccess(true))
            }
            break
        case "uninstall":
            if(props.onUninstall){
                return props.onUninstall().then(() => setSuccess(true))
            }
            break
        }
    }

    const onFinish = () => {
        setSuccess(false)
        props.onFinish && props.onFinish()
    }

    return <Overlay onClick={props.onCancel}>
        { confirmDelete && <ConfirmDialog
            title="Delete bundle?"
            description="This action is permanent and cannot be reversed."
            action="Delete"
            actionColor="bg-rose-500 hover:bg-rose-600"
            onCancel={() => setConfirmDelete(false)}
            onContinue={() => {
                setConfirmDelete(false)
                if(props.onDelete){
                    return props.onDelete().then(() => setSuccess(true))
                }
            }}
        />}

        { success && <FormDialog
            onClose={onFinish}
            title={`Bundle ${commandPastTense}!`}
            description={`We've received your request to ${commandPresentTense} the bundle. Please allow up to 5 mins. for changes to complete.`}
        /> }

        { !success && !confirmDelete && <div onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-zinc-600 min-w-[30rem]">
            <h1 className="text-xl my-auto grow font-bold">{title}</h1>
            <div className="flex gap-x-4">
                <div className="flex shrink-0 bg-zinc-100 rounded-md p-8">
                    <div className="shrink-0 my-auto w-10 h-10">
                        <Icon title={props.displayName} name="apps"/>
                    </div>
                </div>
                <div className="flex flex-col my-auto">
                    <p className="text-lg font-bold">{props.displayName}</p>
                    <div className="flex gap-x-2 text-xs">
                        <span className="my-auto">Bundle ID</span>
                        <span className="my-auto bg-zinc-50 p-1 rounded-sm">{props.bundleId}</span>
                    </div>
                    <p className="text-sm mt-2 max-w-md text-zinc-400">{props.description||"No description provided"}</p>
                </div>
            </div>

            <div className="flex" onClick={stopPropagation}>
                <div className="flex ml-auto gap-x-2">
                    <button type="button" onClick={props.onCancel} className="rounded-md border border-zinc-200 w-30 px-6 py-1.5 hover:bg-zinc-100">Cancel</button>
                    <button type="button" onClick={onCommand} className={`rounded-md flex gap-x-2 w-30 text-white px-6 py-1.5 disabled:bg-inherit disabled:border disabled:border-zinc-200 disabled:text-zinc-600 disabled:hover:bg-inherit ${commandColor}`}>
                        <span className="my-auto capitalize">{commandPresentTense}</span>
                    </button>
                </div>
            </div>
        </div> }
    </Overlay>
}