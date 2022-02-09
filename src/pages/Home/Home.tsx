import React from "react";
import { HomeLayout } from "../../layouts/HomeLayout/HomeLayout";

/**
 * A component for the home page.
 * @constructor
 */
export const Home = () => {
  return (
    <HomeLayout>
      <img className="object-cover w-full h-full" alt="landing" src="https://cdn.localcivics.io/hub/landing.jpg" />
      <div className="absolute max-w-[28rem] px-10 py-3.5 bottom-12 inset-z-0 text-white">
        <p className="text-4xl lg:text-5xl font-bold">Get involved in your community!</p>
        <p className="mt-5 text-md lg:text-lg">
          Learn how you can make an impact in your community through connecting with community leaders, attending
          events, and building civic skills.
        </p>
      </div>
    </HomeLayout>
  );
};
