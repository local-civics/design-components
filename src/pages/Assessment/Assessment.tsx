import { AssessmentContainer } from "../../containers/Assessment/AssessmentContainer";

/**
 * A component for the lecture page.
 * @constructor
 */
export const Assessment = () => {
  const { OpenAssessment } = AssessmentContainer();
  return <OpenAssessment />;
};
