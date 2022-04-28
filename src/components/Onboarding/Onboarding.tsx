import React from "react";
import { LegalAgreement } from "./LegalAgreement/LegalAgreement";
import { CommunitySearch } from "./CommunitySearch/CommunitySearch";
import { SearchResult } from "../Search/SearchResult/SearchResult";
import { RoleSelection } from "./RoleSelection/RoleSelection";
import { Registration } from "./Registration/Registration";
import { ImpactQuiz } from "./ImpactQuiz/ImpactQuiz";
import { Welcome } from "./Welcome/Welcome";
import { Modal } from "../Modal/Modal";

/**
 * OnboardingProps
 */
export type OnboardingProps = {
  isLoading?: boolean;
  hasOrganization?: boolean;
  hasPersona?: boolean;
  hasRegistration?: boolean;
  hasInterests?: boolean;

  persona?: string;
  givenName?: string;
  familyName?: string;
  grade?: number;
  impactStatement?: string;
  interests?: string[];
  organizations?: any[];

  onDeclineLegalAgreement?: () => void;
  onOrganizationSearch?: (search: string) => void;
  onJoinOrganization?: (organizationId: string, accessCode?: string) => void;
  onConfigureTenant: (changes: any) => void;
  onFinish?: () => void;
};

/**
 * A component for onboarding flow
 * @param props
 * @constructor
 */
export const Onboarding = (props: OnboardingProps) => {
  const [agreed, setAgreed] = React.useState(!!props.hasOrganization);
  const [organization, setOrganization] = React.useState(null as any);
  const [organizationOpen, setOrganizationOpen] = React.useState(!!props.organizations);

  const Delegate = () => {
    if (!agreed) {
      return <LegalAgreement onDecline={props.onDeclineLegalAgreement} onAccept={() => setAgreed(true)} />;
    }

    if (!props.hasOrganization) {
      return (
        <CommunitySearch
          open={organizationOpen}
          results={props.organizations?.map((organization) => {
            return (
              <SearchResult
                key={organization.id}
                title={organization.displayName || organization.name}
                onClick={() => {
                  setOrganization(organization);
                  setOrganizationOpen(false);
                }}
              />
            );
          })}
          onSearch={props.onOrganizationSearch}
          onJoin={(accessCode) => props.onJoinOrganization && props.onJoinOrganization(organization.id, accessCode)}
          onOpen={() => setOrganizationOpen(true)}
          onClose={() => setOrganizationOpen(false)}
        />
      );
    }

    if (!props.hasPersona) {
      return (
        <RoleSelection
          onStudent={() => props.onConfigureTenant && props.onConfigureTenant({ persona: "student" })}
          onEducator={() => props.onConfigureTenant && props.onConfigureTenant({ persona: "educator" })}
        />
      );
    }

    if (!props.hasRegistration) {
      return (
        <Registration
          persona={props.persona}
          givenName={props.givenName}
          familyName={props.familyName}
          grade={props.grade}
          impactStatement={props.impactStatement}
          onRegister={(registration) => props.onConfigureTenant && props.onConfigureTenant(registration)}
        />
      );
    }

    if (!props.hasInterests) {
      return (
        <ImpactQuiz
          persona={props.persona}
          interests={props.interests}
          onFinish={(interests) => props.onConfigureTenant && props.onConfigureTenant(interests)}
        />
      );
    }

    return <Welcome givenName={props.givenName} onContinue={props.onFinish} />;
  };

  return (
    <Modal isLoading={props.isLoading} plain visible>
      <Delegate />
    </Modal>
  );
};
