import * as React        from "react"
import {Overlay}         from "../../../components";
import {Icon}            from "../../../components/Icon/Icon";
import {stopPropagation} from "../../../utils/event";
import * as Papa         from "papaparse"
import {LocalFile}       from "papaparse";

/**
 * AddStudentsProps
 */
export type AddStudentsProps = {
    onSubmit?: (students: NewStudent[]) => void;
    onCancel?: () => void;
}

/**
 * NewStudent
 */
export type NewStudent = {
    givenName?: string
    familyName?: string
    email?: string
}

/**
 * AddStudents
 * @param props
 * @constructor
 */
export const AddStudents = (props: AddStudentsProps) => {
    const [addForm, setAddForm] = React.useState(false as false | React.ReactElement)
    return <Overlay onClick={props.onCancel}>
        { addForm }
        {!addForm && <SelectAddFormat {...props} onSetForm={setAddForm}/> }
    </Overlay>
}

type SelectAddFormatProps = AddStudentsProps & {
    onSetForm: (el: React.ReactElement) => void
}

const SelectAddFormat = (props: SelectAddFormatProps) => {
    return <div onClick={stopPropagation} className="bg-white text-center p-10 grid grid-cols-1 gap-y-1 rounded-md m-auto text-gray-600">
        <div className="w-16 h-16 mx-auto">
            <Icon title="Remove student" name="user" />
        </div>
        <h1 className="text-lg my-auto grow font-bold">Add students</h1>
        <div className="text-md mx-auto w-52">
            <span>Choose between uploading via csv or manually.</span>
        </div>

        <div className="flex mt-5">
            <div className="flex mx-auto gap-x-8">
                <button type="button"
                        className="rounded-md flex gap-x-2 text-white bg-blue-600 px-8 py-1.5 disabled:bg-inherit disabled:border disabled:border-gray-200 disabled:text-gray-600 disabled:hover:bg-inherit"
                        onClick={() => props.onSetForm(<UploadCSV {...props}/>)}
                >
                    <span className="my-auto">Upload CSV</span>
                </button>
                <button type="button"
                        className="rounded-md border text-white border-gray-200 px-8 py-1.5 bg-dark-blue-600"
                        onClick={() => props.onSetForm(<AddManually {...props}/>)}
                >Add Manually</button>
            </div>
        </div>
    </div>
}

const UploadCSV = (props: AddStudentsProps) => {
    const ref = React.useRef<HTMLInputElement>(null)
    const [processing, setProcessing] = React.useState(false)
    const [error, setError] = React.useState(null as React.ReactNode)
    const [success, setSuccess] = React.useState(null as React.ReactNode)

    const onUploadCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProcessing(true)
        setError(null)
        setSuccess(null)
        const target = e.target as HTMLInputElement;
        const file: LocalFile = (target.files as FileList)[0];

        Papa.parse(file, {header: true, skipEmptyLines: true, complete: (results) => {
                console.log(results.errors)
                let err: React.ReactNode
                if(results.errors.length > 0 || results.data.length === 0){
                    err = <span className="text-red-500">Bad CSV, please try again or contact an admin.</span>
                    return
                }

                results.data.forEach((row: any, i) => {
                    if(!row.email || !row.givenName || !row.familyName){
                        if(!err){
                            err = <span className="text-red-500">Bad CSV row on line {i+1}.</span>
                        }
                        return
                    }
                })

                if(err){
                    setError(err)
                } else if(props.onSubmit){
                    props.onSubmit(results.data as NewStudent[])
                    setSuccess(<span>Uploaded {results.data.length} student{results.data.length === 1 ? "" : "s"}.</span>)
                }

        }})
        setProcessing(false)
    };

    return <div onClick={stopPropagation} className="bg-white text-center p-10 grid grid-cols-1 gap-y-1 rounded-md m-auto text-gray-600">
        <div className="w-10 h-10 mx-auto">
            <Icon title="Upload CSV" name="upload" />
        </div>
        <h1 className="text-lg my-auto grow font-bold">Upload CSV</h1>
        <div className="text-sm mx-auto w-52">
            { !error && !success && <span>Select a CSV file to upload your students to this class.</span> }
            { error }
            { success }
        </div>

        <div className="flex mt-5">
            <div className="flex mx-auto gap-x-8">
                <button disabled={processing} onClick={() => ref.current?.click()} type="button" className="rounded-md border border-dotted border-gray-300 w-full flex px-32 py-12 disabled:bg-inherit disabled:border disabled:border-gray-200 disabled:text-gray-600 disabled:hover:bg-inherit">
                    <div className="m-auto flex flex-col h-max w-full">
                        <input
                            ref={ref}
                            onChange={(e) => onUploadCSV(e)}
                            name="avatar"
                            type="file"
                            accept="text/csv"
                            className="absolute invisible"
                        />

                        <div className="mx-auto w-12 h-12">
                            <Icon title="Upload CSV" name="upload alt"/>
                        </div>
                        <p className="mx-auto font-bold">Click to upload</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
}

const AddManually = (props: AddStudentsProps) => {
    const [givenName, setGivenName] = React.useState("")
    const [familyName, setFamilyName] = React.useState("")
    const [email, setEmail] = React.useState("")

    const submitDisabled = !givenName || !familyName || !email
    const onGivenNameChange = (value: string) => setGivenName(value)
    const onFamilyNameChange = (value: string) => setFamilyName(value)
    const onEmailChange = (value: string) => setEmail(value.trim())
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!submitDisabled && props.onSubmit){
            props.onSubmit([{
                givenName,
                familyName,
                email
            }])
        }
    }

    return <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-gray-600 min-w-[30rem]" onSubmit={onSubmit}>
        <h1 className="text-xl my-auto grow font-bold border-b border-gray-300 pb-5">Add Student</h1>

        <div className="grid grid-cols-1 gap-y-8 mt-2">
            <label>
                <div className="flex gap-x-1">
                    <span className="text-gray-700">Given Name</span>
                    <span className="text-xs my-auto">(Required)</span>
                </div>
                <input
                    className="w-full rounded-md py-1 px-2 border border-gray-300"
                    required
                    value={givenName}
                    onChange={(e) => onGivenNameChange(e.target.value)}
                />
            </label>

            <label>
                <div className="flex gap-x-1">
                    <span className="text-gray-700">Family Name</span>
                    <span className="text-xs my-auto">(Required)</span>
                </div>
                <input
                    className="w-full rounded-md py-1 px-2 border border-gray-300"
                    required
                    value={familyName}
                    onChange={(e) => onFamilyNameChange(e.target.value)}
                />
            </label>

            <label>
                <div className="flex gap-x-1">
                    <span className="text-gray-700">Email</span>
                    <span className="text-xs my-auto">(Required)</span>
                </div>
                <input
                    className="w-full rounded-md py-1 px-2 border border-gray-300"
                    required
                    value={email}
                    onChange={(e) => onEmailChange(e.target.value)}
                />
            </label>
        </div>

        <div className="flex mt-8">
            <div className="flex ml-auto gap-x-2">
                <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-blue-600 px-6 py-3 disabled:bg-inherit disabled:border disabled:border-gray-300 disabled:text-gray-600 disabled:hover:bg-inherit">
                    <span className="my-auto">Add Student</span>
                </button>
            </div>
        </div>
    </form>
}