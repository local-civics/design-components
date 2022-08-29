import React                                    from "react";
import { Loader, NavBar, NavBarProps, NavLink } from "../../../components";

/**
 * AuthLayoutProps
 */
export type AuthLayoutProps = {
  isLoading?: boolean;
  tenantName?: string;
  impactStatement?: string;
  pathname?: string;
  page?: "profile" | "explore" | "calendar";
  disabled?: boolean;
  header?: React.ReactNode;
  subheader?: React.ReactNode;
  sidebar?: React.ReactNode;
  main?: React.ReactNode;
  outlet?: React.ReactNode;
  children?: React.ReactNode;

  onOnboarding?: () => void;
  onHome?: () => void;
  onProfile?: () => void;
  onExplore?: () => void;
  onCalendar?: () => void;
  onLogout?: () => void;
  onFAQ?: () => void;
  onPrivacy?: () => void;
  onTerms?: () => void;
};

/**
 * AuthLayout
 * @constructor
 */
export const AuthLayout = (props: AuthLayoutProps & NavBarProps) => {
  const onOnboarding = () => props.onOnboarding && props.onOnboarding();
  React.useEffect(() => {
    if (!props.tenantName) {
      return;
    }

    if (!props.impactStatement && !props.pathname?.endsWith("onboarding")) {
      onOnboarding();
      return;
    }
  }, [props.tenantName, props.impactStatement, props.pathname]);

  return (
    <main className="relative h-screen w-full bg-white font-proxima">
      <Loader isLoading={props.isLoading}>
        <NavBar>
          <NavLink disabled={!props.onHome || props.disabled} name="home" onClick={props.onHome} />
          {props.onFAQ && <NavLink name="faq" onClick={props.onFAQ} />}
          {props.onPrivacy && <NavLink name="privacy" onClick={props.onPrivacy} />}
          {props.onTerms && <NavLink name="terms" onClick={props.onTerms} />}
          {props.onProfile && (
            <NavLink
              disabled={props.disabled}
              name="profile"
              onClick={props.onProfile}
              active={props.page === "profile"}
            />
          )}
          {props.onExplore && (
            <NavLink
              disabled={props.disabled}
              name="explore"
              onClick={props.onExplore}
              active={props.page === "explore"}
            />
          )}
          {props.onCalendar && (
            <NavLink
              disabled={props.disabled}
              name="calendar"
              onClick={props.onCalendar}
              active={props.page === "calendar"}
            />
          )}
          {props.onLogout && <NavLink name="logout" onClick={props.onLogout} />}
        </NavBar>

        {props.children && (
          <section className="absolute top-0 left-0 h-full overflow-auto pt-16 w-full">{props.children}</section>
        )}

        {!props.children && (
          <section className="w-full px-4 py-5 lg:px-36 flex flex-col gap-4">
            {props.header && (
              <div className="w-full max-w-[62.5rem] m-auto min-h-16 lg:min-h-24 lg:flex">{props.header}</div>
            )}

            <div className="grow w-full min-h-96">
              {/* Body */}
              <div className="w-full max-w-[62.5rem] m-auto grid grid-cols-1 gap-y-4 lg:flex lg:gap-x-2">
                {/* Left Panel */}
                {props.sidebar && (
                  <div className="grid grid-cols-1 max-w-full md:flex md:flex-col gap-2 lg:w-[16rem] shrink-0">
                    <div className="flex flex-col gap-4 lg:gap-x-2 lg:gap-y-3">{props.sidebar}</div>
                    <p className="hidden place-self-center lg:inline-block text-xs text-slate-300">
                      Local Civics © {new Date().getFullYear()}
                    </p>
                  </div>
                )}

                {/* Right Panel */}
                {(props.subheader || props.main) && (
                  <div className="grow grid grid-cols-1 max-w-full overflow-x-hidden md:flex md:flex-col gap-4 lg:gap-2">
                    {props.subheader && (
                      <div className="relative grid grid-cols-1 md:flex w-full gap-4 lg:gap-2">
                        {props.subheader}
                      </div>
                    )}
                    {props.main && <div className="relative grid grid-cols-1 w-full gap-4 lg:gap-2">{props.main}</div>}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </Loader>
      {props.outlet}
    </main>
  );
};
