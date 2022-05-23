/**
 * A connected container for assessments.
 * @constructor
 */
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useApi, useTenant } from "../../contexts/App";
import { LearningFormWorkflow } from "../../workflows/LearningFormWorkflow/LearningFormWorkflow";
import * as path from "path";

/**
 * Connected container for experience.
 * @constructor
 */
export const AssessmentContainer = () => {
  const tenant = useTenant();
  const params = useParams();
  const tenantName = params.tenantName || tenant.tenantName;
  const activityId = params.activityId;
  const navigate = useNavigate();
  const location = useLocation()

  return {
    OpenAssessment: () => {
      if (tenant.isLoading) {
        return null;
      }

      if (!tenantName || !activityId) {
        throw new Error("request must missing required params");
      }

      const [lecture, onAnswerChange, onSave] = useLecture(tenantName, activityId);
      return (
        <LearningFormWorkflow
          {...lecture}
          isLoading={lecture === null}
          onSubmit={() => onSave(true).then((err: any) => {
            if (!err) navigate(path.dirname(location.pathname));
          })}
          onAnswerChange={onAnswerChange}
          onClose={() => onSave().then((err: any) => {
            if (!err) navigate(path.dirname(location.pathname));
          })}
        />
      );
    },
  };
};

// A hook to fetch (and run through) a lecture
export const useLecture = (tenantName: string, activityId: string, refresh?: boolean) => {
  const [lecture, setLecture] = React.useState(null as any);
  const api = useApi();
  const location = useLocation();
  const [hasChanges, setHasChanges]= React.useState(false)

  React.useEffect(() => {
    setLecture(null);
    (async () => {
      const ctx = { referrer: location.pathname };
      const promises = await Promise.all([
        api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/activities/${activityId}`),
        api.do(ctx, "GET", "curriculum", `/activities/${activityId}/topic`),
        api.do(ctx, "GET", "curriculum", `/tenants/${tenantName}/activities/${activityId}/questions`),
      ]);
      setLecture({ ...promises[0], topic: promises[1], questions: promises[2] });
    })();
    return () => setLecture(null);
  }, [tenantName, activityId, api.accessToken, refresh]);

  const onAnswerChange = async (questionId: string, response: string, file?: Blob) => {
    if (!lecture || !lecture.questions) {
      return;
    }

    const promises: Promise<any>[] = [];
    const questions = [...lecture.questions];
    let questionIndex: number = -1;
    questions.map((question: any, i) => {
      if (question.questionId === questionId) {
        questionIndex = i;
        setHasChanges(true)

        if(question.imageRequired && file){
          const ctx = { referrer: location.pathname };
          const form = new FormData();
          form.append("object", file);
          promises.push(
              api.do(ctx, "PUT", "media", `/tenants/${tenantName}/store/answers/${question.questionId}`, {
                body: form,
              })
          );
        }
      }
    });

    const results = await Promise.all(promises);
    if (results.length > 0) {
      response = results[0];
    }

    if (questionIndex >= 0) {
      questions[questionIndex].response = response;
    }

    setLecture({ ...lecture, questions });
  };

  const onSave = async (submit: boolean) => {
    if(!hasChanges){
      return
    }

    if (!tenantName || !activityId) {
      throw new Error("missing required context for save");
    }

    const ctx = { referrer: location.pathname };
    return api.do(ctx, "PATCH", "curriculum", `/tenants/${tenantName}/activities/${activityId}/submit_assessment`, {
      body: {
        sagaId: lecture.sagaId,
        assessment: {
          submit,
          answers: lecture.questions.map((question: any) => {
            return { questionId: question.questionId, response: question.response };
          }),
        },
      },
    }).then((err: any) => {
      if(!err) setHasChanges(false)
      return err
    });
  };

  return [lecture, onAnswerChange, onSave];
};


