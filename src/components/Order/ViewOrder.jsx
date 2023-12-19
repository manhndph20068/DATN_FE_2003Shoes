import {
  Col,
  Divider,
  Empty,
  InputNumber,
  Popconfirm,
  Row,
  Steps,
  Checkbox,
  message,
} from "antd";

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
  doDeleteItemCartAction,
  doInitalCartWithAccount,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";
import {
  callAddToCartAtCartPageWithAccount,
  callDeleteCartDetail,
  callGetListCartDetailById,
  callUpdateCartDetailStatus,
} from "../../services/api.jsx";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ViewOrder = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const { setCurrentStep } = props;
  const cart = useSelector((state) => state.order.cart);
  const idCart = useSelector((state) => state.account.idCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCartWithAccount = async (idCart, idShoeDetail, qty) => {
    const res = await callAddToCartAtCartPageWithAccount(
      idCart,
      idShoeDetail,
      qty
    );
    if (res?.status === 0) {
      handleGetListCartDetailById(idCart);
    }
  };

  const handleUpdateStatusCart = async (idCart, idShoeDetail, status) => {
    const res = await callUpdateCartDetailStatus(idCart, idShoeDetail, status);
    if (res?.status === 0) {
      handleGetListCartDetailById(idCart);
    }
  };

  const handleDeleteCartDetail = async (idCart, idShoeDetail) => {
    const res = await callDeleteCartDetail(idCart, idShoeDetail);
    if (res?.status === 0) {
      handleGetListCartDetailById(idCart);
    }
  };

  const handleGetListCartDetailById = async (id) => {
    const res = await callGetListCartDetailById(id);
    if (res?.status === 0) {
      dispatch(doInitalCartWithAccount(res.data));
    }
  };

  const handleChangeInput = (value, item) => {
    console.log("value", value);
    console.log("item", item);
    console.log("idCart", idCart);
    console.log("idShoeDetail", item.detail.id);
    if (value < 0 || !value) {
      message.error("Số lượng không đủ");
      return;
    }

    if (value > item.detail.qty) {
      message.error("Số lượng không đủ");
      return;
    }

    if (idCart !== null) {
      if (!isNaN(value)) {
        handleAddToCartWithAccount(idCart, +item.detail.id, +value);
      }
    } else {
      if (!isNaN(value)) {
        dispatch(
          doUpdateCartAction({
            quantity: value,
            detail: item,
            id: item.id,
            status: item.status,
          })
        );
      }
    }
  };

  const confirmDelete = (item) => {
    if (idCart !== null) {
      handleDeleteCartDetail(+idCart, +item.id);
      // handleGetListCartDetailById(idCart);
    } else {
      dispatch(doDeleteItemCartAction(item.id));
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart
        .filter((item) => item.status === 1)
        .map((item) => {
          sum += item.quantity * item.detail.priceInput;
        });

      setTotalPrice(sum);
      setNextStep(1);
    } else {
      setTotalPrice(0);
      setNextStep(0);
    }
  }, [cart, nextStep]);

  const handlePayment = () => {
    setCurrentStep(1);
  };

  const handleChangeCheckBox = (value, item) => {
    console.log("---------");
    console.log("value", value.target.checked);
    console.log("item", item);
    console.log("idCart", idCart);
    console.log("idShoeDetail", item.detail.id);
    if (value.target.checked) {
      if (idCart !== null) {
        handleUpdateStatusCart(idCart, +item.detail.id, 1);
      } else {
        dispatch(
          doUpdateCartAction({
            quantity: item.quantity,
            detail: item,
            id: item.id,
            status: 1,
          })
        );
      }
    } else {
      if (idCart !== null) {
        handleUpdateStatusCart(idCart, +item.detail.id, 0);
      } else {
        dispatch(
          doUpdateCartAction({
            quantity: item.quantity,
            detail: item,
            id: item.id,
            status: 0,
          })
        );
      }
    }
  };
  return (
    <>
      <Row gutter={[20, 20]} style={{ justifyContent: "space-between" }}>
        <Col lg={17} md={15} xs={24} className="order-left-content">
          <div
            className="header-content"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/productions");
            }}
          >
            <span style={{ margin: "0px 3px 0 0" }}>
              <BiArrowBack />
            </span>
            <span>Trang mua hàng</span>
          </div>
          {cart?.length && nextStep > 0 ? (
            cart.map((item, index) => {
              const itemStyle = {
                backgroundColor: item.status === 3 ? "#FFFAFA" : "none",
              };
              return (
                <div className="cart-item" key={`id${index}`} style={itemStyle}>
                  <div className="item-check-box">
                    {item.status === 3 ? (
                      <></>
                    ) : (
                      <Checkbox
                        checked={item.status === 1 ? true : false}
                        onChange={(value) => handleChangeCheckBox(value, item)}
                      ></Checkbox>
                    )}
                  </div>
                  <img className="item-img" src={item.detail.thumbnail} />
                  <div
                    className="item-name"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 15,
                    }}
                  >
                    <span>{item.detail.code}</span>
                    {item.status === 3 && (
                      <span style={{ color: "red" }}>
                        Số lượng không khả dụng!
                      </span>
                    )}
                  </div>
                  <div className="item-price">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.detail.priceInput)}
                  </div>
                  <InputNumber
                    className="item-input"
                    onChange={(value) => handleChangeInput(value, item)}
                    value={item.quantity}
                    hidden={item.status === 3 ? true : false}
                  />
                  <div className="item-total-price">
                    Tổng:
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.detail.priceInput * item.quantity)}
                  </div>
                  <div className="item-delete">
                    <Popconfirm
                      placement="top"
                      title={`Bạn có muốn xoá sản phẩm này không?`}
                      onConfirm={() => confirmDelete(item)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                minHeight: "11.8rem",
                backgroundColor: "white",
                padding: "15px",
                marginTop: "15px",
                borderRadius: "4px",
              }}
            >
              <Empty style={{ paddingTop: "20px" }} />
            </div>
          )}
        </Col>
        <Col lg={7} md={9} xs={24} className="order-right-content">
          <div className="order-content">
            <div className="order-tam-tinh">
              <span>Tạm tính:</span>
              <span>
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice || 0)}
              </span>
            </div>

            <Divider />
            <div className="order-tong">
              <span>Tổng:</span>
              <span style={{ color: "red" }}>
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice || 0)}
              </span>
            </div>
            <Divider />
            {totalPrice > 0 ? (
              <div className="order-btn-paid" onClick={() => handlePayment()}>
                <span className="order-btn-paid-title">
                  Mua Hàng(
                  {cart?.filter((item) => item.status === 1)?.length ?? 0})
                </span>
              </div>
            ) : (
              <div
                className="order-btn-paid"
                style={{ backgroundColor: "grey" }}
              >
                <span className="order-btn-paid-title">
                  Mua Hàng(
                  {cart?.filter((item) => item.status === 1)?.length ?? 0})
                </span>
              </div>
            )}
            {/* <div className="order-btn-paid" onClick={() => handlePayment()}>
              <span className="order-btn-paid-title">
                Mua Hàng({cart?.length ?? 0})
              </span>
            </div> */}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ViewOrder;
