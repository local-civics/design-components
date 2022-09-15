import * as React        from "react"
import {Overlay}         from "../../../components";
import {stopPropagation} from "../../../utils/event";

const MIN_DISPLAY_NAME_LENGTH = 5

/**
 * CreateClassProps
 */
export type CreateClassProps = {
    onSubmit?: (displayName: string, description: string, gradeLevel: string, subject: string) => void;
    onCancel?: () => void;
}

/**
 * CreateClass
 * @param props
 * @constructor
 */
export const CreateClass = (props: CreateClassProps) => {
    const [displayName, setDisplayName] = React.useState("")
    const [gradeLevel, setGradeLevel] = React.useState("")
    const [subject, setSubject] = React.useState("")
    const [description, setDescription] = React.useState("")

    const submitDisabled = !displayName || displayName.length < MIN_DISPLAY_NAME_LENGTH
    const onDisplayNameChange = (value: string) => setDisplayName(value.trim())
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(props.onSubmit && displayName){
            props.onSubmit(displayName, description, gradeLevel, subject)
        }
    }

    return <Overlay onClick={props.onCancel}>
        <form onClick={stopPropagation} className="bg-white p-5 grid grid-cols-1 gap-y-4 rounded-md m-auto text-gray-600 min-w-[40rem]" onSubmit={onSubmit}>
            <h1 className="text-xl my-auto grow font-bold border-b border-gray-300 pb-5">Class Creator</h1>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12 mt-2">
                <label>
                    <div className="flex gap-x-1">
                        <span className="text-gray-700">Class Name</span>
                        <span className="text-xs my-auto">(Required)</span>
                    </div>
                    <input
                        className="w-full rounded-md py-1 px-2 border border-gray-300"
                        required
                        value={displayName}
                        minLength={MIN_DISPLAY_NAME_LENGTH}
                        onChange={(e) => onDisplayNameChange(e.target.value)}
                    />
                </label>

                <label>
                    <p className="text-gray-700">Description</p>
                    <textarea
                        className="w-full rounded-md py-1 px-2 border border-gray-300"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <label>
                    <p className="text-gray-700">Grade Level</p>
                    <select
                            className="w-full appearance-none rounded-md py-1 px-2 border border-gray-300"
                            value={gradeLevel}
                            onChange={(e) => setGradeLevel(e.target.value)}>
                        <option>Select a grade</option>
                        <option value="K">Kindergarten</option>
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                        <option value="5">5th</option>
                        <option value="6">6th</option>
                        <option value="7">7th</option>
                        <option value="8">8th</option>
                        <option value="9">9th</option>
                        <option value="10">10th</option>
                        <option value="11">11th</option>
                        <option value="12">12th</option>
                    </select>
                </label>

                <label>
                    <p className="text-gray-700">Subject</p>
                    <select
                        className="w-full appearance-none rounded-md py-1 px-2 border border-gray-300"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option>Select a subject</option>
                        <option value="social-studies-teacher">Social Studies Teacher</option>
                        <option value="english-teacher">English Teacher</option>
                        <option value="math-teacher">Math Teacher</option>
                        <option value="science-teacher">Science Teacher</option>
                        <option value="special-education-teacher">Special Education Teacher (Generalist)</option>
                        <option value="counseling-or-college-and-career">Counseling/College & Career Readiness</option>
                        <option value="non-instructional-staff">Non-Instructional Staff</option>
                        <option value="school-leadership">School Leadership</option>
                    </select>
                </label>
            </div>

            <div className="flex mt-8">
                <div className="flex ml-auto gap-x-2">
                    <button disabled={submitDisabled} type="submit" className="rounded-md flex gap-x-2 w-30 text-white bg-blue-600 px-6 py-3 disabled:bg-inherit disabled:border disabled:border-gray-300 disabled:text-gray-600 disabled:hover:bg-inherit">
                        <span className="my-auto">Create Class</span>
                    </button>
                </div>
            </div>
        </form>
    </Overlay>
}