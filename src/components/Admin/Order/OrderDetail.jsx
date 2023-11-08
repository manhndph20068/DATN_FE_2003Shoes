import React from "react";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaBug, FaRegCalendarCheck, FaRegFileAlt } from "react-icons/fa";
import {
  AiOutlineFileSync,
  AiOutlineFileAdd,
  AiOutlineFileExcel,
} from "react-icons/ai";
import "./OrderDetail.scss";
import {
  callGetListOrderHistoryById,
  callGetOrderByCode,
  callGetOrderDetailAtCounterById,
  callListMethodPayment,
} from "../../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Divider, Row, Table, Tag } from "antd";
import ModalShowDetailOrder from "./ModalShowDetailOrder";
const OrderDetail = () => {
  const [dataOrder, setDataOrder] = useState({});
  const [historyOrder, setHistoryOrder] = useState([]);
  const [paymentMethodOrder, setPaymentMethodOrder] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [openModalShowOrderDetail, setOpenModalShowOrderDetail] =
    useState(false);

  let param = new URLSearchParams(location.search);
  let code = param.get("code");
  const navigate = useNavigate();

  const handleGetOrder = async () => {
    const res = await callGetOrderByCode(code);
    console.log("res", res);
    if (res.status === 0) {
      console.log("res.data", res.data);

      setDataOrder(res.data);
      const resCallGetListOrderHistory = await callGetListOrderHistoryById(
        res.data.id
      );
      const resCallGetOrderDetail = await callGetOrderDetailAtCounterById(
        res.data.id
      );
      if (resCallGetOrderDetail?.status === 0) {
        let index = 1;
        resCallGetOrderDetail.data.forEach((item) => {
          item.index = index++;
        });
        setListOrderDetail(resCallGetOrderDetail.data);
      }
      console.log("resCallGetListOrderHistory", resCallGetListOrderHistory);
      if (resCallGetListOrderHistory.status === 0) {
        setHistoryOrder(resCallGetListOrderHistory.data);
      }
    }
  };

  // const fetchListOrderDetail = async () => {
  //   const resCallGetOrderDetail = await callGetOrderDetailAtCounterById(
  //     activeKey
  //   );
  //   setListOrderDetail(resCallGetOrderDetail.data);
  // };

  const handleGetMethodPayment = async (code) => {
    const res = await callListMethodPayment(code);
    console.log("res callListMethodPayment", res);
    if (res.status === 0) {
      setPaymentMethodOrder(res.data);
    }
  };

  useEffect(() => {
    handleGetOrder();
    // handleGetOrderHistory();
    if (code) {
      handleGetMethodPayment(code);
    }
  }, []);

  const columnsPaymentMetod = [
    {
      width: "25%",
      title: "Số tiền",
      dataIndex: "total",
      key: "total",
      render: (_, record) =>
        _ ? (
          <div style={{ color: "red" }}>
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(_)}
          </div>
        ) : null,
    },
    {
      width: "25%",
      title: "Thời gian",
      dataIndex: "paymentTime",
      key: "paymentTime",
    },
    {
      width: "25%",
      title: "Phương thức thanh toán",
      dataIndex: "method",
      key: "method",
    },
    {
      width: "25%",
      title: "Nhân viên xác nhận",
      key: "note",
      dataIndex: "note",
    },
  ];

  const columnOfListOrder = [
    {
      align: "center",
      title: "STT",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Ảnh",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (_, record) => (
        <img style={{ height: "6rem" }} alt="img" src={record.imgUrl} />
      ),
    },
    {
      title: "Mã SP",
      dataIndex: "codeShoeDetail",
      key: "codeShoeDetail",
    },
    {
      title: "Đơn giá",
      key: "price",
      dataIndex: "price",
      render: (_, record) => (
        <>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record.price)}
        </>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      key: "totalPrice",
      render: (_, record) => (
        <div style={{ color: "red" }}>
          {Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record.price * record.quantity)}
        </div>
      ),
    },
  ];

  const handleCalTotalPrice = () => {
    let total = 0;
    listOrderDetail?.forEach((item) => {
      total += item.price * item.quantity;
    }) ?? 0;
    return total;
  };

  const handleGetColorTimeline = (type) => {
    if (type === "Created") {
      return "green";
    } else if (type === "Updated") {
      return "orange";
    } else if (type === "Canceled") {
      return "red";
    } else {
      return "white";
    }
  };

  const handleGetIconTimeline = (type) => {
    if (type === "Created") {
      return AiOutlineFileAdd;
    } else if (type === "Updated") {
      return AiOutlineFileSync;
    } else if (type === "Canceled") {
      return AiOutlineFileExcel;
    } else {
      return null;
    }
  };

  const handleGetTypeOfOrder = (type) => {
    if (type === 1) {
      return (
        <Tag style={{ fontSize: "small" }} color="geekblue">
          Tại quầy
        </Tag>
      );
    } else if (type === 2) {
      return "Online";
    } else {
      return null;
    }
  };

  const showModalDetailOrder = () => {
    setOpenModalShowOrderDetail(true);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div className="order-detail-container">
        <div className="title">
          <p style={{ fontSize: "medium" }}>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/admin/order");
              }}
            >
              Danh sách hoá đơn
            </a>{" "}
            / {code}
          </p>
        </div>
        <div className="timeline">
          <Timeline minEvents={5} placeholder>
            {historyOrder.map((item) => {
              console.log("item", item);
              return (
                <div>
                  <TimelineEvent
                    color={handleGetColorTimeline(item.type)}
                    icon={handleGetIconTimeline(item.type)}
                    title={
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "15px" }}>{item.type}</span>
                        <span style={{ fontSize: "14px" }}>{item.note}</span>
                        <span style={{ fontSize: "13px" }}>
                          {item.createdTime}
                        </span>
                        <span style={{ fontSize: "13px" }}>
                          CreatedBy: {item.createdBy}
                        </span>
                      </div>
                    }
                  />
                </div>
              );
            })}
          </Timeline>
        </div>
        <div className="action-button">
          <span>
            <Button type="primary" danger>
              Huỷ đơn
            </Button>
          </span>
          <span>
            <Button type="primary" onClick={() => showModalDetailOrder()}>
              Chi tiết
            </Button>
          </span>
        </div>
        <div className="order-infor">
          <div className="title-order">
            <p>Thông tin đơn hàng</p>
          </div>
          <div className="infor-order">
            <p>Mã code: {dataOrder?.code}</p>
            <p>Trạng thái: {dataOrder?.status}</p>
            <p>Họ và tên: {dataOrder?.customerName}</p>
            <p>
              Loại đơn:{" "}
              {dataOrder?.type ? handleGetTypeOfOrder(+dataOrder.type) : "N/A"}
            </p>
          </div>
        </div>
        <div className="order-infor">
          <div className="title-order">
            <p>Thông tin sản phẩm</p>
          </div>
          <div className="infor-order">
            <Table
              className="custom-table"
              columns={columnOfListOrder}
              dataSource={listOrderDetail}
              pagination={false}
            />
          </div>
        </div>

        <Row>
          <Col span={18}>
            <div className="order-infor">
              <div className="title-order">
                <p>Lịch sử thanh toán</p>
              </div>
              <div className="infor-order">
                <Table
                  className="custom-table"
                  columns={columnsPaymentMetod}
                  dataSource={paymentMethodOrder}
                  pagination={false}
                />
              </div>
            </div>
          </Col>
          <Col span={6}>
            <div
              className="money"
              style={{ fontSize: "large", padding: "80px 25px" }}
            >
              <p>
                Tiền hàng:&nbsp;&nbsp;
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(handleCalTotalPrice())}
              </p>
              <p>
                Tiền ship:&nbsp;&nbsp;&nbsp;&nbsp;
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataOrder?.shipFee ?? 0)}
              </p>
              <br />
              <p style={{ color: "red", fontWeight: "bold" }}>
                Tổng tiền:&nbsp;&nbsp;&nbsp;
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataOrder?.totalMoney ?? 0)}
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <ModalShowDetailOrder
        openModalShowOrderDetail={openModalShowOrderDetail}
        setOpenModalShowOrderDetail={setOpenModalShowOrderDetail}
        historyOrder={historyOrder}
      />
    </div>
  );
};
export default OrderDetail;
