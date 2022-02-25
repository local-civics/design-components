import React from "react";
import { Button, Icon } from "../../../../components";

export type LegalAgreementProps = {
  onDecline?: () => void;
  onAccept?: () => void;
};

export const LegalAgreement = (props: LegalAgreementProps) => {
  return (
    <div className="w-full md:w-[24rem] rounded-md bg-white border border-slate-100 px-8 py-5 shadow-sm grid grid-cols-1 gap-4 justify-items-center">
      <div className="text-slate-600 w-14 h-14">
        <Icon name="shield" />
      </div>

      <div className="text-slate-600 text-center w-[14rem] md:w-[16rem]">
        <p className="font-bold text-2xl">Local Civics Policies</p>
        <p className="text-sm">
          Confirm that you have read and agree to our{" "}
          <button
            className="text-sky-400 underline hover:text-sky-600 cursor-pointer"
            onClick={() => window.open("https://www.localcivics.io/terms-of-service", "_blank")}
          >
            Terms of Service
          </button>{" "}
          and{" "}
          <button
            className="text-sky-400 underline hover:text-sky-600 cursor-pointer"
            onClick={() => window.open("https://www.localcivics.io/privacy-policy", "_blank")}
          >
            Privacy Policy
          </button>
          .
        </p>
      </div>

      <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 justify-between">
        <Button spacing="md" border="rounded" color="sky" text="Decline" size="md" onClick={props.onDecline} />
        <Button
          icon="accept"
          spacing="md"
          border="rounded"
          color="sky"
          theme="dark"
          text="Accept"
          size="md"
          onClick={props.onAccept}
        />
      </div>
    </div>
  );
};
