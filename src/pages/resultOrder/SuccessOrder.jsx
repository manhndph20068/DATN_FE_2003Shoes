import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import {
  callFetchAccount,
  callGetCartByAccountId,
  callGetListCartDetailById,
} from "../../services/api";
import { useDispatch } from "react-redux";
import { doAddIdCart, doLogin } from "../../redux/account/accountSlice";
import { doInitalCartWithAccount } from "../../redux/order/orderSlice";
const SuccessOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetListCartDetailById = async (id) => {
    const res = await callGetListCartDetailById(id);
    console.log("res handleGetListCartDetailById", res);
    if (res?.status === 0) {
      dispatch(doInitalCartWithAccount(res.data));
    }
  };

  const handleGetCartByAccountId = async (id) => {
    const res = await callGetCartByAccountId(id);
    console.log("res handleGetCartBtAccountId", res);
    if (res?.status === 0) {
      handleGetListCartDetailById(res?.data?.id);
      dispatch(doAddIdCart(res?.data?.id));
    }
  };
  return (
    <>
      <Result
        status="success"
        title="Đơn hàng đã được đặt thành công !"
        subTitle="Thông tin tài khoản đã được gửi vào email của bạn."
        extra={
          <Button
            type="primary"
            onClick={async () => {
              const res = await callFetchAccount();
              if (res?.id) {
                dispatch(doLogin(res));
                handleGetCartByAccountId(res.id);
              }
              navigate("/");
            }}
          >
            Back Home
          </Button>
        }
      />
      ;
    </>
  );
};
export default SuccessOrder;
