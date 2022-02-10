import React from "react";
import { HomeLayout } from "../../layouts/HomeLayout/HomeLayout";

/**
 * A component for the home page.
 * @constructor
 */
export const Home = () => {
  return (
    <HomeLayout>
      <div className="relative h-full w-full">
        <img
          className="absolute h-full w-full top-0 left-0 object-cover"
          alt="landing"
          src="https://cdn.localcivics.io/hub/landing.jpg"
        />
        <div className="absolute z-10 bottom-1/4 left-0 w-full -mb-[3rem] px-6 lg:px-36">
          <div className="max-w-[24rem] inset-z-0 text-white">
            <p className="text-4xl font-bold">Get involved in your community!</p>
            <p className="mt-5 text-md">
              Learn how you can make an impact in your community through connecting with community leaders, attending
              events, and building civic skills.
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};
