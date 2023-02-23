import React from "react";
import { builder } from "../../utils/classname/classname";
import { NavLink, NavLinkProps } from "./NavLink/NavLink";

/**
 * The properties for the nav bar.
 */
export type NavBarProps = {
  children?: (React.ReactElement<NavLinkProps> | undefined)[] | React.ReactElement<NavLinkProps>;
};

/**
 * A component for navigating the platform.
 */
export const NavBar = (props: NavBarProps) => {
  const className = builder("flex items-center justify-between flex-wrap sticky top-0 z-30 w-full h-16 border-b")
    .append("bg-white px-4 py text-center")
    .append("md:border-t-none md:border-b md:border-monochrome-50 lg:px-36 md:shadow-sm")
    .build();

  const [secondary, setSecondary] = React.useState(false);
  const secondaryClassName = builder("w-full shadow-sm absolute z-30 top-11 left-0 grid grid-cols-1 bg-gray-50")
    .append("md:invisible")
    .append("transition duration-500 ease-in-out")
    .if(secondary, "opacity-full visible")
    .else("invisible opacity-0")
    .build();

  const menuIcon = secondary ? "menu-close" : "menu";
  return (
    <nav className={className}>
      <div className="w-full flex items-center justify-between flex-wrap sticky max-w-[62.5rem] m-auto">
        {React.Children.map(props.children, (Link) => {
          if (Link && Link.props.name === "home") {
            return <div className="grow items-center flex-shrink-0 md:mr-6">{Link}</div>;
          }

          return null;
        })}

        <div className="hidden md:flex md:items-center gap-x-8">
          {React.Children.map(props.children, (Link) => {
            if (Link && Link.props.name !== "home") {
              return <div className="relative">{Link}</div>;
            }
            return null;
          })}
        </div>

        <div className="inline-block md:hidden">
          <NavLink onClick={() => setSecondary(!secondary)} name={menuIcon} />
        </div>

        <div className={secondaryClassName}>
          {React.Children.map(props.children, (Link) => {
            if (Link && Link.props.name !== "home") {
              return (
                <div className="relative">
                  <NavLink {...Link.props} menu />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </nav>
  );
};
