import React from "react";
import { builder } from "../../utils/classname/classname";

/**
 * The properties for the loader.
 */
export type LoaderProps = {
  isLoading?: boolean;
  children: React.ReactNode;
  /** Spinner width/height in px. Defaults to 35 (the original, small size) when omitted. */
  size?: number;
  /** Tailwind stroke color class for the spinner. Defaults to "stroke-sky-300" (the original, low-contrast color) when omitted. */
  strokeClassName?: string;
  /**
   * Optional contextual text rendered beneath the spinner (e.g. "Loading dashboard activity...").
   * Omitting it preserves the original bare-spinner layout exactly; passing it switches to a
   * centered column with a min-height floor, so the spinner+text pair reliably centers within the
   * content pane instead of drifting toward whatever height the (still-loading, mostly empty)
   * content happens to compute to.
   */
  label?: string;
};

/**
 * A component for content that is not ready to be displayed.
 */
export const Loader = (props: LoaderProps) => {
  const size = props.size ?? 35;
  const strokeClassName = props.strokeClassName ?? "stroke-sky-300";

  const loaderClassName = builder(
    props.label
      ? "flex absolute top-0 left-0 h-full min-h-[50vh] w-full flex-col items-center justify-center gap-3 transition ease-in-out duration-500"
      : "flex absolute top-0 left-0 h-full w-full m-auto transition ease-in-out duration-500"
  )
    .if(!!props.isLoading, "visible opacity-full")
    .else("invisible opacity-0")
    .build();

  // The bare spinner (no label) relies on `m-auto` to center itself as the overlay's only child
  // in its default flex-row layout - harmless there since there's nothing else to push around.
  // Once a label is present the overlay switches to flex-col with two children, and `margin: auto`
  // on the svg's own top/bottom (the main axis in a column) would greedily consume all free
  // vertical space around itself, shoving the label down to the bottom of whatever tall box the
  // overlay ends up being (very noticeable against real, mostly-empty loading-state page content,
  // not just a short Storybook mock) - so the label variant centers via the parent's own
  // `items-center justify-center` instead and drops the svg's own auto margins entirely.
  const svgClassName = props.label ? strokeClassName : `m-auto ${strokeClassName}`;

  const contentClassName = builder("w-full transition ease-in-out duration-500")
    .if(!!props.isLoading, "invisible opacity-0")
    .else("visible opacity-full")
    .build();

  const containerClassName = builder("my-auto").if(!!props.isLoading, "relative").build();

  return (
    <>
      <div className={containerClassName}>
        {/*<!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->*/}
        <div className={loaderClassName}>
          <svg
            className={svgClassName}
            width={size}
            height={size}
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
                <animate
                  attributeName="r"
                  begin="3s"
                  dur="3s"
                  values="6;22"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
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
          {props.label && <p className="text-sm text-slate-400">{props.label}</p>}
        </div>
        <div className={contentClassName}>{props.children}</div>
      </div>
    </>
  );
};
