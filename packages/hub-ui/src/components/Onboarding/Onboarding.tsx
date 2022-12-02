import React from "react";
import { Modal } from "../Modal";
import { SearchResult } from "../Search";
import { LegalAgreement } from "./LegalAgreement/LegalAgreement";
import { CommunitySearch } from "./CommunitySearch/CommunitySearch";
import { RoleSelection } from "./RoleSelection/RoleSelection";
import { Registration } from "./Registration/Registration";
import { ImpactQuiz } from "./ImpactQuiz/ImpactQuiz";
import { Welcome } from "./Welcome/Welcome";

/**
 * OnboardingProps
 */
export type OnboardingProps = {
  isLoading?: boolean;
  hasOrganization?: boolean;
  hasRegistration?: boolean;
  hasInterests?: boolean;

  search?: string;
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
 * A component for onboarding
 * @param props
 * @constructor
 */
export const Onboarding = (props: OnboardingProps) => {
  return (
    <Modal stage isLoading={props.isLoading} inline plain visible>
      <Delegate {...props} />
    </Modal>
  );
};

/**
 * Delegate component for onboarding
 * @param props
 * @constructor
 */
const Delegate = (props: OnboardingProps) => {
  const [agreed, setAgreed] = React.useState(!!props.hasOrganization || props.search !== null);
  const [interests, setInterests] = React.useState(false);
  const [organization, setOrganization] = React.useState(null as any);
  const [organizationOpen, setOrganizationOpen] = React.useState(!!props.search);
  const [persona, setPersona] = React.useState("")

  if (!agreed) {
    return <LegalAgreement onDecline={props.onDeclineLegalAgreement} onAccept={() => setAgreed(true)} />;
  }

  if (!props.hasOrganization) {
    return (
      <CommunitySearch
        {...organization}
        open={organizationOpen}
        value={props.search}
        results={
          props.organizations &&
          props.organizations.map((organization) => {
            return (
              <SearchResult
                key={organization.organizationId}
                title={organization.displayName}
                onClick={() => {
                  setOrganization(organization);
                  setOrganizationOpen(false);
                }}
              />
            );
          })
        }
        onSearch={props.onOrganizationSearch}
        onJoin={(accessCode) => props.onJoinOrganization && props.onJoinOrganization(organization.organizationId, accessCode)}
        onOpen={() => setOrganizationOpen(true)}
        onClose={() => setOrganizationOpen(false)}
      />
    );
  }

  if (!props.hasRegistration) {
    if (!persona) {
      return (
          <RoleSelection
              onStudent={() => setPersona("student")}
              onEducator={() => setPersona("educator")}
          />
      );
    }


    return (
      <Registration
        persona={persona}
        givenName={props.givenName}
        familyName={props.familyName}
        grade={props.grade}
        impactStatement={props.impactStatement}
        onRegister={(registration) => props.onConfigureTenant && props.onConfigureTenant(registration)}
      />
    );
  }

  if (!interests && !props.hasInterests) {
    return (
      <ImpactQuiz
        persona={props.persona}
        interests={props.interests}
        onFinish={(interests) => {
          setInterests(true)
          props.onConfigureTenant && props.onConfigureTenant({ interests })
        }}
      />
    );
  }

  return <Welcome givenName={props.givenName} onContinue={props.onFinish} />;
};
