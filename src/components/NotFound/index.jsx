import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <FadeLoader color="#0066b2" />
    </div>
  );
};
export default NotFound;
