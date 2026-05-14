import * as React from "react";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";
import { PathwayProgressBarChart } from "../PathwayProgressBarChart/PathwayProgressBarChart";
import { SharedPathwayProps } from "../types";

export const PathwayTranscript = (props: SharedPathwayProps) => {
  const [layout, setLayout] = React.useState<"list" | "grid">("list");

  const badges = props.badges || [];
  const completedBadges = badges.filter((b: any) => !!b.completedAt);
  const inProgressBadges = badges.filter((b: any) => !b.completedAt && !!b.startedAt);

  const rootIds = Object.keys(props.categoryParents || {}).filter(id => !props.categoryParents?.[id]);
  const level2Ids = Object.keys(props.categoryParents || {}).filter(id => {
    const parentId = props.categoryParents?.[id];
    return parentId && rootIds.includes(parentId);
  });

  // Total Points Earned (Points for the top level categoryId)
  const targetKeys = props.rawCriteria || props.criteria || {};
  const topLevelId = rootIds.find(id => targetKeys[id] !== undefined) || rootIds[0];
  const totalPointsEarned = topLevelId ? (props.points?.[topLevelId] || 0) : 0;

  // 2. Badges Earned Count
  const badgesEarnedCount = completedBadges.length;

  // REQ 4: Seal Earned (Check points vs target for the categoryIds present)
  const criteriaKeys = Object.keys(targetKeys);
  const sealEarned = criteriaKeys.length > 0 && criteriaKeys.every(id => {
    const target = targetKeys[id] || 0;
    const earned = props.points?.[id] || 0;
    return earned >= target;
  });

  const safeRender = (val: any) => (typeof val === "string" || typeof val === "number" ? val : "");
  
  const renderBadgePool = (badgePool: any[], sectionTitle: string, statusLabel?: string) => {
    if (badgePool.length === 0) return null;

    return (
      <div className="space-y-8 pt-4">
        <div className="flex items-center gap-x-2 border-b border-zinc-100 pb-2">
           <h2 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{sectionTitle}</h2>
           <span className="bg-zinc-100 text-zinc-500 text-[10px] px-2 py-0.5 rounded-full font-bold">{badgePool.length}</span>
        </div>
        
        {level2Ids.map(l2Id => {
          const groupBadges = badgePool.filter((b: any) => b.categories.includes(l2Id));
          if (groupBadges.length === 0) return null;

          return (
            <div key={l2Id} className="space-y-4">
              <h3 className="font-bold text-base text-zinc-800 flex items-center gap-x-2">
                <div className="h-4 w-1 bg-blue-600 rounded-full" />
                {props.categoryNames?.[l2Id] || l2Id}
              </h3>
              <div className={layout === "grid" ? "grid grid-cols-3 gap-4" : "space-y-3"}>
                {groupBadges.map((b: any) => (
                  <div key={b.badgeId} className={`p-4 bg-white rounded-xl border border-zinc-200 shadow-sm ${layout === 'grid' ? 'flex flex-col' : 'flex items-center justify-between'}`}>
                    <div className="flex items-center gap-x-3">
                      <BadgeEmblem size="sm" iconURL={props.imageURL} />
                      <div>
                        <p className="text-xs font-bold text-zinc-800">{b.displayName}</p>
                        {statusLabel && <p className="text-[9px] text-amber-500 font-black uppercase mt-0.5">{statusLabel}</p>}
                      </div>
                    </div>
                    <span className="font-black text-blue-600 text-xs">{b.weight} pts</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };



  return (
    <div className="p-6 space-y-10 border-t border-zinc-100 bg-zinc-50/30 animate-in fade-in duration-500">
      {/* STUDENT HEADER */}
      <div className="grid grid-cols-3 gap-4 bg-white p-5 rounded-xl border border-zinc-100 shadow-sm text-sm">
        <div>
          <p className="text-zinc-400 uppercase text-[9px] font-black mb-1">Student</p>
          <p className="font-bold text-zinc-800">{safeRender(props.studentName) || "Guest User"}</p>
          <p className="text-zinc-500 text-[11px] mt-0.5">{safeRender(props.studentEmail)}</p>
        </div>
        <div>
          <p className="text-zinc-400 uppercase text-[9px] font-black mb-1">Organization</p>
          <p className="font-bold text-zinc-800">{safeRender(props.schoolName) || "Not Provided"}</p>
          <p className="text-zinc-500 text-[11px] mt-0.5">{props.gradeLevel ? `Grade ${safeRender(props.gradeLevel)}` : ""}</p>
        </div>
        <div>
          <p className="text-zinc-400 uppercase text-[9px] font-black mb-1">Status</p>
          <p className="text-blue-500 font-bold text-[10px] uppercase">Verified Record</p>
          <p className="text-zinc-400 text-[10px] mt-0.5">{props.today || new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* PATHWAY DETAILS & ACHIEVEMENTS SUMMARY */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">{props.title || "Untitled Pathway"}</h1>
          <p className="text-sm text-zinc-500 max-w-3xl leading-relaxed">{props.description || "No description provided for this pathway."}</p>
        </div>
        {/* 3-Column Metrics Bar (REQ 3: Ignored Lessons) */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-blue-600">{totalPointsEarned.toLocaleString()}</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Total Pts</span>
          </div>
          <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-blue-600">{badgesEarnedCount}</span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Badges Earned</span>
          </div>
          <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            {/* REQ 4: Seal Earned Boolean Display */}
            <span className={`text-2xl font-black ${sealEarned ? "text-emerald-500" : "text-zinc-300"}`}>
              {sealEarned ? "Yes" : "No"}
            </span>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Seal Earned</span>
          </div>
        </div>
      </section>

      {/* CRITERIA & PROGRESS BAR CHART */}
      <section>
        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-3">Criteria & Progress</p>
        <div className="p-5 border border-zinc-100 rounded-xl bg-white shadow-sm">
          <PathwayProgressBarChart targets={props.mappedTargets} points={props.mappedPoints} height="md" />
        </div>
      </section>

      {/* COMPLETED & IN PROGRESS ACTIVITY */}
      <section className="space-y-12">
        <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
          <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Activity History</p>
          <div className="flex bg-white border border-zinc-200 p-1 rounded-md text-[10px] font-bold uppercase">
            <button onClick={() => setLayout("list")} className={`px-3 py-1.5 rounded ${layout === "list" ? "bg-zinc-100 text-blue-600" : "text-zinc-400"}`}>List View</button>
            <button onClick={() => setLayout("grid")} className={`px-3 py-1.5 rounded ${layout === "grid" ? "bg-zinc-100 text-blue-600" : "text-zinc-400"}`}>Grid View</button>
          </div>
        </div>

        {/* Render Completed first, then In Progress below it */}
        {renderBadgePool(completedBadges, "Completed Activity")}
        {renderBadgePool(inProgressBadges, "In Progress", "Started")}
      </section>
    </div>
  );
};