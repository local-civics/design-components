import * as React from "react";
import { Icon } from "../../../components/Icon/Icon";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";
import { PathwayProgressBarChart } from "../PathwayProgressBarChart/PathwayProgressBarChart";
import { SharedPathwayProps } from "../types";

export const PathwayTranscript = (props: SharedPathwayProps) => {
  const [layout, setLayout] = React.useState<"list" | "grid">("list");
  const rootIds = Object.keys(props.categoryParents || {}).filter(id => !props.categoryParents?.[id]);
  const level2Ids = Object.keys(props.categoryParents || {}).filter(id => {
    const parentId = props.categoryParents?.[id];
    return parentId && rootIds.includes(parentId);
  });

  const completedBadges = props.badges.filter(b => !!b.completedAt);

  return (
    <div className="p-6 space-y-10 border-t border-zinc-100 bg-zinc-50/30 animate-in fade-in duration-500">
      <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-xl border border-zinc-100 shadow-sm text-sm">
        <div>
          <p className="text-zinc-400 uppercase text-[9px] font-black mb-1">Student</p>
          <p className="font-bold text-zinc-800">{props.studentName || "Guest User"}</p>
          <p className="text-zinc-500 text-[11px] mt-0.5">{props.studentEmail}</p>
        </div>
        <div>
          <p className="text-zinc-400 uppercase text-[9px] font-black mb-1">Organization</p>
          <p className="font-bold text-zinc-800">{props.schoolName || "Not Provided"}</p>
          <p className="text-zinc-500 text-[11px] mt-0.5">{props.gradeLevel ? `Grade ${props.gradeLevel}` : ""}</p>
        </div>
        <div>
          <p className="text-zinc-400 uppercase text-[9px] font-black mb-1">Status</p>
          <p className="text-blue-500 font-bold text-[10px] uppercase">Verified Record</p>
          <p className="text-zinc-400 text-[10px] mt-0.5">{props.today}</p>
        </div>
      </div>

      <section>
        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-3">Criteria & Progress</p>
        <div className="p-5 border border-zinc-100 rounded-xl bg-white shadow-sm">
          <PathwayProgressBarChart targets={props.mappedTargets} points={props.mappedPoints} height="md" />
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Completed Activity</p>
          <div className="flex bg-white border border-zinc-200 p-1 rounded-md">
            <button onClick={() => setLayout("list")} className={`p-1 rounded ${layout === "list" ? "bg-zinc-100 text-blue-600" : "text-zinc-400"}`}><Icon name="list" size="xs"/></button>
            <button onClick={() => setLayout("grid")} className={`p-1 rounded ${layout === "grid" ? "bg-zinc-100 text-blue-600" : "text-zinc-400"}`}><Icon name="grid" size="xs"/></button>
          </div>
        </div>

        {level2Ids.map(l2Id => {
          const groupBadges = completedBadges.filter(b => b.categories.includes(l2Id));
          if (groupBadges.length === 0) return null;

          return (
            <div key={l2Id} className="space-y-4">
              <h3 className="font-bold text-base text-zinc-800 flex items-center gap-x-2">
                <div className="h-4 w-1 bg-blue-600 rounded-full" />
                {props.categoryNames?.[l2Id] || l2Id}
              </h3>
              <div className={layout === "grid" ? "grid grid-cols-3 gap-4" : "space-y-3"}>
                {groupBadges.map(b => (
                  <div key={b.badgeId} className={`p-4 bg-white rounded-xl border border-zinc-200 shadow-sm ${layout === 'grid' ? 'flex flex-col' : 'flex items-center justify-between'}`}>
                    <div className="flex items-center gap-x-3">
                      <BadgeEmblem size="sm" iconURL={props.imageURL} />
                      <div>
                        <p className="text-xs font-bold text-zinc-800">{b.displayName}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {b.categories.filter(t => t !== l2Id && !rootIds.includes(t)).map(t => (
                            <span key={t} className="text-[8px] bg-zinc-100 px-1.5 py-0.5 rounded uppercase font-bold text-zinc-500">
                              {props.categoryNames?.[t] || t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="font-black text-blue-600 text-xs">{b.weight} pts</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};