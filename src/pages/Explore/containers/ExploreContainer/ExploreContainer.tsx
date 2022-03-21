import { WorkspaceActivitiesView } from "@local-civics/js-client";
import React, { useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../components";
import { useApi, useIdentity } from "../../../../contexts/App";
import { Exhibition } from "../../components/Exhibition/Exhibition";
import { Experience as ExperienceComponent } from "../../components/Experience/Experience";
import { FilterList } from "../../components/FilterList/FilterList";
import { Gallery } from "../../components/Gallery/Gallery";
import { Pathway } from "../../components/Pathway/Pathway";
import { PathwayList } from "../../components/PathwayList/PathwayList";

export const ExploreContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pathways, setPathways] = React.useState({} as Record<string, boolean>);
  const togglePathway = (pathway: string) => setPathways({ ...pathways, [pathway]: !pathways[pathway] });
  const experiences = useExperiences(
    Object.entries(pathways)
      .filter(([, present]) => present)
      .map(([v]) => v)
  );

  const ExperienceList = () => {
    const [open, setOpen] = React.useState(false);
    const primary = !experiences?.top ? null : experiences.top.length > 0 ? experiences?.top[0] : null;

    return (
      <>
        <Search value={experiences.search} send={(search?: string) => experiences.setSearch(search)} />
        <FilterList tags={experiences.tags || null} onTagClick={experiences.setTags} />
        <Gallery
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          resolving={experiences.resolving}
          primary={
            primary && (
              <ExperienceComponent {...primary} onClick={() => navigate(`${location.pathname}/${primary.id}`)} />
            )
          }
          top={
            experiences?.top &&
            experiences?.top?.length > 0 && (
              <Exhibition>
                {experiences?.top.map((ex) => {
                  return (
                    <ExperienceComponent
                      key={`${ex.marketId}${ex.id}`}
                      {...ex}
                      onClick={() => navigate(`${location.pathname}/${ex.id}`)}
                    />
                  );
                })}
              </Exhibition>
            )
          }
          soonest={
            experiences?.upcoming &&
            experiences?.upcoming?.length > 0 && (
              <Exhibition>
                {experiences?.upcoming.map((ex) => {
                  return (
                    <ExperienceComponent
                      key={`${ex.marketId}${ex.id}`}
                      {...ex}
                      onClick={() => navigate(`${location.pathname}/${ex.id}`)}
                    />
                  );
                })}
              </Exhibition>
            )
          }
          milestones={
            experiences?.milestones &&
            experiences?.milestones?.length > 0 && (
              <Exhibition>
                {experiences?.milestones.map((ex) => {
                  return (
                    <ExperienceComponent
                      key={`${ex.marketId}${ex.id}`}
                      {...ex}
                      onClick={() => navigate(`${location.pathname}/${ex.id}`)}
                    />
                  );
                })}
              </Exhibition>
            )
          }
          count={experiences.suggested?.length}
          filtered={
            experiences?.suggested &&
            experiences?.suggested?.length > 0 && (
              <Exhibition>
                {experiences?.suggested.map((ex) => {
                  return (
                    <ExperienceComponent
                      key={`${ex.marketId}${ex.id}`}
                      {...ex}
                      onClick={() => navigate(`${location.pathname}/${ex.id}`)}
                    />
                  );
                })}
              </Exhibition>
            )
          }
        />
      </>
    );
  };

  return {
    PathwayList: () => (
      <PathwayList>
        <Pathway
          onClick={() => togglePathway("policy & government")}
          active={pathways["policy & government"]}
          name="policy & government"
        />
        <Pathway
          onClick={() => togglePathway("arts & culture")}
          active={pathways["arts & culture"]}
          name="arts & culture"
        />
        <Pathway onClick={() => togglePathway("recreation")} active={pathways["recreation"]} name="recreation" />
        <Pathway onClick={() => togglePathway("volunteer")} active={pathways["volunteer"]} name="volunteer" />
        <Pathway
          onClick={() => togglePathway("college & career")}
          active={pathways["college & career"]}
          name="college & career"
        />
      </PathwayList>
    ),
    Gallery: () => <ExperienceList />,
  };
};

const useExperiences = (pathways?: string[]) => {
  const [search, setSearch] = React.useState(undefined as string | undefined);
  const [resolving, setResolving] = React.useState(false);
  const qp = new URLSearchParams(location.search);
  const params = useParams();
  const identity = useIdentity();
  const primaryOrganization =
    identity?.organizations && identity.organizations.length > 0 ? identity.organizations[0] : {};
  const api = useApi();
  const [experiences, setExperiences] = React.useState(null as WorkspaceActivitiesView | null);
  const [tags, setTags] = React.useState(undefined as string[] | undefined);

  React.useEffect(() => {
    if (resolving) {
      return;
    }

    setExperiences(null);
    setResolving(true);

    (async () => {
      if (!primaryOrganization.nickname) {
        setResolving(false);
        return;
      }

      const name = qp.get("name");
      const skills = params.skill && params.skill !== "undefined" ? [params.skill] : qp.getAll("skills");
      setExperiences(
        await api.curriculum.viewMarketplaceActivities(primaryOrganization.nickname, {
          name: search || name || "",
          tags,
          skills,
          pathways,
        })
      );

      setResolving(false);
    })();
    return () => {
      setExperiences(null);
      setResolving(false);
    };
  }, [pathways?.length, params.skill, identity.nickname, identity.organizations, search, tags?.length]);

  return { ...experiences, resolving, search, setSearch, tags, setTags };
};

const debounce = (func: (search: string) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (search: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(search), delay);
  };
};

const Search = ({ send, value }: { value?: string; send: (search?: string) => void }) => {
  const handler = useCallback(debounce(send, 500), []);
  return (
    <div className="relative block">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 top-0 flex items-center pl-2">
          <Button icon="search" />
        </span>
        <input
          autoFocus={true}
          defaultValue={value}
          onChange={(e) => handler(e.target.value)}
          className="placeholder:text-slate-400 text-slate-400 block bg-white w-full text-sm border border-slate-300 rounded-md py-3 px-8 shadow-sm cursor-pointer hover:bg-sky-50 hover:border-sky-100 hover:text-slate-500 hover:placeholder:text-slate-600 focus:outline-none hover:bg-sky-50 hover:border-sky-100"
          type="text"
          name="search"
          placeholder="Search for activities..."
        />
      </label>
    </div>
  );
};
