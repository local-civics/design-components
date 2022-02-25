import React from "react";
import { Button, Icon } from "../../../../components";

export type RoleSelectionProps = {
  role?: "student" | "educator" | "management";
  onStudent?: () => void;
  onEducator?: () => void;
};

export const RoleSelection = (props: RoleSelectionProps) => {
  return (
    <div className="w-full md:w-[24rem] shadow-sm bg-white rounded-md border border-slate-100 px-8 py-5 grid grid-cols-1 gap-4 justify-items-center">
      <div className="text-slate-600 w-14 h-14">
        <Icon name="profile" />
      </div>

      <div className="text-slate-600 text-center">
        <p className="font-bold text-2xl">What is your role?</p>
        <p className="text-sm">Pick your community role.</p>
      </div>

      <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 justify-between">
        <Button
          active={props.role === "student"}
          spacing="md"
          border="rounded"
          color="sky"
          theme="dark"
          text="Student"
          size="md"
          onClick={props.onStudent}
        />
        <Button
          active={props.role === "educator"}
          spacing="md"
          border="rounded"
          color="slate"
          theme="dark"
          text="Educator"
          size="md"
          onClick={props.onEducator}
        />
      </div>
    </div>
  );
};
