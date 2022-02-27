import { Report } from "@local-civics/js-client";
import React from "react";
import { useParams } from "react-router-dom";
import { IconName } from "../../../../components";
import { useApi, useIdentity } from "../../../../contexts/App";
import { ActivityProgress } from "../../components/ActivityProgress/ActivityProgress";
import { AchievementWidget } from "../../components/AchievementWidget/AchievementWidget";
import { ImpactWidget } from "../../components/ImpactWidget/ImpactWidget";
import { PathwayWidget } from "../../components/PathwayWidget/PathwayWidget";

/**
 * A connected container for the impact, pathway, and achievement widgets.
 * @constructor
 */
export const ImpactContainer = () => {
  const impact = useImpact();
  return {
    PathwayWidget: () => (
      <PathwayWidget resolving={impact.pathways === null}>
        <Pathways reports={impact.pathways || []} />
      </PathwayWidget>
    ),

    ImpactWidget: () => <ImpactWidget resolving={impact.overall === null} {...impact.overall} />,

    AchievementWidget: () => (
      <AchievementWidget
        resolving={impact.overall === null}
        badges={impact.overall?.badges}
        milestones={impact.overall?.milestones}
        reflections={impact.overall?.reflections}
      />
    ),
  };
};

/**
 * A hook to fetch a resident's impact.
 *
 * This hook must be called from the resident context.
 */
const useImpact = () => {
  const params = useParams();
  const identity = useIdentity();
  const api = useApi();
  const residentName = params.residentName;
  const [pathways, setPathways] = React.useState(null as Report[] | null);
  const [overall, setOverall] = React.useState(null as Report | null);

  React.useEffect(() => {
    if (identity.residentName && residentName && residentName !== "undefined") {
      (async () => {
        setPathways(await api.reports.list(residentName, { groupBy: "pathway" }));
        setOverall((await api.reports.list(residentName))[0]);
      })();
    }

    return () => {
      setPathways(null);
      setOverall(null);
    };
  }, [identity.residentName, residentName]);

  return {
    pathways,
    overall,
  };
};

const Pathways = ({ reports }: { reports: Report[] }) => {
  const pathways = {
    "college & career": {},
    "policy & government": {},
    "arts & culture": {},
    volunteer: {},
    recreation: {},
  };

  reports.map((report) => {
    if (report.pathway && pathways[report.pathway]) {
      pathways[report.pathway] = { ...report };
    }
  });

  return (
    <>
      {Object.entries(pathways).map(([pathway, props]) => {
        return <ActivityProgress key={pathway} {...props} icon={pathway as IconName} title={pathway} />;
      })}
    </>
  );
};
