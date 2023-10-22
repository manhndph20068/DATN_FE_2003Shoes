import {
  Button,
  Col,
  Divider,
  InputNumber,
  Popconfirm,
  Result,
  Row,
  Steps,
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
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";
import ViewOrder from "../../components/Order/ViewOrder";
import ViewPayment from "../../components/Order/ViewPayment";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
