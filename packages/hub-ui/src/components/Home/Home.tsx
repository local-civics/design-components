import * as React from "react"

/**
 * Home
 * @constructor
 */
export const Home = () => {
  return (
    <div className="relative h-full w-full">
      <img
        className="absolute h-full w-full top-0 left-0 object-cover"
        alt="landing"
        src="https://cdn.localcivics.io/hub/landing.jpg"
      />
      <div className="absolute z-10 bottom-1/4 left-0 w-full -mb-[3rem] px-6 lg:px-36">
        <div className="max-w-[62.5rem] m-auto inset-z-0 text-white">
          <p className="text-[3rem] font-bold">Learning that powers your future!</p>
          <p className="mt-5 text-[2rem]">
          Explore pathways, earn badges and build skills for success in college, career, and community.
          </p>
        </div>
      </div>
    </div>
  );
};
