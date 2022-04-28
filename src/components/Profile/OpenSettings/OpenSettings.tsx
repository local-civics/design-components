import React from "react";
import { Button, Modal } from "../../index";

/**
 * The properties for the edit modal.
 */
export type OpenSettingsProps = {
  tenantName?: string
  givenName?: string
  familyName?: string
  grade?: number
  impactStatement?: string
  avatarURL?: string
  accessToken?: string;
  isLoading?: boolean;
  visible?: boolean;
  onClose?: () => void;
  onSave?: (changes?: {
    name?: string;
    givenName?: string;
    familyName?: string;
    grade?: number;
    subject?: string;
    persona?: string;
    impactStatement?: string;
    interests?: string[];
    avatar?: Blob;
  }) => void;
};

/**
 * A component for viewing/editing resident settings.
 * @param props
 * @constructor
 */
export const OpenSettings = (props: OpenSettingsProps) => {
  // https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update
  const [avatarFile, setAvatarFile] = React.useState(undefined as Blob | undefined);
  const [avatarURL, setAvatarURL] = React.useState(undefined as string | undefined);
  const [tenantName, setResidentName] = React.useState(undefined as string | undefined);
  const [givenName, setGivenName] = React.useState(undefined as string | undefined);
  const [familyName, setFamilyName] = React.useState(undefined as string | undefined);
  const [grade, setGrade] = React.useState(undefined as number | undefined);
  const [impactStatement, setImpactStatement] = React.useState(undefined as string | undefined);
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setAvatarURL(reader.result);
        setAvatarFile(file);
      }
    };
    reader.readAsDataURL(file);
  };
  const hasChanges =
    (tenantName && tenantName !== props.tenantName) ||
    (givenName && givenName !== props.givenName) ||
    (familyName && familyName !== props.familyName) ||
    (grade && grade !== props.grade) ||
    (impactStatement && impactStatement !== props.impactStatement) ||
    (avatarURL && avatarURL !== props.avatarURL);

  const onSave = () =>
    hasChanges &&
    props.onSave &&
    props.onSave({
      name: tenantName,
      givenName: givenName,
      familyName: familyName,
      grade: grade,
      impactStatement: impactStatement,
      avatar: avatarFile,
    });

  return (
    <Modal isLoading={props.isLoading} visible={props.visible} onClose={props.onClose}>
      <div className="grid grid-cols-1 gap-2 -mt-4 md:w-[30rem]">
        <p className="text-sm font-semibold text-slate-500 mb-2 px-2">Settings</p>

        <div className="grid grid-cols-1 pb-4 px-6 gap-6">
          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              <img
                className="h-16 w-16 object-cover rounded-full"
                src={avatarURL || props.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg"}
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                onChange={(e) => onAvatarChange(e)}
                name="avatar"
                type="file"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 h-[18rem] md:h-[24rem] px-1 overflow-y-scroll">
            <div>
              <p className="mb-2 font-semibold text-slate-500 text-sm">Username</p>
              <input
                min={6}
                max={30}
                onChange={(e) => setResidentName(e.target.value)}
                defaultValue={props.tenantName}
                className="w-full mt-1 block px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>

            <div>
              <p className="mb-2 w-full font-semibold text-slate-500 text-sm">First Name</p>
              <input
                onChange={(e) => setGivenName(e.target.value)}
                defaultValue={props.givenName}
                className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-semibold text-slate-500 text-sm">Last Name</p>
              <input
                onChange={(e) => setFamilyName(e.target.value)}
                defaultValue={props.familyName}
                className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>

            <div>
              <p className="mb-2 font-semibold text-slate-500 text-sm">Grade</p>
              <select
                onChange={(e) => setGrade(parseInt(e.target.value, 10))}
                defaultValue={props.grade}
                className="appearance-none mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              >
                <option>Select a grade</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
            </div>

            <div>
              <p className="mb-2 font-semibold text-slate-500 text-sm">Impact Statement</p>
              <textarea
                onChange={(e) => setImpactStatement(e.target.value)}
                defaultValue={props.impactStatement}
                className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>

            <div>
              <p className="mb-2 font-semibold text-slate-500 text-sm">Access Token</p>
              <input
                disabled
                defaultValue={props.accessToken || ""}
                className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {hasChanges && (
          <Button spacing="lg" border="rectangle" color="slate" theme="dark" text="Save" onClick={onSave} />
        )}
      </div>
    </Modal>
  );
};
