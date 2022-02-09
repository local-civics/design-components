import React from "react";
import { NavBar, NavBarProps, NavLink, Loader } from "../../components";
import { useResidentContext } from "../../contexts";

/**
 * The properties for the auth layout
 */
export type AuthLayoutProps = {
  page?: "profile" | "explore" | "calendar";
  header?: React.ReactNode;
  subheader?: React.ReactNode;
  sidebar?: React.ReactNode;
  main?: React.ReactNode;
  outlet?: React.ReactNode;
};

/**
 * A layout for organizing content in for authenticated users.
 * @param props
 * @constructor
 */
export const AuthLayout = (props: AuthLayoutProps & NavBarProps) => {
  const ctx = useResidentContext();
  const page = props.page || "profile";

  return (
    <main className="h-screen bg-white font-proxima">
      <Loader isLoading={ctx === null || ctx.resolving}>
        <NavBar>
          <NavLink name="home" path="/" />
          <NavLink name="profile" path={`/residents/${ctx?.resident?.residentName}`} active={page === "profile"} />
          <NavLink
            disabled
            name="explore"
            path={`/communities/${ctx?.resident?.communityName}/explore/events`}
            active={page === "explore"}
          />
          <NavLink
            disabled
            name="calendar"
            path={`/communities/${ctx?.resident?.communityName}/calendar/events`}
            active={page === "calendar"}
          />
          <NavLink name="logout" onClick={ctx?.logout} />
        </NavBar>

        <section className="grid grid-cols-1 py-5 lg:px-4 lg:px-24 font-proxima lg:flex lg:flex-col gap-2">
          {props.header && <div className="w-full md:flex">{props.header}</div>}

          {/* Body */}
          <div className="grid grid-cols-1 lg:gap-x-2 lg:grid-cols-8">
            {/* Left Panel */}
            {props.sidebar && (
              <div className="grid grid-cols-1 lg:col-span-2 lg:flex lg:flex-col gap-2 lg:max-w-[16rem]">
                {props.sidebar}
                <p className="place-self-center inline-block mt-2 mb-2 text-xs text-slate-300">
                  Local Civics © {new Date().getFullYear()}
                </p>
              </div>
            )}

            {/* Right Panel */}
            {(props.subheader || props.main) && (
              <div className="grid grid-cols-1 max-w-full overflow-x-hidden md:col-span-6 md:flex md:flex-col gap-2 md:grow">
                {props.subheader && <div className="grid grid-cols-1 md:flex w-full gap-2">{props.subheader}</div>}
                {props.main && <div className="grid grid-cols-1 md:flex w-full gap-2">{props.main}</div>}
              </div>
            )}
          </div>
        </section>
      </Loader>
      {props.outlet}
    </main>
  );
};
