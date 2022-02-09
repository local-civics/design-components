import React from "react";
import { builder } from "../../utils/classname/classname";

/**
 * The properties for the loader.
 */
export type LoaderProps = {
  isLoading?: boolean;
  children: React.ReactNode;
};

/**
 * A component for content that is not ready to be displayed.
 */
export const Loader = (props: LoaderProps) => {
  const loaderClassName = builder("flex absolute m-auto h-full w-full transition ease-in-out duration-500")
    .if(!!props.isLoading, "visible opacity-full")
    .else("invisible opacity-0")
    .build();

  const contentClassName = builder("relative transition ease-in-out duration-500")
    .if(!!props.isLoading, "invisible opacity-0")
    .else("visible opacity-full")
    .build();

  return (
    <div className="relative h-full w-full">
      <div className={loaderClassName}>
        {/*<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->*/}
        <svg
          className="m-auto stroke-sky-300"
          width="35"
          height="35"
          viewBox="0 0 45 45"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
            <circle cx="22" cy="22" r="6" strokeOpacity="0">
              <animate
                attributeName="r"
                begin="1.5s"
                dur="3s"
                values="6;22"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                begin="1.5s"
                dur="3s"
                values="1;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                begin="1.5s"
                dur="3s"
                values="2;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="6" strokeOpacity="0">
              <animate attributeName="r" begin="3s" dur="3s" values="6;22" calcMode="linear" repeatCount="indefinite" />
              <animate
                attributeName="stroke-opacity"
                begin="3s"
                dur="3s"
                values="1;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-width"
                begin="3s"
                dur="3s"
                values="2;0"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="22" cy="22" r="8">
              <animate
                attributeName="r"
                begin="0s"
                dur="1.5s"
                values="6;1;2;3;4;5;6"
                calcMode="linear"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>
      </div>
      <div className={contentClassName}>{props.children}</div>
    </div>
  );
};
