import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PathwayHelpComponent } from "./component";
import path from "path";

/**
 * Pathway help modal
 * @constructor
 */
export const PathwayHelpModal = () => {
  const name = "help/pathway";
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const parent = path.dirname(path.dirname(path.dirname(location.pathname)));
  const onClose = () => navigate(parent);
  const getStage = (stage: string) => {
    if (["intro", "gist", "farewell"].includes(stage)) {
      return stage as "intro" | "gist" | "farewell";
    }
    return "intro";
  };
  const stage = getStage(params.stage || "intro");
  const onNextStage = () => {
    switch (stage) {
      case "intro":
        navigate(`${parent}/${name}/gist`);
        break;
      case "gist":
        navigate(`${parent}/${name}/farewell`);
        break;
      case "farewell":
        onClose();
        break;
    }
  };
  return (
    <article className="grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen p-5 bg-gray-500/80 z-50">
      <PathwayHelpComponent
        onClose={onClose}
        stage={stage}
        onNextStage={onNextStage}
      />
    </article>
  );
};
