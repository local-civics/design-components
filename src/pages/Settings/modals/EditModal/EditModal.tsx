import React from "react";
import { Modal } from "../../../../components";

/**
 * The properties for the edit modal.
 */
export type EditModalProps = {
  visible?: boolean;
  onClose?: () => void;
  onSave?: (resident?: ResidentState) => void;
};

export type ResidentState = {
  avatarURL?: string;
  residentName?: string;
  givenName?: string;
  familyName?: string;
  grade?: string;
  impactStatement?: string;
  accessToken?: string;
};

/**
 * A component for viewing/editing resident settings.
 * @param props
 * @constructor
 */
export const EditModal = (props: EditModalProps & ResidentState) => {
  // https://stackoverflow.com/questions/55075604/react-hooks-useeffect-only-on-update
  const isInitialMount = React.useRef(true);
  const avatarInput = React.useRef<HTMLInputElement>(null);
  const [avatarURL, setAvatarURL] = React.useState(undefined as string | undefined);
  const [residentName, setResidentName] = React.useState(undefined as string | undefined);
  const [givenName, setGivenName] = React.useState(undefined as string | undefined);
  const [familyName, setFamilyName] = React.useState(undefined as string | undefined);
  const [grade, setGrade] = React.useState(undefined as string | undefined);
  const [impactStatement, setImpactStatement] = React.useState(undefined as string | undefined);
  const [changes, setChanges] = React.useState(undefined as ResidentState | undefined);
  const onAvatarClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setAvatarURL(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const onSave = () => props.onSave && props.onSave(changes);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const hasChanges = residentName || givenName || familyName || grade || impactStatement || avatarURL;
      if (!hasChanges) {
        setChanges(undefined);
        return;
      }

      setChanges({
        residentName: residentName,
        givenName: givenName,
        familyName: familyName,
        grade: grade,
        impactStatement: impactStatement,
        avatarURL: avatarURL,
      });
    }
    return () => {
      isInitialMount.current = true;
    };
  }, [avatarURL, residentName, familyName, givenName, grade, impactStatement]);

  return (
    <Modal
      embed
      width="lg"
      visible={props.visible}
      title="Settings"
      justifyTitle="left"
      cta="save"
      onCTAClick={onSave}
      onClose={props.onClose}
    >
      <div className="relative">
        <input
          ref={avatarInput}
          className="invisible absolute"
          type="file"
          name="avatar"
          onChange={(e) => onAvatarClick(e)}
        />
        <img
          onClick={() => avatarInput.current && avatarInput.current.click()}
          src={avatarURL || props.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg"}
          alt="avatar"
          className="cursor-pointer border-2 shadow-sm w-20 h-20 lg:w-36 lg:h-36 rounded-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 w-full gap-6 max-h-[20rem] overflow-scroll">
        <div className="w-full">
          <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">Username</p>
          <input
            min={6}
            max={30}
            onChange={(e) => setResidentName(e.target.value)}
            defaultValue={props.residentName}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>

        <div className="w-full">
          <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">First Name</p>
          <input
            onChange={(e) => setGivenName(e.target.value)}
            defaultValue={props.givenName}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>

        <div className="w-full">
          <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">Last Name</p>
          <input
            onChange={(e) => setFamilyName(e.target.value)}
            defaultValue={props.familyName}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>

        <div className="w-full">
          <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">Grade</p>
          <select
            onChange={(e) => setGrade(e.target.value)}
            defaultValue={props.grade}
            className="appearance-none mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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

        <div className="w-full">
          <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">Impact Statement</p>
          <textarea
            onChange={(e) => setImpactStatement(e.target.value)}
            defaultValue={props.impactStatement}
            className="h-full resize-none mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>

        <div className="w-full">
          <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">Access Token</p>
          <input
            disabled
            defaultValue={props.accessToken}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>
      </div>
    </Modal>
  );
};
