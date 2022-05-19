import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi, useAuth, useTenant } from "../../contexts/App";
import { OnboardingWorkflow } from "../../workflows/OnboardingWorkflow/OnboardingWorkflow";

/**
 * A connected container for onboarding tenants
 * @constructor
 */
export const OnboardingContainer = () => {
  const tenant = useTenant();
  const auth = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const tenantName = params.tenantName;
  if (!tenantName) {
    throw new Error("request is missing required params");
  }
  const [search, organizations, searchOrganizations] = useOrganizations();
  const [membership, joinOrganization] = useJoinOrganization(tenantName);
  const [registration, setRegistration] = React.useState(null as any);

  return {
    Onboarding: () => (
      <OnboardingWorkflow
        {...tenant}
        {...registration}
        search={search}
        isLoading={tenant?.isLoading || membership === null}
        hasOrganization={!!membership && membership.length > 0}
        hasPersona={!!tenant?.persona}
        hasRegistration={!!tenant?.grade || !!tenant.impactStatement}
        hasInterests={!!tenant.interests}
        organizations={organizations}
        onDeclineLegalAgreement={auth.logout}
        onOrganizationSearch={searchOrganizations}
        onJoinOrganization={joinOrganization}
        onConfigureTenant={(conf) => {
          setRegistration(conf);
          tenant.configure(conf);
        }}
        onFinish={() => navigate(`/tenants/${tenant.tenantName}`)}
      />
    ),
  };
};

// A hook for searching organizations
const useOrganizations = () => {
  const [organizations, setOrganizations] = React.useState([] as any);
  const [search, setSearch] = React.useState(null as string | null);
  const location = useLocation();
  const api = useApi();

  return [
    search,
    organizations,
    async (search: string) => {
      if (!search || search === "undefined") {
        setSearch("");
        setOrganizations([]);
        return;
      }
      const ctx = { referrer: location.pathname };
      setSearch(search);
      setOrganizations(
        await api.do(ctx, "GET", "identity", "/organizations", {
          query: {
            q: search,
          },
        })
      );
    },
  ];
};

// A hook for joining organizations
const useJoinOrganization = (tenantName: string) => {
  const [organizations, setOrganizations] = React.useState(null as any);
  const organizationKey = JSON.stringify(organizations);
  const location = useLocation();
  const api = useApi();
  const ctx = { referrer: location.pathname };

  React.useEffect(() => {
    (async () => {
      setOrganizations(await api.do(ctx, "GET", "identity", `/tenants/${tenantName}/organizations`));
    })();
    return () => setOrganizations(null);
  }, [!!organizationKey]);

  return [
    organizations,
    async (organizationName: string, accessCode?: string) => {
      if (!accessCode) {
        setOrganizations(null);
        return;
      }

      return api
        .do(ctx, "PUT", "identity", `/tenants/${tenantName}/organizations/${organizationName}`, {
          body: {
            accessCode,
          },
        })
        .then(async (err) => {
          if (!err) {
            setOrganizations(await api.do(ctx, "GET", "identity", `/tenants/${tenantName}/organizations`));
            return;
          }
          setOrganizations([]);
        });
    },
  ];
};
