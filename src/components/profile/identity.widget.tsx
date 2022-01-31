import React, { FunctionComponent } from "react";
import { Community } from "../../models/community";
import { Resident } from "../../models/resident";
import { Icon } from "../icon";
import { Loader } from "../loader";

/**
 * IdentityWidget props
 */
export interface IdentityWidgetProps {
  community: Community | null;
  resident: Resident | null;
  title: string;
  onEdit?: () => void;
}

/**
 * IdentityWidget
 * @param props
 * @constructor
 */
export const IdentityWidget: FunctionComponent<IdentityWidgetProps> = ({
  community,
  resident,
  title,
  onEdit,
}) => {
  return (
    <div
      className="border rounded-md shadow-sm min-h-48 lg:w-60 w-full overflow-hidden"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-2 py-2 bg-gray-200" />
      <div className="grid grid-cols-1 h-full">
        <div className="p-2">
          <div className="flex items-center">
            <div className="grow">
              <Icon
                className="w-5 h-5 stroke-slate-600 fill-slate-600 inline-block"
                icon="user"
              />
              <h4 className="ml-2 capitalize align-middle font-semibold text-slate-600 inline-block">
                {title}
              </h4>
            </div>
            {onEdit && (
              <Icon
                onClick={onEdit}
                className="w-4 h-4 -mt-0.5 align-middle cursor-pointer stroke-gray-500 fill-gray-500 hover:stroke-slate-600 hover:fill-slate-600 inline-block"
                icon="edit"
              />
            )}
          </div>

          <Loader isLoading={resident === null}>
            <p className="line-clamp-10 mt-3 text-sm text-slate-400">
              {resident?.impactStatement}
            </p>
            {community?.placeName && (
              <div className="mt-2">
                <Icon
                  className="w-4 h-4 stroke-slate-600 fill-slate-600 inline-block"
                  icon="pin"
                />
                <h4 className="ml-2 capitalize text-xs align-middle text-slate-500 inline-block">
                  {community?.placeName}
                </h4>
              </div>
            )}
            {community?.trueName && (
              <div className="mt-2">
                <Icon
                  className="w-4 h-4 stroke-slate-600 fill-slate-600 inline-block"
                  icon="college & career"
                />
                <h4 className="ml-2 capitalize text-xs align-middle text-slate-500 inline-block">
                  {community.trueName}
                </h4>
              </div>
            )}
          </Loader>
        </div>
      </div>
    </div>
  );
};
