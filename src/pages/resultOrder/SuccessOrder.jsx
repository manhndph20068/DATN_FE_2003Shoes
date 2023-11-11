import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const SuccessOrder = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="success"
        title="Đơn hàng đã được đặt thành công !"
        subTitle="Thông tin tài khoản đã được gửi vào email của bạn."
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
        }
      />
      ;
    </>
  );
};
export default SuccessOrder;
