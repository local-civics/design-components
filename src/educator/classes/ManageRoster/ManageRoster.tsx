import * as React       from "react"
import {Icon}           from "../../../components/Icon/Icon";
import {onScrollBottom}          from "../../../utils/pagination";
import {AddStudents, NewStudent} from "./AddStudents/AddStudents";
import {RemoveStudent}           from "./RemoveStudent/RemoveStudent";

/**
 * ManageRoster
 */
export type ManageRosterProps = {
    loading?: React.ReactNode
    displayName?: string
    grade?: string
    subject?: string
    size?: number
    roster?: ManagedStudent[]

    onSearch?: (value: string) => void;
    onAddStudents?: (students: NewStudent[]) => Promise<void>;
    onRemoveStudent?: (student: ManagedStudent) => Promise<void>;
    onCopyClassLink?: () => void;
    onMoreStudents?: () => void;
}

/**
 * ManagedStudent
 */
export type ManagedStudent = {
    studentId?: string
    displayName?: string
    avatarURL?: string
    email?: string
    lastActivity?: string
    grade?: string
    online?: boolean
}


/**
 * ManageRoster
 * @param props
 * @constructor
 */
export const ManageRoster = (props: ManageRosterProps) => {
    const roster = props.roster || []
    const [createStudent, setAddStudents] = React.useState(false)
    const [activeId, setActiveId] = React.useState("")

    return <>
        { createStudent && <AddStudents
            onCancel={() => setAddStudents(false)}
            onSubmit={(students) => {
                props.onAddStudents && props.onAddStudents(students)
                setAddStudents(false)
            }}
        /> }
        <img className="object-cover sticky z-[2] top-0 w-full h-28 border-gray-300 border-x-2" alt="Abstract" src="https://cdn.localcivics.io/abs/abstract1.jpg"/>
        <div onClick={() => setActiveId("")} className="text-gray-600 h-full pb-10">
            <div className="relative bg-white flex sticky z-[2] top-28 border-x-2 border-b-2 rounded-bl-md rounded-br-lg border-gray-300 px-5 py-8">
                <div className="flex gap-x-2">
                    <div className="w-9 h-9">
                        <Icon title="Students" name="apple" />
                    </div>
                    <p className="text-3xl my-auto font-bold">{props.displayName}</p>
                    <div className="flex ml-10 my-auto text-sm gap-x-6">
                        { props.grade && <div>
                            <span className="font-bold mr-1">Grade</span>
                            <span>{props.grade}</span>
                        </div>}

                        { props.subject && <div>
                            <span className="font-bold mr-1">Subject</span>
                            <span>{props.subject}</span>
                        </div>}

                        { props.size && <div>
                            <span className="font-bold mr-1">Students</span>
                            <span className="text-green-500">{props.size}</span>
                        </div>}
                    </div>
                </div>
                { !props.loading && <button
                    onClick={() => setAddStudents(true)}
                    className="ml-auto py-2.5 px-5 rounded-md text-white flex gap-x-2 text-gray-500 hover:text-gray-600">
                    <div className="my-auto w-5 h-5">
                         <Icon title="Add students" name="plus & circle" />
                    </div>

                    <div className="my-auto">
                        <p className="text-sm text-left">Add Students</p>
                    </div>
                </button> }
            </div>

            { props.loading }

            { !props.loading && <>
                <div className="flex w-full mt-10 py-5">
                    <div className="flex gap-x-5 ml-auto">
                        <button type="button" onClick={props.onCopyClassLink} className="flex gap-x-1 text-sm">
                            <div className="mt-0.5 w-5 h-5">
                                <Icon title="Class Invite Link" name="link"/>
                            </div>
                            <p className="my-auto">Copy Class Link</p>
                        </button>
                    </div>
                </div>

                <div className="h-full">
                    <div className="relative h-full max-h-96 w-full overflow-y-auto" onScroll={onScrollBottom(props.onMoreStudents)}>
                        <table className="w-full">
                            <thead className="text-left sticky top-0 bg-gray-50 p-2 z-[1]">
                                <th className="w-4/12 p-5 rounded-tl-md ellipsis">Student</th>
                                <th className="w-2/12">Last Seen</th>
                                <th className="w-1/12">Grade</th>
                                <th></th>
                                <th className="w-1/12 p-5 rounded-tr-md"></th>
                            </thead>
                            <tbody>
                                { roster.length > 0 && roster.map((o, i) => <StudentItem
                                        key={o.studentId}
                                        {...props}
                                        {...o}
                                        number={i}
                                        activeId={activeId}
                                        setActiveId={setActiveId}
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>}
        </div>
  </>
}

type StudentItemProps = ManageRosterProps & ManagedStudent & {
    number: number
    activeId?: string;
    setActiveId: (activeId: string) => void;
}

const StudentItem = (props: StudentItemProps) => {
    const alt = props.number % 2 === 0 ? "bg-gray-100" : ""

    return <tr className={`p-2 w-full text-gray-600 border-b border-gray-100 ${alt}`}>
        <td className="px-5">
            <div className="flex gap-x-2">
                <div className="flex rounded-md w-max">
                    <div className="my-auto w-8 h-8">
                        <img className="object-contain rounded-full"
                             referrerPolicy="no-referrer"
                             alt={props.displayName}
                             src={props.avatarURL}
                        />
                    </div>
                </div>

                <div className="my-auto">
                    <p className="w-max text-md font-bold">{props.displayName}</p>
                    <div className="flex gap-x-2 text-sm">
                        <span className="my-auto">{props.email}</span>
                    </div>
                </div>
            </div>
        </td>

        <td>{lastSeen(props.lastActivity)}</td>
        <td>{props.grade}</td>

        <td></td>
        <td>
            <div className="h-full flex items-center gap-x-4">
                {AltStudentAction(props)}
            </div>
        </td>
    </tr>
}

const AltStudentAction = (c: StudentItemProps) => {
    const [modal, setModal] = React.useState(null as React.ReactNode)

    const confirmRemove = () => {
        setModal(<RemoveStudent
            displayName={c.displayName}
            onCancel={() => setModal(null)}
            onSubmit={() => {
                if(c.onRemoveStudent){
                    return c.onRemoveStudent(c)
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
        <div onClick={stopPropagation} className="relative my-auto">
            <div onClick={confirmRemove} className="text-center cursor-pointer py-2.5 p-1 rounded-md w-max text-gray-500 hover:text-gray-600">
                <div className="mx-auto w-6 h-6">
                    <Icon title="Remove Student" name="formal pencil" />
                </div>
                <p className="text-sm w-20">Remove Student</p>
            </div>
        </div>
    </>
}

const lastSeen = (lastActivity?: string) => {
    if(!lastActivity){
        return null
    }

    const activityDate = new Date(lastActivity)
    const now = new Date()
    const diff = now.getTime() - activityDate.getTime()

    switch (true){
    case diff < 5 * 60 * 1000:
        return "5 mins ago"
    case diff < 15 * 60 * 1000:
        return "15 mins ago"
    case diff < 30 * 60 * 1000:
        return "30 mins ago"
    case diff < 45 * 60 * 1000:
        return "45 mins ago"
    case diff < 60 * 60 * 1000:
        return "60 mins ago"
    case diff < 90 * 60 * 1000:
        return "> 90 mins ago"
    }

    return "Inactive"
}