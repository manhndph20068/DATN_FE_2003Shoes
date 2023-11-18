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
  doClearTempCart,
  doClearTempData,
  doDeleteItemCartAction,
  doDeleteItemCartAfterDoOrder,
  doInitalCartWithAccount,
  doUpdateCartAction,
  doUpdateTempData,
} from "../../redux/order/orderSlice.js";
import ViewOrder from "../../components/Order/ViewOrder";
import ViewPayment from "../../components/Order/ViewPayment";
import { useNavigate } from "react-router-dom";
import {
  callAddMethodPayment,
  callDoOrderBuyNow,
  callDoOrderByCustomer,
  callDoOrderByGuest,
  callGetCartByAccountId,
  callGetListCartDetailById,
} from "../../services/api.jsx";
import { doAddIdCart } from "../../redux/account/accountSlice.js";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const CheckOnlineOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const cart = useSelector((state) => state.order.cart);
  const tempDataOrder = useSelector((state) => state.order.tempData);
  const newNote = useSelector((state) => state.order.tempData.note);
  const prodPaidNow = useSelector((state) => state.order.prodPaidNow);
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

  const submitOrder = async (data, noteVnp) => {
    if (data.idAccount !== null && Object.keys(prodPaidNow).length === 0) {
      const res = await callDoOrderByCustomer(data);
      if (res?.status === 0) {
        await callAddMethodPayment({
          orderId: res?.data?.id,
          method: "Thanh toán VNPAY",
          total: data.totalMoney,
          note: `Khách hàng thanh toán VNpay, mã giao dịch: ${noteVnp}`,
          status: 1,
        });

        handleGetCartByAccountId(data.idAccount);
        dispatch(doClearTempData());
        dispatch(doClearTempCart());
        navigate("/order-success");
      }
      // else {
      //   message.error("Đặt hàng thất bại");
      // }
    } else if (prodPaidNow.id !== undefined && data.idAccount !== null) {
      const res = await callDoOrderBuyNow(data);
      if (res?.status === 0) {
        await callAddMethodPayment({
          orderId: res?.data?.id,
          method: "Thanh toán VNPAY",
          total: data.totalMoney,
          note: `Khách hàng thanh toán VNpay, mã giao dịch: ${noteVnp}`,
          status: 1,
        });

        dispatch(doClearTempData());
        navigate("/order-success");
      }
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
        // setCurrentStep(2);
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
      // dispatch(doUpdateTempData(orderId.trim()));
      // tempDataOrder.note = orderId.trim();
      const noteVnp = orderId.trim();
      // const newTempDataOrder = useSelector((state) => state.order.tempData);
      console.log("tempDataOrder", tempDataOrder);
      console.log("tempDataOrder.note", tempDataOrder.note);
      console.log("totalPrice", totalPrice);
      console.log("order success");
      if (tempDataOrder.idAccount !== null) {
        submitOrder(tempDataOrder, noteVnp);
        dispatch(doClearTempCart());
        // setCurrentStep(2);
        dispatch(doClearTempData());
      } else {
        submitOrder(tempDataOrder, noteVnp);
        dispatch(doClearTempCart());
        // setCurrentStep(2);
        dispatch(doClearTempData());
        dispatch(doDeleteItemCartAfterDoOrder());
      }
    }
    if (+transactionId === 0) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ClimbingBoxLoader color="#0066b2" />
      </div>
    </>
  );
};
export default CheckOnlineOrder;
