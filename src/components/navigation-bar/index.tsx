import { Logo } from "../logo";

import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { useNavigate } from "react-router-dom";

/**
 * Configurable properties for NavigationBar component
 */
export interface NavigationBarProps {
  communityName?: string;
  residentName?: string;
  page?: "home" | "profile" | "explore" | "calendar";
}

/**
 * NavigationBar component
 */
export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const navigate = useNavigate();
  const residentName = props.residentName || "me";
  const communityName = props.communityName || "my";
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
                  ? () => navigate(`/residents/${residentName}`)
                  : undefined
              }
              className={`transition ease-in-out w-5 h-5 ${
                props.page == "profile"
                  ? "stroke-slate-800"
                  : "stroke-slate-600"
              } ${
                props.page == "profile" ? "fill-slate-800" : "fill-slate-600"
              } hover:stroke-slate-800 hover:fill-slate-800 mr-8 ${
                props.page !== "profile" && "cursor-pointer"
              }`}
              icon="user"
            />
            {props.page === "profile" && (
              <Icon
                className="h-1 w-1 left-2 mt-1 absolute bottom m-auto stroke-slate-700 fill-slate-700"
                icon="circle"
              />
            )}
          </div>

          <div className="relative">
            <Icon
              onClick={
                props.page !== "explore"
                  ? () => navigate(`/communities/${communityName}`)
                  : undefined
              }
              className={`transition ease-in-out w-5 h-5 ${
                props.page == "explore"
                  ? "stroke-slate-800"
                  : "stroke-slate-600"
              } ${
                props.page == "explore" ? "fill-slate-800" : "fill-slate-600"
              } hover:stroke-slate-800 hover:fill-slate-800 mr-8 ${
                props.page !== "explore" && "cursor-pointer"
              }`}
              icon="explore"
            />
            {props.page === "explore" && (
              <Icon
                className="h-1 w-1 left-2 mt-1 absolute bottom m-auto stroke-slate-700 fill-slate-700"
                icon="circle"
              />
            )}
          </div>
          <div className="relative">
            <Icon
              onClick={
                props.page !== "calendar"
                  ? () => navigate(`/residents/${residentName}/calendar`)
                  : undefined
              }
              className={`transition ease-in-out w-5 h-5 ${
                props.page == "calendar"
                  ? "stroke-slate-800"
                  : "stroke-slate-600"
              } ${
                props.page == "calendar" ? "fill-slate-800" : "fill-slate-600"
              } hover:stroke-slate-800 hover:fill-slate-800 ${
                props.page !== "calendar" && "cursor-pointer"
              }`}
              icon="calendar"
            />
            {props.page === "calendar" && (
              <Icon
                className="h-1 w-1 left-2 mt-1 absolute bottom m-auto stroke-slate-700 fill-slate-700"
                icon="circle"
              />
            )}
          </div>
          <p className="cursor-pointer text-sm text-slate-600 hover:text-slate-800 ml-8">
            Logout
          </p>
        </div>
      )}
      {props.page === "home" && (
        <div className="w-full block flex items-center w-auto">
          <button className="transition-colors rounded-lg font-semibold py-2 px-8 border-2 border-slate-700 text-slate-700 hover:text-slate-800 hover:border-slate-800 lg:mt-2">
            Login
          </button>
        </div>
      )}
    </nav>
  );
};
