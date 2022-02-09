import { useNavigate } from "react-router-dom";
import { Modal } from "../../components";

export const Settings = () => {
  const navigate = useNavigate();

  return <Modal visible onClose={() => navigate(-1)}></Modal>;
};
