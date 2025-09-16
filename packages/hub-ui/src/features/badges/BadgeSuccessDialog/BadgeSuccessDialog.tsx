import React from "react";
import { Icon } from "../../../components/Icon/Icon";
import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button";


/**
 * BadgeSuccessDialogProps
 */
export type BadgeSuccessDialogProps = {
  displayName?: string;
  xp?: number;
  level?: number;
  onClose?: () => void;
};

/**
 * BadgeSuccessDialog
 * @param props
 * @constructor
 */
export const BadgeSuccessDialog = (props: BadgeSuccessDialogProps) => {
  return (
    <Card onClose={props.onClose}>
      <div className="w-full px-8 pt-5 pb-12 shadow-sm grid grid-cols-1 gap-4 content-center justify-items-center">
        <div className="text-zinc-600 w-28 h-28">
          <Icon name="party popper" />
        </div>

        <div className="text-slate-600 text-center">
          <div className="font-bold text-lg">
            <span>Great Job!</span>
          </div>

          <div className="max-w-[22rem]">
            {!!props.xp && (
              <div className="text-sm">
                <span>{"You've just earned"}</span>
                <span className="ml-1 font-semibold text-green-500">{props.xp} XP</span>
                <span className="ml-1">points!</span>
              </div>
            )}

            {!!props.displayName && (
              <div className="mt-2 text-sm">
                <span>Check out your new</span>
                <span className="ml-1 font-semibold">{props.displayName}</span>
                <span className="ml-1">
                  Lv. {(props.level || 0) + 1} badge on your profile! Look out for more opportunities to earn!
                </span>
              </div>
            )}
          </div>
        </div>
        <a href="/home" className="mt-4">
          <Button
            color="sky"
            size="md"
            spacing="md"
            border="rounded"
            theme="light"
            text="Explore Other Badges"
          />
        </a>
      </div>
    </Card>
  );
};
