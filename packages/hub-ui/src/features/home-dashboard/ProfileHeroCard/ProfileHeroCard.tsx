import * as React from "react";
import { Icon } from "../../../components/Icon";
import { Button } from "../../../components/Button";
import { Loader } from "../../../components/Loader";
import { compact } from "../../../utils/numbers";
import { Pill } from "../Pill/Pill";

/**
 * ProfileHeroCardProps
 */
export type ProfileHeroCardProps = {
  isLoading?: boolean;
  avatarURL?: string;
  givenName?: string;
  familyName?: string;
  createdAt?: string;
  online?: boolean;
  impactStatement?: string;
  placeName?: string;
  communityName?: string;
  level?: number;
  xp?: number;
  nextXP?: number;

  onEdit?: () => void;
};

/**
 * The student dashboard's profile summary: avatar/name/meta (formerly `ProfileWidget`), bio and
 * place/community (formerly `AboutWidget`), and level/XP progress (formerly `ImpactWidget`)
 * consolidated into a single card, matching Mockup I's layout and color treatment.
 * @param props
 * @constructor
 */
export const ProfileHeroCard = (props: ProfileHeroCardProps) => {
  const hasContent = props.givenName || props.familyName;
  const xp = props.xp || 0;
  const nextXP = props.nextXP || 0;
  const pct = nextXP ? Math.min(100, Math.round((xp / nextXP) * 100)) : 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-sky-blue-400/20 bg-white shadow-[0_4px_24px_rgba(59,208,242,0.10)]">
      <div className="h-1 bg-gradient-to-r from-sky-blue-400 via-mint-400 to-gold-400" />
      <div className="p-5">
        <Loader isLoading={props.isLoading}>
          {hasContent && (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src={props.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg"}
                    alt="avatar"
                    className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  {props.online && (
                    <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-mint-400" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-xl font-extrabold capitalize text-dark-blue-400">
                    {props.givenName} {props.familyName}
                  </h2>

                  <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
                    {props.createdAt && <span>Member since {new Date(props.createdAt).getFullYear()}</span>}
                    {props.communityName && (
                      <span className="flex items-center gap-1">
                        <span className="h-3.5 w-3.5 text-slate-500">
                          <Icon name="college & career" />
                        </span>
                        {props.communityName}
                      </span>
                    )}
                    {props.placeName && (
                      <span className="flex items-center gap-1">
                        <span className="h-3.5 w-3.5 text-slate-500">
                          <Icon name="pin" />
                        </span>
                        {props.placeName}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex gap-2">
                    {!!props.level && <Pill label={`Level ${props.level}`} accent="gold" />}
                    {!!props.xp && <Pill label={`${compact(props.xp)} XP`} accent="cyan" />}
                  </div>
                </div>

                {props.onEdit && (
                  <Button
                    text="Edit Profile"
                    icon="edit"
                    color="slate:sky"
                    border="rounded-sm"
                    size="sm"
                    onClick={props.onEdit}
                  />
                )}
              </div>

              {props.impactStatement && <p className="text-sm text-slate-500">{props.impactStatement}</p>}

              <div className="border-t border-sky-blue-400/15 pt-4">
                <p className="mb-1.5 text-xs text-slate-400">Impact Score</p>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-sky-blue-400/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-blue-400 to-mint-400 shadow-[0_0_8px_rgba(30,226,175,0.6)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-xl font-extrabold text-dark-blue-400">{compact(xp)}</span>
                  <span className="text-sm font-semibold text-slate-500">XP</span>
                  {!!nextXP && (
                    <span className="ml-auto text-xs text-slate-400">
                      {compact(Math.max(nextXP - xp, 0))} to next level
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </Loader>
      </div>
    </div>
  );
};
