import { Logo } from "../logo";

import React, { FunctionComponent } from "react";
import { Icon } from "../icon";
import { useNavigate } from "react-router-dom";

/**
 * Configurable properties for NavigationBar component
 */
export interface NavigationBarProps {
  owner?: string;
  page?: "profile" | "explore" | "calendar";
}

/**
 * NavigationBar component
 */
export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const navigate = useNavigate();
  const owner = props.owner || "";

  // todo: responsive menu
  // todo: logout
  return (
    <nav className="flex items-center justify-between flex-wrap sticky top-0 z-50 w-full h-16 border-b md:border-none md:border-monochrome-100 bg-white overflow-hidden px-4 md:px-24 py text-center md:shadow-md">
      <div className="flex-grow items-center flex-shrink-0 md:mr-6">
        <Logo
          className="-ml-2 w-36 cursor-pointer"
          variant="localcivics"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-full block flex items-center w-auto">
        <Icon
          onClick={
            props.page !== "profile" ? () => navigate(`/${owner}`) : undefined
          }
          className={`transition ease-in-out w-5 h-5 ${
            props.page == "profile" ? "stroke-slate-800" : "stroke-slate-600"
          } ${
            props.page == "profile" ? "fill-slate-800" : "fill-slate-600"
          } hover:stroke-slate-800 hover:fill-slate-800 mr-8 ${
            props.page !== "profile" && "cursor-pointer"
          }`}
          icon="user"
        />
        <Icon
          onClick={
            props.page !== "explore" ? () => navigate("/events") : undefined
          }
          className={`transition ease-in-out w-5 h-5 ${
            props.page == "explore" ? "stroke-slate-800" : "stroke-slate-600"
          } ${
            props.page == "explore" ? "fill-slate-800" : "fill-slate-600"
          } hover:stroke-slate-800 hover:fill-slate-800 mr-8 ${
            props.page !== "explore" && "cursor-pointer"
          }`}
          icon="explore"
        />
        <Icon
          onClick={
            props.page !== "calendar"
              ? () => navigate("/my/calendar")
              : undefined
          }
          className={`transition ease-in-out w-5 h-5 ${
            props.page == "calendar" ? "stroke-slate-800" : "stroke-slate-600"
          } ${
            props.page == "calendar" ? "fill-slate-800" : "fill-slate-600"
          } hover:stroke-slate-800 hover:fill-slate-800 ${
            props.page !== "calendar" && "cursor-pointer"
          }`}
          icon="calendar"
        />
      </div>
    </nav>
  );
};
