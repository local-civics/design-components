import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavBar, NavBarProps, NavLink, Loader } from "../../components";
import { useAuth, useIdentity } from "../../contexts/App";

/**
 * The properties for the auth layout
 */
export type AuthLayoutProps = {
  page?: "profile" | "explore" | "calendar";
  disabled?: boolean;
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
  const identity = useIdentity();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const page = props.page || "profile";
  React.useEffect(() => {
    if (identity.residentName && !identity.communityName) {
      if (location.pathname !== `/residents/${identity.residentName}/onboarding`) {
        navigate(`/residents/${identity.residentName}/onboarding`);
      }
    }
  }, [location.pathname, identity.residentName, identity.communityName]);

  return (
    <main className="relative h-screen w-full bg-white font-proxima">
      <Loader isLoading={identity.resolving}>
        <NavBar>
          <NavLink disabled={props.disabled} name="home" path="/" />
          <NavLink
            disabled={props.disabled}
            name="profile"
            path={`/residents/${identity.residentName}`}
            active={page === "profile"}
          />
          <NavLink
            disabled={props.disabled}
            name="explore"
            path={`/communities/${identity.communityName}/explore`}
            active={page === "explore"}
          />
          <NavLink
            disabled={props.disabled}
            name="calendar"
            path={`/communities/${identity.communityName}/calendar`}
            active={page === "calendar"}
          />
          <NavLink name="logout" onClick={auth.logout} />
        </NavBar>

        <section className="w-full px-4 py-5 lg:px-36 flex flex-col gap-4">
          {props.header && <div className="w-full min-h-16 lg:min-h-24 lg:flex">{props.header}</div>}

          <div className="grow w-full min-h-96">
            {/* Body */}
            <div className="w-full grid grid-cols-1 gap-y-4 lg:flex lg:gap-x-2">
              {/* Left Panel */}
              {props.sidebar && (
                <div className="grid grid-cols-1 max-w-full md:flex md:flex-col gap-2 lg:w-[16rem]">
                  <div className="flex flex-col gap-4 lg:gap-2">{props.sidebar}</div>
                  <p className="hidden place-self-center lg:inline-block text-xs text-slate-300">
                    Local Civics © {new Date().getFullYear()}
                  </p>
                </div>
              )}

              {/* Right Panel */}
              {(props.subheader || props.main) && (
                <div className="grow grid grid-cols-1 max-w-full overflow-x-hidden md:flex md:flex-col gap-4 lg:gap-2">
                  {props.subheader && (
                    <div className="lg:min-h-32 relative grid grid-cols-1 md:flex w-full gap-4 lg:gap-2">
                      {props.subheader}
                    </div>
                  )}
                  {props.main && <div className="relative grid grid-cols-1 w-full gap-4 lg:gap-2">{props.main}</div>}
                </div>
              )}
            </div>
          </div>
        </section>
      </Loader>
      {props.outlet}
    </main>
  );
};
