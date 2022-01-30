import React, { FunctionComponent } from "react";
import {useRequestContext}          from "../../hooks/request";
import {Resident}                   from "../../models/resident";
import { Icon }                     from "../icon";
import { Loader }                   from "../loader";

/**
 * Settings
 * @constructor
 * todo: validate input
 * todo: this is a modal, name it as such
 */
export const Settings: FunctionComponent = () => {
  const req = useRequestContext()
  const [changes, setChanges] = React.useState({} as Resident);
  const newIdentity: Resident = { ...req.resident, ...changes };
  const avatar = newIdentity.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg";
  const avatarInput = React.useRef<HTMLInputElement>(null);
  const updateProfile = (key: string, value: string) => {
    setChanges({ ...changes, [key]: value });
  };

  const onSave = async () => {
    if (changes) {
      await req.updateResident(newIdentity)
    }
    req.navigate(-1);
  };

  const onAvatarClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    let reader = new FileReader();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        updateProfile("avatarURL", reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <div className="shadow-md overflow-hidden w-9/12 lg:w-5/12 bg-white rounded-md grid grid-cols-1 justify-items-center">
        <div className="px-5 pt-5 pb-5 grid grid-cols-2 justify-items-end w-full">
          <p className="w-full font-semibold text-slate-600 text-sm">Settings</p>
          <Icon
            onClick={() => req.navigate(-1)}
            className="transition ease-in-out cursor-pointer stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:fill-gray-400 w-4"
            icon="close"
          />
        </div>

        <div className="w-full max-h-[28rem] overflow-scroll">
          <div className="h-[20rem]">
            <Loader isLoading={req.resident === null}>
              <div className="h-28 lg:h-48 w-full bg-gray-200" />
              <div className="relative ml-2 -mt-20 lg:-mt-28">
                <input
                  ref={avatarInput}
                  className="invisible"
                  type="file"
                  name="avatar"
                  onChange={(e) => onAvatarClick(e)}
                />
                <img
                  onClick={() =>
                    avatarInput.current && avatarInput.current.click()
                  }
                  src={avatar}
                  alt="avatar"
                  className="cursor-pointer border-2 shadow-sm w-20 h-20 lg:w-36 lg:h-36 rounded-full object-cover"
                />
              </div>

              <div className="p-5 w-full">
                <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">
                  Username
                </p>
                <input
                  min={6}
                  max={30}
                  onChange={(e) =>
                    updateProfile("residentName", e.target.value)
                  }
                  defaultValue={req.resident?.residentName}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>

              <div className="p-5 w-full">
                <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">
                  First Name
                </p>
                <input
                  onChange={(e) => updateProfile("givenName", e.target.value)}
                  defaultValue={req.resident?.givenName}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>

              <div className="p-5 w-full">
                <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">
                  Last Name
                </p>
                <input
                  onChange={(e) => updateProfile("familyName", e.target.value)}
                  defaultValue={req.resident?.familyName}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>

              <div className="p-5 w-full">
                <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">
                  Grade
                </p>
                <select
                  onChange={(e) => updateProfile("grade", e.target.value)}
                  defaultValue={req.resident?.grade}
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

              <div className="p-5 h-60 w-full">
                <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">
                  Impact Statement
                </p>
                <textarea
                  onChange={(e) => updateProfile("impactStatement", e.target.value)}
                  defaultValue={req.resident?.impactStatement}
                  className="h-full resize-none mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>

              <div className="p-5 w-full">
                <p className="mb-2 w-full font-semibold text-slate-600 text-xs lg:text-sm">
                  API Key
                </p>
                <input
                  disabled
                  defaultValue={"todo: implement me"}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
            </Loader>
          </div>
        </div>
        <div className="mt-5 mb-5 mr-8 grid justify-items-end w-full">
          <button
            onClick={onSave}
            className="transition-colors rounded-lg font-semibold text-white py-3 px-14 bg-sky-400 hover:bg-sky-500 mt-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
