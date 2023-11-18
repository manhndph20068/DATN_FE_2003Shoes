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
  callUpdateNewOrderAtCounter,
  callUpdateOrderDetailAtCounter,
} from "../../../services/api";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Divider, Row, Table, Tag, message } from "antd";
import ModalShowDetailOrder from "./ModalShowDetailOrder";
import { useSelector } from "react-redux";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import CancelOrder from "./CancelOrder";

const OrderDetail = () => {
  const [dataOrder, setDataOrder] = useState({});
  const [historyOrder, setHistoryOrder] = useState([]);
  const [paymentMethodOrder, setPaymentMethodOrder] = useState([]);
  const [btnCancel, setBtnCancel] = useState(false);
  const [btnConfirm, setBtnConfirm] = useState(false);
  const [btnWaitingForDelivery, setBtnWaitingForDelivery] = useState(false);
  const [btnDelivered, setBtnDelivered] = useState(false);
  const [btnFinished, setBtnFinished] = useState(false);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [provinceCurrent, setProvinceCurrent] = useState(null);
  const [wardCurrent, setWardCurrent] = useState(null);
  const [districtCurrent, setDistrictCurrent] = useState(null);
  const [openModalShowOrderDetail, setOpenModalShowOrderDetail] =
    useState(false);
  const [openModalCancelOrder, setOpenModalCancelOrder] = useState(false);

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
    {
      width: "20%",
      title: "Người xác nhận",
      key: "note",
      dataIndex: "note",
    },
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

  const showModalDetailOrder = () => {
    setOpenModalShowOrderDetail(true);
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
        <Tag style={{ fontSize: "small" }} color="green-inverse">
          Hoàn thành
        </Tag>
      );
    } else {
      return null;
    }
  };

  const fetchData = async (url, method = "GET", data = {}) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Token: "d57a9f98-45b8-11ee-a6e6-e60958111f48",
      },
    };

    if (method === "POST") {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response.json();
  };

  useEffect(() => {
    const fetchAddressData = async () => {
      const provinceData = await fetchData(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province"
      );
      const listProvince = provinceData?.data?.map(
        ({ ProvinceName: label, ProvinceID: value }) => ({ label, value })
      );
      setListProvince(listProvince);

      const addressParts = dataOrder?.address?.split(", ");
      const province = addressParts[0];
      const provinceId = listProvince.find(({ label }) => label === province);
      setProvinceCurrent(provinceId);

      const districtData = await fetchData(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
        "POST",
        { province_id: provinceId.value }
      );
      const listDistrict = districtData?.data?.map(
        ({ DistrictName: label, DistrictID: value }) => ({ label, value })
      );
      setListDistrict(listDistrict);

      const district = addressParts[1];
      const districtId = listDistrict.find(({ label }) => label === district);
      setDistrictCurrent(districtId);

      const wardData = await fetchData(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
        "POST",
        { district_id: districtId.value }
      );
      const listWard = wardData?.data?.map(
        ({ WardName: label, WardCode: value }) => ({ label, value })
      );
      setListWard(listWard);

      const ward = addressParts[2];
      const wardId = listWard.find(({ label }) => label === ward);
      setWardCurrent(wardId);
    };

    fetchAddressData();
  }, [dataOrder]);

  const handleGetStatusBtn = () => {
    console.log("dataOrder", dataOrder);
    if (dataOrder?.type === null) {
      console.log("nulllllllll");
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (dataOrder?.status === 0) {
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 1 && dataOrder?.status === 2) {
      console.log("setBtnCancel");
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 2) {
      setBtnCancel(false);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(false);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 1) {
      setBtnCancel(false);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(false);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 3) {
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 4) {
      setBtnCancel(false);
      setBtnConfirm(false);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 5) {
      setBtnCancel(false);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(false);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 6) {
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(false);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 7) {
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(false);
    }
    if (+dataOrder?.type === 1 && dataOrder?.status === 8) {
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
    if (+dataOrder?.type === 2 && dataOrder?.status === 8) {
      setBtnCancel(true);
      setBtnConfirm(true);
      setBtnWaitingForDelivery(true);
      setBtnDelivered(true);
      setBtnFinished(true);
    }
  };

  const handleChangeToWaitingForDelivery = async () => {
    console.log("dataOrder", dataOrder);
    const dataUpdate = {
      id: dataOrder.id,
      idVoucher: dataOrder?.voucherOrder?.id ?? null,
      idAccount: dataOrder?.account?.id ?? null,
      code: dataOrder.code,
      type: dataOrder.type,
      customerName: dataOrder.customerName ?? null,
      phoneNumber: dataOrder.phoneNumber ?? null,
      address: dataOrder.address ?? null,
      shipFee: dataOrder.shipFee ?? 0,
      moneyReduce: dataOrder.moneyReduce ?? 0,
      totalMoney: dataOrder.totalMoney,
      payDate: null,
      shipDate: null,
      desiredDate: null,
      receiveDate: null,
      updatedBy: staffName ?? null,
      note: "Xác nhận chờ giao hàng",
      status: 6,
    };
    const dataShoe = listOrderDetail.map((item) => {
      console.log("item listOrderDetail", item);
      return {
        name: "Giày",
        code: item?.codeShoeDetail,
        quantity: item?.quantity,
        price: item?.price,
        length: 12,
        width: 12,
        weight: 1200,
        height: 12,
        category: {
          level1: "Giày",
        },
      };
    });

    console.log("data", dataUpdate);
    // callUpdateNewOrderAtCounter(dataUpdate);
    const addressParts = dataOrder.address.split(", ");
    const province = addressParts[0];
    const district = addressParts[1];
    const ward = addressParts[2];
    const addressDetail = addressParts[3];
    const dataOrderGHN = {
      payment_type_id: 1,
      note: "2K3SHOES",
      required_note: "KHONGCHOXEMHANG",
      return_phone: "0987654123",
      return_address:
        "Tổng kho, Phường Xuân Phương, Quận Nam Từ Liêm, Hà Nội, Vietnam",
      return_district_id: null,
      return_ward_code: "",
      client_order_code: "",
      from_name: "2K3SHOES",
      from_phone: "0987654123",
      from_address:
        "Tổng kho, Phường Xuân Phương, Quận Nam Từ Liêm, Hà Nội, Vietnam",
      from_ward_name: "Phường Xuân Phương",
      from_district_name: "Quận Nam Từ Liêm",
      from_province_name: "Hà Nội",
      to_name: dataOrder.customerName ?? null,
      to_phone: dataOrder.phoneNumber ?? null,
      to_address:
        addressDetail +
        ", " +
        ward +
        ", " +
        district +
        ", " +
        province +
        ", Vietnam",
      to_ward_name: ward,
      to_district_name: district,
      to_province_name: province,
      cod_amount:
        paymentMethodOrder[0].status === 1 ? 0 : dataOrder?.totalMoney,
      content: "Theo New York Times",
      weight: 200,
      length: 1,
      width: 19,
      height: 10,
      cod_failed_amount: 2000,
      pick_station_id: 1444,
      deliver_station_id: null,
      insurance_value: 10,
      service_id: 0,
      service_type_id: 2,
      coupon: null,
      pickup_time: 1692840132,
      pick_shift: [2],
      items: dataShoe,
    };
    console.log("dataOrderGHN", dataOrderGHN);
    const url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: "d57a9f98-45b8-11ee-a6e6-e60958111f48",
        ShopId: 125598,
      },
      body: JSON.stringify(dataOrderGHN),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.code === 200) {
          const orderCode = data?.data?.order_code;
          fetch(
            "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Token: "d57a9f98-45b8-11ee-a6e6-e60958111f48",
              },
              body: JSON.stringify({
                order_codes: [data?.data?.order_code],
              }),
            }
          )
            .then((response) => response.json())
            .then((data) => {
              if (data?.code === 200) {
                const urlPrint = `https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${data?.data?.token}`;
                window.open(urlPrint, "_blank");
                dataUpdate.note = `MVD: ${orderCode}`;
                callUpdateNewOrderAtCounter(dataUpdate);
                window.location.reload();
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChangeToConfirmOrder = () => {
    // getCodeAddress();
    console.log("dataOrder", dataOrder);
    const data = {
      id: dataOrder.id,
      idVoucher: dataOrder?.voucherOrder?.id ?? null,
      idAccount: dataOrder?.account?.id ?? null,
      code: dataOrder.code,
      type: dataOrder.type,
      customerName: dataOrder.customerName ?? null,
      phoneNumber: dataOrder.phoneNumber ?? null,
      address: dataOrder.address ?? null,
      shipFee: dataOrder.shipFee ?? 0,
      moneyReduce: dataOrder.moneyReduce ?? 0,
      totalMoney: dataOrder.totalMoney,
      payDate: null,
      shipDate: null,
      desiredDate: null,
      receiveDate: null,
      updatedBy: staffName ?? null,
      note: "Đã xác nhận thông tin đơn hàng",
      status: 5,
    };
    console.log("data", data);
    callUpdateNewOrderAtCounter(data);
    window.location.reload();
  };

  const handleChangeToDelivered = () => {
    console.log("dataOrder", dataOrder);
    const addressParts = dataOrder.address.split(", ");
    const province = addressParts[0];
    const district = addressParts[1];
    const ward = addressParts[2];
    const addressDetail = addressParts[3];

    console.log("provinceCurrent", provinceCurrent);
    console.log("districtCurrent", districtCurrent);
    console.log("wardCurrent", wardCurrent);

    const fetchData = async () => {
      const response = await fetch(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ShopId: 125598,
            Token: "d57a9f98-45b8-11ee-a6e6-e60958111f48",
          },
          body: JSON.stringify({
            from_district_id: 3440,
            from_ward_code: "13010",
            to_district_id: districtCurrent.value,
            to_ward_code: wardCurrent.value,
            service_id: 53320,
          }),
        }
      );
      const formattedDates = (date) => {
        return moment
          .unix(date)
          .utcOffset(420)
          .format("YYYY-MM-DDTHH:mm:ss.SSS");
      };

      const dataRes = await response.json();
      if (dataRes?.code === 200) {
        console.log(dataRes);

        const data = {
          id: dataOrder.id,
          idVoucher: dataOrder?.voucherOrder?.id ?? null,
          idAccount: dataOrder?.account?.id ?? null,
          code: dataOrder.code,
          type: dataOrder.type,
          customerName: dataOrder.customerName ?? null,
          phoneNumber: dataOrder.phoneNumber ?? null,
          address: dataOrder.address ?? null,
          shipFee: dataOrder.shipFee ?? 0,
          moneyReduce: dataOrder.moneyReduce ?? 0,
          totalMoney: dataOrder.totalMoney,
          payDate: null,
          shipDate: null,
          desiredDate: formattedDates(dataRes.data.leadtime),
          receiveDate: null,
          updatedBy: staffName ?? null,
          note: "Đã bàn giao",
          status: 7,
        };
        console.log("dâta", data);
        callUpdateNewOrderAtCounter(data);
        window.location.reload();
      }
    };

    fetchData();
  };

  const handleChangeToFinish = () => {
    console.log("dataOrder", dataOrder);
    const data = {
      id: dataOrder.id,
      idVoucher: dataOrder?.voucherOrder?.id ?? null,
      idAccount: dataOrder?.account?.id ?? null,
      code: dataOrder.code,
      type: dataOrder.type,
      customerName: dataOrder.customerName ?? null,
      phoneNumber: dataOrder.phoneNumber ?? null,
      address: dataOrder.address ?? null,
      shipFee: dataOrder.shipFee ?? 0,
      moneyReduce: dataOrder.moneyReduce ?? 0,
      totalMoney: dataOrder.totalMoney,
      payDate: new Date().toISOString(),
      shipDate: null,
      desiredDate:
        moment(dataOrder?.desiredDate, "DD/MM/YYYY HH:mm:ss").format(
          "YYYY-MM-DDTHH:mm:ss.SSS"
        ) ?? null,
      receiveDate: null,
      updatedBy: staffName ?? null,
      note: "Đã hoàn thành",
      status: 8,
    };
    console.log("data", data);
    callUpdateNewOrderAtCounter(data);
    window.location.reload();
  };

  useEffect(() => {
    handleGetStatusBtn();
  }, [dataOrder]);

  const handleCancelOrder = () => {
    setOpenModalCancelOrder(true);
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
          </PerfectScrollbar>
        </div>
        <div className="action-button">
          <span>
            <Button
              type="primary"
              danger
              disabled={btnCancel}
              onClick={() => handleCancelOrder()}
            >
              Huỷ đơn
            </Button>
          </span>
          <span>
            <Button
              type="primary"
              success
              disabled={btnConfirm}
              onClick={() => handleChangeToConfirmOrder()}
            >
              Xác nhận đơn
            </Button>
          </span>
          <span>
            <Button
              type="primary"
              disabled={btnWaitingForDelivery}
              onClick={() => handleChangeToWaitingForDelivery()}
              style={
                btnWaitingForDelivery
                  ? { backgroundColor: "#F5F5F5" }
                  : { backgroundColor: "brown" }
              }
            >
              Chờ giao hàng
            </Button>
          </span>
          <span>
            <Button
              type="primary"
              disabled={btnDelivered}
              onClick={() => handleChangeToDelivered()}
              style={
                btnDelivered
                  ? { backgroundColor: "#F5F5F5" }
                  : { backgroundColor: "green" }
              }
            >
              Đã bàn giao
            </Button>
          </span>

          <span>
            <Button
              type="primary"
              onClick={() => handleChangeToFinish()}
              style={
                btnFinished
                  ? { backgroundColor: "#F5F5F5" }
                  : { backgroundColor: "tomato" }
              }
              disabled={btnFinished}
            >
              Hoàn thành
            </Button>
          </span>

          <span>
            <Button
              type="primary"
              style={{ backgroundColor: "grey" }}
              onClick={() => showModalDetailOrder()}
            >
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
      <ModalShowDetailOrder
        openModalShowOrderDetail={openModalShowOrderDetail}
        setOpenModalShowOrderDetail={setOpenModalShowOrderDetail}
        historyOrder={historyOrder}
      />
      <CancelOrder
        openModalCancelOrder={openModalCancelOrder}
        setOpenModalCancelOrder={setOpenModalCancelOrder}
        dataOrder={dataOrder}
      />
    </div>
  );
};
export default OrderDetail;
