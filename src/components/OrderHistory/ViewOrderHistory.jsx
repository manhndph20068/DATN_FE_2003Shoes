import React from "react";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaBug, FaRegCalendarCheck, FaRegFileAlt } from "react-icons/fa";
import {
  AiOutlineFileSync,
  AiOutlineFileAdd,
  AiOutlineFileExcel,
} from "react-icons/ai";
import "./ViewOrderHistory.scss";
import {
  callGetCommentByOrderIdAndShoeDetailId,
  callGetListOrderHistoryById,
  callGetOrderByCode,
  callGetOrderDetailAtCounterById,
  callListMethodPayment,
  callUpdateNewOrderAtCounter,
  callUpdateOrderDetailAtCounter,
} from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Divider, Row, Table, Tag, message } from "antd";

import { useSelector } from "react-redux";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import ModalComment from "./ModalComment";
import { GrFormView } from "react-icons/gr";
import ModalHistoryComment from "./ModalHistoryComment";

const ViewOrderHistory = () => {
  const [dataOrder, setDataOrder] = useState({});
  const [historyOrder, setHistoryOrder] = useState([]);
  const [paymentMethodOrder, setPaymentMethodOrder] = useState([]);
  const [idOrder, setIdOrder] = useState(null);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [commentObjects, setCommentObjects] = useState([]);
  const [openModalComment, setOpenModalComment] = useState(false);
  const [openModalHistoryComment, setOpenModalHistoryComment] = useState(false);
  const [idShoeDetail, setIdShoeDetail] = useState(null);

  let param = new URLSearchParams(location.search);
  let code = param.get("code");
  const navigate = useNavigate();
  const staffName = useSelector((state) => state.account.user.name);

  const handleGetOrder = async () => {
    const res = await callGetOrderByCode(code);
    console.log("res", res);
    if (res.status === 0) {
      console.log("res.data", res.data);

      setDataOrder(res.data);
      setIdOrder(res.data.id);
      const resCallGetListOrderHistory = await callGetListOrderHistoryById(
        res.data.id
      );
      const resCallGetOrderDetail = await callGetOrderDetailAtCounterById(
        res.data.id
      );
      if (resCallGetOrderDetail?.status === 0) {
        let index = 1;
        const commentPromises = resCallGetOrderDetail.data.map((item) => {
          console.log("item commentPromises", item);
          item.index = index++;
          return handleGetCommentOrder(res.data.id, item.idShoeDetail);
        });
        await Promise.all(commentPromises);
        setListOrderDetail(resCallGetOrderDetail.data);
      }
      console.log("resCallGetListOrderHistory", resCallGetListOrderHistory);
      if (resCallGetListOrderHistory.status === 0) {
        setHistoryOrder(resCallGetListOrderHistory.data);
      }
    }
  };

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
    console.log("commentObjects", commentObjects);
  }, []);

  const columnsPaymentMetod = [
    {
      width: "20%",
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
      width: "20%",
      title: "Thời gian",
      dataIndex: "paymentTime",
      key: "paymentTime",
    },
    {
      width: "20%",
      title: "Phương thức thanh toán",
      dataIndex: "method",
      key: "method",
    },
    // {
    //   width: "20%",
    //   title: "Người xác nhận",
    //   key: "note",
    //   dataIndex: "note",
    // },
    {
      width: "20%",
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        _ === 1 ? (
          <>
            <Tag style={{ fontSize: "medium" }} color="green">
              Đã thanh toán
            </Tag>
          </>
        ) : (
          <>
            <Tag style={{ fontSize: "medium" }} color="orange">
              Chưa thanh toán
            </Tag>
          </>
        ),
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
    {
      title: "Nhận xét",
      key: "comment",
      render: (_, record) => {
        const shoeId = record.idShoeDetail;
        console.log("shoeId", shoeId);
        const comment = commentObjects?.find(
          (comment) => comment?.idShoe === shoeId
        );

        return (
          <div style={{ color: "red" }}>
            {comment ? (
              comment.status === 0 ? (
                <Button
                  onClick={() => handleOpenModalComment(shoeId)}
                  style={{ color: "blue" }}
                >
                  Nhận xét ngay
                </Button>
              ) : (
                <GrFormView
                  style={{
                    fontSize: "2rem",
                    cursor: "pointer",
                  }}
                  onClick={() => handleOpenModalHistoryComment(shoeId)}
                ></GrFormView>
              )
            ) : null}
          </div>
        );
      },
    },
  ];

  const handleOpenModalHistoryComment = (idShoeDetail) => {
    setIdShoeDetail(idShoeDetail);
    setOpenModalHistoryComment(true);
  };

  const handleOpenModalComment = (idShoeDetail) => {
    setIdShoeDetail(idShoeDetail);
    setOpenModalComment(true);
  };

  const handleGetCommentOrder = async (idOrder, idShoeDetail) => {
    const data = {
      idOrder: idOrder,
      idShoeDetail: idShoeDetail,
    };
    console.log("data", data);
    const res = await callGetCommentByOrderIdAndShoeDetailId(data);
    console.log("res callGetCommentByOrderIdAndShoeDetailId", res);
    const newCommentObject = {
      status: res.data === null ? 0 : 1,
      idShoe: idShoeDetail,
    };
    setCommentObjects((prevComments) => [...prevComments, newCommentObject]);

    // if (+res?.status === 0) {
    //   return <a>Chưa nhận xét</a>;
    // } else {
    //   return <a>Nhận xét</a>;
    // }
  };

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

  /////////////////////////////
  const handleGetTypeOfOrder = (type) => {
    if (type === 1) {
      return (
        <Tag style={{ fontSize: "small" }} color="geekblue">
          Tại quầy
        </Tag>
      );
    } else if (type === 2) {
      return (
        <Tag style={{ fontSize: "small" }} color="orange">
          Online
        </Tag>
      );
    } else {
      return null;
    }
  };

  const handleGetStatusOfOrder = (type) => {
    if (type === 0) {
      return (
        <Tag style={{ fontSize: "small" }} color="cyan">
          Hoá đơn chờ
        </Tag>
      );
    } else if (type === 1) {
      return (
        <Tag style={{ fontSize: "small" }} color="gold">
          Chờ thanh toán
        </Tag>
      );
    } else if (type === 2) {
      return (
        <Tag style={{ fontSize: "small" }} color="green">
          Đã thanh toán
        </Tag>
      );
    } else if (type === 3) {
      return (
        <Tag style={{ fontSize: "small" }} color="red">
          Huỷ
        </Tag>
      );
    } else if (type === 4) {
      return (
        <Tag style={{ fontSize: "small" }} color="blue">
          Chờ xác nhận
        </Tag>
      );
    } else if (type === 5) {
      return (
        <Tag style={{ fontSize: "small" }} color="lime">
          Đã xác nhận
        </Tag>
      );
    } else if (type === 6) {
      return (
        <Tag style={{ fontSize: "small" }} color="purple">
          Chờ giao hàng
        </Tag>
      );
    } else if (type === 7) {
      return (
        <Tag style={{ fontSize: "small" }} color="pink">
          Đã bàn giao
        </Tag>
      );
    } else if (type === 8) {
      return (
        <Tag style={{ fontSize: "small" }} color="geekblue">
          Hoàn thành
        </Tag>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ padding: "3rem" }}>
      <div className="order-detail-container">
        <div className="title">
          <p style={{ fontSize: "medium" }}>
            <a
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                navigate("/history");
              }}
            >
              Danh sách hoá đơn
            </a>{" "}
            / {code}
          </p>
        </div>
        <div className="timeline" style={{ padding: "3rem" }}>
          <PerfectScrollbar>
            <Timeline minEvents={historyOrder.length} placeholder>
              {historyOrder.map((item) => {
                console.log("item", item);
                return (
                  <div>
                    <TimelineEvent
                      color={handleGetColorTimeline(item.type)}
                      icon={handleGetIconTimeline(item.type)}
                      title={
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {/* <span style={{ fontSize: "14px" }}>
                          {item.type}
                        </span> */}
                          <span
                            style={{ fontSize: "13px", fontWeight: "bold" }}
                          >
                            {item.note}
                          </span>
                          <span style={{ fontSize: "13px" }}>
                            {item.createdTime}
                          </span>
                          {/* <span style={{ fontSize: "13px" }}>
                            CreatedBy: {item.createdBy}
                          </span> */}
                        </div>
                      }
                    />
                  </div>
                );
              })}
            </Timeline>
          </PerfectScrollbar>
        </div>

        <div className="order-infor">
          <div className="title-order">
            <p>Thông tin đơn hàng</p>
          </div>
          <div className="infor-order">
            <p>Mã code: {dataOrder?.code}</p>
            <p>
              Trạng thái:{" "}
              {dataOrder?.status
                ? handleGetStatusOfOrder(dataOrder?.status)
                : "N/A"}
            </p>
            <p>Họ và tên: {dataOrder?.customerName}</p>
            <p>
              Loại đơn:{" "}
              {dataOrder?.type ? handleGetTypeOfOrder(+dataOrder.type) : "N/A"}
            </p>
            {+dataOrder.type === 2 ? (
              <>
                <p>Số điện thoại: {dataOrder?.phoneNumber}</p>
                <p>Địa chỉ: {dataOrder?.address}</p>
              </>
            ) : (
              <></>
            )}
            {+dataOrder.type === 2 && +dataOrder.status === (7 || 8) ? (
              <>
                <p>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Ngày nhận dự kiến:{" "}
                  </span>{" "}
                  {dataOrder?.desiredDate ?? "N/A"}
                </p>
              </>
            ) : (
              <></>
            )}
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
              style={{ fontSize: "large", padding: "68px 25px" }}
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

              <p>
                Voucher giảm giá:&nbsp;&nbsp;&nbsp;&nbsp;
                {Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(dataOrder?.moneyReduce ?? 0)}
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
      {/* <ModalShowDetailOrder
        openModalShowOrderDetail={openModalShowOrderDetail}
        setOpenModalShowOrderDetail={setOpenModalShowOrderDetail}
        historyOrder={historyOrder}
      />
      <CancelOrder
        openModalCancelOrder={openModalCancelOrder}
        setOpenModalCancelOrder={setOpenModalCancelOrder}
        dataOrder={dataOrder}
      /> */}
      <ModalComment
        openModalComment={openModalComment}
        setOpenModalComment={setOpenModalComment}
        idOrder={idOrder}
        idShoeDetail={idShoeDetail}
        handleGetOrder={handleGetOrder}
      />
      <ModalHistoryComment
        openModalHistoryComment={openModalHistoryComment}
        setOpenModalHistoryComment={setOpenModalHistoryComment}
        idOrder={idOrder}
        idShoeDetail={idShoeDetail}
        handleGetOrder={handleGetOrder}
      />
    </div>
  );
};
export default ViewOrderHistory;
