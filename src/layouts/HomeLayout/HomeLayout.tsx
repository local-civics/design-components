import React from "react";
import { NavBar, NavLink, Loader } from "../../components";
import { useResidentContext } from "../../contexts";

/**
 * The properties for the home layout
 */
export type HomeLayoutProps = {
  children: React.ReactNode;
};

/**
 * A layout for organizing content in for home page.
 * @param props
 * @constructor
 */
export const HomeLayout = (props: HomeLayoutProps) => {
  const ctx = useResidentContext();
  return (
    <main className="h-screen bg-white font-proxima">
      <Loader isLoading={ctx === null}>
        <NavBar>
          <NavLink name="home" path="/" active />
          <NavLink name="login" onClick={ctx?.login} />
        </NavBar>

        <div className="font-proxima">{props.children}</div>
      </Loader>
    </main>
  );
};
