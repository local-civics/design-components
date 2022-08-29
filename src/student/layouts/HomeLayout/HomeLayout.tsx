import React               from "react";
import { NavBar, NavLink } from "../../../components";

/**
 * HomeLayoutProps
 */
export type HomeLayoutProps = {
  isLoading?: boolean;
  nickname?: string;
  pathname?: string;
  children?: React.ReactNode;

  onProfile?: () => void;
  onHome?: () => void;
  onLogin?: () => void;
  onFAQ?: () => void;
  onPrivacy?: () => void;
  onTerms?: () => void;
};

/**
 * HomeLayout
 * @constructor
 */
export const HomeLayout = (props: HomeLayoutProps) => {
  const onProfile = () => props.onProfile && props.onProfile();

  React.useEffect(() => {
    if (props.isLoading) {
      return;
    }

    if (props.nickname) {
      if (props.pathname === `/`) {
        onProfile();
        return;
      }
    }
  }, [props.isLoading, props.pathname, props.nickname]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-white font-proxima">
      <NavBar>
        <NavLink name="home" onClick={props.onHome} active />
        <NavLink name="login" onClick={props.onLogin} />
        <NavLink name="faq" onClick={props.onFAQ} />
        <NavLink name="privacy" onClick={props.onPrivacy} />
        <NavLink name="terms" onClick={props.onTerms} />
      </NavBar>

      <section className="absolute top-0 left-0 h-full overflow-hidden pt-16 w-full">{props.children}</section>
    </main>
  );
};
