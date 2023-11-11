import {
  Button,
  Col,
  Divider,
  InputNumber,
  Popconfirm,
  Result,
  Row,
  Steps,
  message,
} from "antd";
// import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import {
  DeleteOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  doClearTempData,
  doDeleteItemCartAction,
  doDeleteItemCartAfterDoOrder,
  doInitalCartWithAccount,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";
import ViewOrder from "../../components/Order/ViewOrder";
import ViewPayment from "../../components/Order/ViewPayment";
import { useNavigate } from "react-router-dom";
import {
  callAddMethodPayment,
  callDoOrderByCustomer,
  callDoOrderByGuest,
  callGetCartByAccountId,
  callGetListCartDetailById,
} from "../../services/api.jsx";
import { doAddIdCart } from "../../redux/account/accountSlice.js";

const OrderPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const cart = useSelector((state) => state.order.cart);
  const tempDataOrder = useSelector((state) => state.order.tempData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetListCartDetail = async (id) => {
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
      handleGetListCartDetail(res?.data?.id);
      dispatch(doAddIdCart(res?.data?.id));
    }
  };

  const submitOrder = async (data) => {
    if (data.idAccount !== null) {
      const res = await callDoOrderByCustomer(data);
      if (res?.status === 0) {
        setCurrentStep(2);
        await callAddMethodPayment({
          orderId: res?.data?.id,
          method: "Thanh toán VNPAY",
          total: data.totalMoney,
          note: `Khách hàng thanh toán VNpay, mã giao dịch: ${data?.note}`,
          status: 1,
        });

        handleGetCartByAccountId(data.idAccount);
        dispatch(doClearTempData());
        // navigate("/order");
      }
      // else {
      //   message.error("Đặt hàng thất bại");
      // }
    } else {
      const res = await callDoOrderByGuest(data);
      if (res?.status === 0) {
        await callAddMethodPayment({
          orderId: res?.data?.id,
          method: "Thanh toán VNPAY",
          total: data.totalMoney,
          note: `Khách hàng thanh toán VNpay, mã giao dịch: ${data?.note}`,
          status: 1,
        });
        navigate("/order-success");
        setCurrentStep(2);
        dispatch(doDeleteItemCartAfterDoOrder());
        dispatch(doClearTempData());
      } else {
        message.error("Đặt hàng thất bại");
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const orderId = decodeURIComponent(urlParams.get("orderId"));
    const totalPrice = decodeURIComponent(urlParams.get("totalPrice"));
    const paymentTime = decodeURIComponent(urlParams.get("paymentTime"));
    const transactionId = decodeURIComponent(urlParams.get("transactionId"));
    console.log("urlParams", urlParams);
    console.log("orderId", orderId.trim());
    if (orderId.trim() !== "null") {
      tempDataOrder.note = orderId.trim();
      console.log("tempDataOrder", tempDataOrder);
      console.log("totalPrice", totalPrice);
      console.log("order success");
      if (tempDataOrder.idAccount !== null) {
        submitOrder(tempDataOrder);
        setCurrentStep(2);
        dispatch(doClearTempData());
      } else {
        submitOrder(tempDataOrder);
        setCurrentStep(2);
        dispatch(doClearTempData());
        dispatch(doDeleteItemCartAfterDoOrder());
      }
    }
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart.map((item) => {
        sum += item.quantity * item.detail.priceInput;
      });
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const steps = [
    {
      title: "Đặt hàng",
      status: "finish",
      icon: <ShoppingCartOutlined />,
    },
    {
      title: "Thanh Toán",
      status: "finish",
      icon: <SolutionOutlined />,
    },
    {
      title: "Done",
      status: "wait",
      icon: <SmileOutlined />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const continueShopping = () => {
    navigate("/");
  };
  const showHistory = () => {
    navigate("/history");
  };

  return (
    <div className="order-page-layout">
      <div
        className="order-page-container"
        style={{ maxWidth: 1290, margin: "0 auto" }}
      >
        <div className="order-step">
          <Steps current={currentStep} items={items} />
        </div>
        {currentStep === 0 && <ViewOrder setCurrentStep={setCurrentStep} />}
        {currentStep === 1 && <ViewPayment setCurrentStep={setCurrentStep} />}
        {currentStep === 2 && (
          <Result
            status="success"
            title="Đơn hàng đã được đặt thành công !"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button
                onClick={() => continueShopping()}
                type="primary"
                key="console"
              >
                Tiếp tục mua hàng
              </Button>,
              <Button onClick={() => showHistory()} key="buy">
                Lịch sử đơn hàng
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
};
export default OrderPage;
