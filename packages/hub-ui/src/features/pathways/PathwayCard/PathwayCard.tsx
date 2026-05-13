import * as React from "react";
import { Card } from "../../../components/Card/Card";
import { Button } from "../../../components/Button/Button";
import { BadgeEmblem } from "../../badges/BadgeEmblem/BadgeEmblem";

import { PathwayOverview } from "../PathwayOverview/PathwayOverview";
import { PathwayTranscript } from "../PathwayTranscript/PathwayTranscript";

import { PathwayCardProps, SharedPathwayProps } from "../types";

/**
 * PathwayCard
 * Controller/router between Overview and Transcript views.
 */
export const PathwayCard = (props: PathwayCardProps) => {
  const [view, setView] = React.useState<"overview" | "transcript">("overview");

  // Logic: Calculate dynamic date of issue for the transcript
  const today = React.useMemo(() => new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }), []);

  /**
   * Logic: Map technical IDs to  "Proper Names" for the ProgressBar chart.
   * This ensures the chart displays "Civic Knowledge" instead of "civic-id".
   */
  const mappedTargets = React.useMemo(() => {
    const t: Record<string, number> = {};
    Object.entries(props.criteria ?? {}).forEach(([id, val]) => {
      t[props.categoryNames?.[id] || id] = val;
    });
    return t;
  }, [props.criteria, props.categoryNames]);

  const mappedPoints = React.useMemo(() => {
    const p: Record<string, number> = {};
    Object.entries(props.points ?? {}).forEach(([id, val]) => {
      p[props.categoryNames?.[id] || id] = val;
    });
    return p;
  }, [props.points, props.categoryNames]);

  // Combine data into the Shared interface expected by sub-components
  const sharedProps: SharedPathwayProps = {
    ...props,
    mappedTargets,
    mappedPoints,
    today,
    badges: props.badges || [],
  };

  return (
    <Card onClose={props.onClose}>
      <div className="pb-5 text-zinc-600 min-w-[35rem] max-w-[50rem]">
        
        {/* HEADER: Shared between both views */}
        <div className="pb-5 px-5 flex justify-between items-start">
          <div className="flex gap-x-3">
            <BadgeEmblem iconURL={props.imageURL} alt={props.title} size="md" />
            <div className="max-w-[20rem]">
              <p className="font-bold text-lg leading-tight">{props.title}</p>
              <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider mt-1">
                {view === "overview" ? "Pathway Overview" : "Official Transcript"}
              </p>
            </div>
          </div>

          <div className="flex gap-x-2">
            {view === "transcript" && (
              <Button
                text="Print"
                size="sm"
                theme="light"
                color="blue"
                border="rounded"
                onClick={() => window.print()}
              />
            )}
            <Button
              text={view === "overview" ? "View Transcript" : "Back"}
              size="sm"
              theme={view === "overview" ? "light" : "dark"}
              color="blue"
              border="rounded"
              onClick={() => setView(view === "overview" ? "transcript" : "overview")}
            />
          </div>
        </div>

        {/* VIEW ROUTING */}
        {view === "overview" ? (
          <>
            <PathwayOverview {...sharedProps} />
            
            {/* Footer: Main action button only for Overview */}
            <div className="pt-5 px-5 flex border-t border-zinc-100">
              <div className="w-full max-w-[7rem] ml-auto">
                <Button
                  disabled={true} 
                  onClick={props.onSubmit}
                  spacing="sm"
                  border="rounded"
                  size="full:sm"
                  color="blue"
                  theme="dark"
                  text="Submit"
                />
              </div>
            </div>
          </>
        ) : (
          <PathwayTranscript {...sharedProps} />
        )}
      </div>
    </Card>
  );
};