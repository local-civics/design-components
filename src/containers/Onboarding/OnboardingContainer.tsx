import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { useApi, useAuth, useTenant } from "../../contexts/App";
import {Onboarding} from "../../components/Onboarding/Onboarding";

/**
 * A connected container for onboarding tenants
 * @constructor
 */
export const OnboardingContainer = () => {
  const tenant = useTenant();
  const auth = useAuth();
  const navigate = useNavigate()
  const params = useParams()
  const tenantName = params.tenantName
  if (!tenantName) {
    throw new Error("request is missing required params");
  }
  const [organizations, searchOrganizations] = useOrganizations()
  const [membership, joinOrganization] = useJoinOrganization(tenantName)
  return {
    Onboarding: () => <Onboarding
        {...tenant}
        isLoading={tenant?.isLoading || organizations === null}
        hasOrganization={membership && membership.length > 0}
        hasPersona={!!tenant?.persona}
        hasRegistration={!!tenant?.grade || !!tenant.impactStatement}
        hasInterests={!!tenant.interests || !!tenant.impactStatement}
        organizations={organizations}
        onDeclineLegalAgreement={auth.logout}
        onOrganizationSearch={searchOrganizations}
        onJoinOrganization={joinOrganization}
        onConfigureTenant={tenant.configure}
        onFinish={() => navigate(`/tenants/${tenant.tenantName}`)}
    />,
  };
};

// A hook for searching organizations
const useOrganizations = () => {
  const [organizations, setOrganizations] = React.useState(null as any)
  const location = useLocation()
  const api = useApi();

  return [organizations, async (search: string) => {
    if (!search || search === "undefined") {
      setOrganizations(null)
      return;
    }
    const ctx = {referrer: location.pathname}
    setOrganizations(api.do(ctx, "GET", "identity", "/organizations", {
      query: {
        q: search
      }
    }))
  }]
}

// A hook for joining organizations
const useJoinOrganization = (tenantName: string) => {
  const [organizations, setOrganizations] = React.useState(null as any)
  const organizationKey = JSON.stringify(organizations)
  const location = useLocation()
  const api = useApi();
  const ctx = {referrer: location.pathname}

  React.useEffect(() => {
    (async () => {
      setOrganizations(await api.do(ctx, "GET", "identity", `/tenants/${tenantName}/organizations`))
    })()
    return () => setOrganizations(null)
  }, [organizationKey])

  return [organizations, async (organizationName: string, accessCode?: string) => {
    if(!accessCode){
      setOrganizations(null);
      return
    }

    return api.do(ctx, "PUT", "identity", `/tenants/${tenantName}/organizations/${organizationName}`, {
      body: {
        accessCode,
      }
    }).then(() => setOrganizations([]))
  }]
}
