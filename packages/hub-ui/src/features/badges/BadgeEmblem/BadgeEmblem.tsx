import * as React from "react";
import "external-svg-loader";

import { Icon, IconName } from "../../../components/Icon/Icon";

/**
 * BadgeEmblemProps
 */
export type BadgeEmblemProps = {
  icon?: IconName;
  iconURL?: string
  alt?: string;
  imageURL?: string;
  level?: number;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
};

/**
 * BadgeEmblem
 * @param props
 * @constructor
 */
export const BadgeEmblem = (props: BadgeEmblemProps) => {
  const size = (() => {
    switch (props.size) {
      case "xxs":
      return ["h-max w-12", "w-6 h-6"];
      case "xs":
        return ["h-max w-16", "w-8 h-8"];
      case "sm":
        return ["h-max w-24", "w-12 h-12"];
      case "lg":
        return ["h-max w-40", "w-20 h-20"];
      default:
        return ["h-max w-28", "w-14 h-14"];
    }
  })();

  const hasIcon = !!props.icon || !!props.iconURL

  return (
    <div className={`relative overflow-hidden ${size[0]}`}>
        {!hasIcon && <img className="w-full h-full object-cover" alt={props.alt} src={props.imageURL} />}
        { hasIcon &&
            <>
                <svg
                className="h-full w-full drop-shadow-[inherit]"
                viewBox="0 0 940 1100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {!!props.level && props.level > 0 && (
                  <path
                    d="M482.921 47.8734L891.581 301.279C892.463 301.826 893 302.79 893 303.828V796.694C893 797.78 892.413 798.781 891.466 799.311L466.728 1037.16C465.809 1037.68 464.687 1037.67 463.772 1037.15L48.5103 799.603C47.5763 799.069 47 798.076 47 796.999V304.573C47 303.511 47.5618 302.528 48.4771 301.989L479.817 47.8383C480.777 47.2722 481.973 47.2857 482.921 47.8734Z"
                    fill="none"
                    stroke="#1EE2B0"
                    strokeWidth="94"
                  />
                )}

                {!!props.level && props.level > 1 && (
                  <path
                    className="-translate-y-3.5"
                    d="M494.044 136.608L824.747 341.5C832.987 346.606 838 355.609 838 365.302V764.144C838 774.282 832.52 783.628 823.672 788.579L479.785 980.994C471.211 985.791 460.749 985.744 452.219 980.868L116.106 788.758C107.383 783.773 102 774.496 102 764.449V366.047C102 356.129 107.247 346.95 115.795 341.918L465.092 136.281C474.055 131.004 485.203 131.13 494.044 136.608Z"
                    fill="none"
                    stroke="#FFD44D"
                    strokeWidth="44"
                  />
                )}

                <path
                  d="M467.125 26.2992C476.092 21.0157 487.25 21.1418 496.095 26.6267L904.756 280.032C912.991 285.138 918 294.139 918 303.828V796.694C918 806.828 912.523 816.172 903.681 821.124L478.943 1058.98C470.364 1063.78 459.894 1063.73 451.359 1058.85L36.0968 821.304C27.3791 816.317 22 807.043 22 796.999V304.573C22 294.658 27.2435 285.483 35.786 280.449L467.125 26.2992Z"
                  fill="none"
                  stroke="#3BD0F2"
                  strokeWidth="44"
                />
              </svg>
              <div className={`absolute overflow-hidden left-0 right-0 top-0 bottom-0 m-auto text-dark-blue-400 ${size[1]}`}>
                { !props.iconURL && !!props.icon && <Icon name={props.icon} /> }
                { props.iconURL && <svg data-cache="disabled" data-src={props.iconURL} className="w-full h-full drop-shadow-[inherit]" viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"/> }
              </div>
            </>
        }
    </div>
  );
};
