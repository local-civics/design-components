import React from "react";
import { NavBar, NavLink, Loader } from "../../components";
import { useResidentContext } from "../../contexts/ResidentContext/ResidentContext";

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
    <main className="relative h-screen w-full overflow-hidden bg-white font-proxima">
      <Loader isLoading={ctx === null}>
        <NavBar>
          <NavLink name="home" path="/" active />
          <NavLink name="login" onClick={ctx?.login} />
        </NavBar>

        <section className="absolute top-0 left-0 h-full overflow-hidden pt-16 w-full">{props.children}</section>
      </Loader>
    </main>
  );
};
