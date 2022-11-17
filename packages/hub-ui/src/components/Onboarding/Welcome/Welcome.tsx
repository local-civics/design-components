import React from "react";
import { Button } from "../../Button";
import { Icon } from "../../Icon";

/**
 * WelcomeProps
 */
export type WelcomeProps = {
  givenName?: string;
  onContinue?: () => void;
};

/**
 * A component for the onboarding welcome
 * @param props
 * @constructor
 */
export const Welcome = (props: WelcomeProps) => {
  return (
    <div className="w-full md:w-[24rem] rounded-md bg-white border border-slate-200 px-8 py-5 shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
      <div className="text-slate-600 w-14 h-14">
        <Icon name="explore" />
      </div>

      <div className="text-slate-600 text-center">
        <div className="font-bold text-2xl">
          <span>You're all set</span>
          {props.givenName && <span className="capitalize">, {props.givenName}</span>}
          <span>!</span>
        </div>
        <p className="text-sm max-w-[16rem]">Click continue to start exploring Local.</p>
      </div>

      <div className="my-5 grid grid-cols-1">
        <Button
          spacing="md"
          border="rounded"
          color="sky"
          theme="dark"
          text="Continue"
          size="md"
          onClick={props.onContinue}
        />
      </div>
    </div>
  );
};
