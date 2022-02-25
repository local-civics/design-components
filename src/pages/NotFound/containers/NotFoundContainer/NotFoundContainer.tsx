import { useNavigate } from "react-router-dom";
import { NotFoundModal } from "../../components/NotFoundModal/NotFoundModal";

/**
 * A connected container for the not found page.
 * @constructor
 */
export const NotFoundContainer = () => {
  const navigate = useNavigate();
  return {
    NotFoundModal: () => <NotFoundModal visible onHome={() => navigate("/")} />,
  };
};
