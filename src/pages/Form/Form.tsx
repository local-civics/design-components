import { LearningFormContainer } from "../../containers/LearningForm/LearningFormContainer";

/**
 * A component for the learning forms page.
 * @constructor
 */
export const Form = () => {
  const { LearningForm } = LearningFormContainer();
  return <LearningForm />;
};
