import React              from "react";
import { builder }        from "../../../../utils/classname/classname";
import { Button }         from "../../../../components/Button";
import { Icon, IconName } from "../../../../components/Icon";
import { Modal }          from "../../../../components/Modal";

/**
 * ActivityCardProps
 */
export type ActivityCardProps = {
  headline?: string;
  imageURL?: string;
  pathway?: string;
  xp?: number;
  summary?: string;
  skills?: string[];
  tags?: string[];
  startTime?: string;
  endTime?: string;
  link?: string;
  formId?: string;
  address?: string;
  isBookmarked?: boolean;
  canReflect?: boolean;
  milestone?: boolean;

  onRegister?: () => void;
  onUnregister?: () => void;
  onLaunch?: () => void;
  onReflect?: () => void;
  onSkillClick?: (skill: string) => void;
  onClose?: () => void;
};

/**
 * ActivityCard
 * @param props
 * @constructor
 */
export const ActivityCard = (props: ActivityCardProps) => {
  const className = builder("w-full md:w-[40rem]").if(!!props.headline, "min-h-[20rem]").build();
  const ActionButton = () => {
    const now = new Date();
    const inProgress = props.milestone || (props.startTime && now >= new Date(props.startTime));
    const status = inProgress ? "in-progress" : props.isBookmarked ? "subscribed" : "unsubscribed";
    switch (status) {
      case "in-progress":
        return (
          <Button
            onClick={props.onLaunch}
            theme="dark"
            border="rounded"
            size="md"
            spacing="md"
            color="green"
            text="Launch"
          />
        );
      case "unsubscribed":
        return (
          <Button
            onClick={props.onRegister}
            theme="dark"
            border="rounded"
            size="md"
            spacing="md"
            color="sky"
            text="Register"
          />
        );
      case "subscribed":
        return (
          <Button
            onClick={props.onUnregister}
            theme="dark"
            border="rounded"
            size="md"
            spacing="md"
            color="slate"
            text="Registered"
          />
        );
    }
  };

  return (
    <Modal onClose={props.onClose} visible isLoading={!props.headline}>
      <div className={className}>
        <img className="w-full h-60 object-cover" alt={props.headline} src={props.imageURL} />
        <div className="w-full grid grid-cols-1 gap-2 sm:flex sm:place-content-between p-5 border-b border-gray-200">
          <div className="flex items-start grow md:max-w-[22rem]">
            <div className="inline-block min-w-6 w-6 h-6 text-slate-600">
              <Icon name={(props.pathway as IconName) || "explore"} />
            </div>

            <div className="grow align-top ml-2 inline-block leading-none">
              <p className="font-semibold capitalize text-slate-600 text-lg -mt-1.5">{props.headline}</p>
              <div>
                <p className="text-sm inline-block capitalize text-slate-600">{props.pathway}</p>
                {props.xp && <p className="ml-1 font-semibold inline-block text-sm text-green-500">{props.xp} pts</p>}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 max-h-[12rem]">
            <ActionButton />
            {!props.formId && (
              <Button
                disabled={!props.canReflect}
                spacing="md"
                border="rounded"
                color="sky"
                theme="dark"
                text="Reflect"
                size="md"
                onClick={props.onReflect}
              />
            )}
          </div>
        </div>

        <div className="w-full max-h-[20rem] overflow-auto">
          <div className="w-full p-5 border-b border-gray-200 grid grid-cols-1 gap-4">
            {props.summary && (
              <div className="text-slate-600 grid grid-cols-1 gap-4">
                <p className="font-semibold text-lg">Summary</p>
                <p className="text-sm">{props.summary}</p>
              </div>
            )}

            {props.skills && props.skills.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                <p className="text-slate-600 font-semibold text-lg">Skills</p>
                <div className="flex gap-2">
                  {props.skills.map((skill, i) => {
                    return (
                      <button
                        onClick={() => props.onSkillClick && props.onSkillClick(skill)}
                        key={skill + i}
                        className="grow-0 cursor-pointer shadow-sm text-center font-semibold inline-block rounded-md bg-gray-100 hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50 px-4 py-2 text-sm text-gray-600"
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="w-full p-5 border-b border-gray-200 grid grid-cols-1 gap-4">
            {(props.address || props.link || props.startTime) && (
              <div className="text-slate-600 grid grid-cols-1 gap-4">
                <p className="font-semibold text-lg">Details</p>
                <div className="grid grid-cols-1 gap-8">
                  {props.address && (
                    <div className="flex gap-1 items-center">
                      <div className="grow-0 w-6 h-6 min-w-6 text-slate-600">
                        <Icon name="pin" />
                      </div>
                      <div className="grow font-medium inline-block capitalize px-4 py-2 text-sm text-slate-600">
                        {props.address}
                      </div>
                    </div>
                  )}

                  {props.startTime && (
                    <div className="flex gap-1 items-center">
                      <div className="grow-0 w-6 h-6 min-w-6 text-slate-600">
                        <Icon name="clock" />
                      </div>
                      <div className="grow font-medium inline-block px-4 py-2 text-sm text-slate-600">
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "full",
                          timeStyle: "long",
                        }).format(new Date(props.startTime))}
                      </div>
                    </div>
                  )}

                  {props.link && (
                    <div className="flex gap-1 items-center">
                      <div className="grow-0 w-6 h-6 min-w-6 text-slate-600">
                        <Icon name="globe" />
                      </div>
                      <div className="grow font-medium inline-block px-4 py-2 text-sm text-slate-600 hover:underline">
                        <a href={props.link}>{props.link}</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
