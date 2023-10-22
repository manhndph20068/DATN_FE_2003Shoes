import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const NotPermitted = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you`re not authorzired to access this page"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
};
export default NotPermitted;
