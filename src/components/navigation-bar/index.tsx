import { useNavigate } from "react-router-dom";
import { Community } from "../../models/community";
import { Resident } from "../../models/resident";
import { Logo } from "../logo";

import React, { FunctionComponent } from "react";
import { Icon } from "../icon";

/**
 * Configurable properties for NavigationBar component
 */
export interface NavigationBarProps {
  community: Community | null;
  resident: Resident | null;
  page?: "home" | "profile" | "explore" | "calendar";
}

/**
 * NavigationBar component
 */
export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const navigate = useNavigate();
  const cursor = props.page === "home" ? "" : "cursor-pointer";

  // todo: responsive menu
  // todo: logout
  return (
    <nav className="flex items-center justify-between flex-wrap sticky top-0 z-50 w-full h-16 border-b md:border-none md:border-monochrome-100 bg-white overflow-hidden px-4 md:px-24 py text-center md:shadow-md">
      <div className="grow items-center flex-shrink-0 md:mr-6">
        <Logo
          className={`-ml-2 w-36 ${cursor}`}
          variant="localcivics"
          onClick={() => cursor && navigate("/")}
        />
      </div>
      {props.page !== "home" && (
        <div className="w-full block flex items-center w-auto">
          <div className="relative">
            <Icon
              onClick={
                props.page !== "profile"
                  ? () => navigate(`/residents/${props.resident?.residentName}`)
                  : undefined
              }
              className={`drop-shadow-sm transition ease-in-out w-5 h-5 ${
                props.page == "profile"
                  ? "stroke-slate-600"
                  : "stroke-slate-400"
              } ${
                props.page == "profile" ? "fill-slate-600" : "fill-slate-400"
              } hover:stroke-slate-600 hover:fill-slate-600 mr-8 ${
                props.page !== "profile" && "cursor-pointer"
              }`}
              icon="user"
            />
            {props.page === "profile" && (
              <Icon
                className="drop-shadow-sm h-1 w-1 left-2 mt-1 absolute bottom m-auto stroke-slate-600 fill-slate-600"
                icon="circle"
              />
            )}
          </div>

          <div className="relative">
            <Icon
              onClick={
                props.page !== "explore"
                  ? () =>
                      navigate(
                        `/communities/${props.community?.communityName}/explore/events`
                      )
                  : undefined
              }
              className={`drop-shadow-sm transition ease-in-out w-5 h-5 ${
                props.page == "explore"
                  ? "stroke-slate-600"
                  : "stroke-slate-400"
              } ${
                props.page == "explore" ? "fill-slate-600" : "fill-slate-400"
              } hover:stroke-slate-600 hover:fill-slate-600 mr-8 ${
                props.page !== "explore" && "cursor-pointer"
              }`}
              icon="explore"
            />
            {props.page === "explore" && (
              <Icon
                className="drop-shadow-sm h-1 w-1 left-2 mt-1 absolute bottom m-auto stroke-slate-600 fill-slate-600"
                icon="circle"
              />
            )}
          </div>
          <div className="relative">
            <Icon
              onClick={
                props.page !== "calendar"
                  ? () =>
                      navigate(
                        `/communities/${props.community?.communityName}/calendar/events`
                      )
                  : undefined
              }
              className={`drop-shadow-sm transition ease-in-out w-5 h-5 ${
                props.page == "calendar"
                  ? "stroke-slate-600"
                  : "stroke-slate-400"
              } ${
                props.page == "calendar" ? "fill-slate-600" : "fill-slate-400"
              } hover:stroke-slate-600 hover:fill-slate-400 ${
                props.page !== "calendar" && "cursor-pointer"
              }`}
              icon="calendar"
            />
            {props.page === "calendar" && (
              <Icon
                className="drop-shadow-sm h-1 w-1 left-2 mt-1 absolute bottom m-auto stroke-slate-600 fill-slate-600"
                icon="circle"
              />
            )}
          </div>
          <p className="cursor-pointer text-sm text-slate-400 hover:text-slate-600 ml-8">
            Logout
          </p>
        </div>
      )}
      {props.page === "home" && (
        <div className="w-full block flex items-center w-auto">
          <button className="transition-colors rounded-lg font-semibold py-2 px-8 border-2 shadow-md border-slate-700 text-slate-600 hover:text-slate-800 hover:border-slate-800 lg:mt-2">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};
