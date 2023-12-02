import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Tabs,
  message,
} from "antd";
import {
  QrcodeOutlined,
  ShoppingOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import {
  callAddMethodPayment,
  callAddNewOrderAtCounter,
  callGenerateOrderBill,
  callGetListOrderAtCounter,
  callGetOrderDetailAtCounterById,
  callGetVouchersByTotalMoney,
  callListShoeDetailAtCounter,
  callUpdateNewOrderAtCounter,
} from "../../../services/api";
import "./ShoppingCounter.scss";
import TextArea from "antd/es/input/TextArea";
import TableProductDetail from "./TableProductDetail";
import SearchProductInput from "./SearchProductInput";
import { useSelector } from "react-redux";
import SearchAddressInput from "./SearchAddressInput";
import ScanQrCode from "./ScanQr";
import SearchCustomerInput from "./SearchCustomerInput";
import moment from "moment";

const ShoppingCounter = () => {
  const [listOrderAtCounter, setListOrderAtCounter] = useState([]);
  const [typeOfSales, setTypeOfSales] = useState(1);
  const [activeKey, setActiveKey] = useState(null);
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const [listOrderDetail, setListOrderDetail] = useState(null);
  const [listShoeDetail, setListShoeDetail] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [listVoucher, setListVoucher] = useState([]);
  const [refund, setRefund] = useState(0);
  const [openScanQr, setOpenScanQr] = useState(false);
  const [shipPrice, setShipPrice] = useState(0);
  const [listProvince, setListProvince] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(201);
  const [listDistrict, setListDistrict] = useState([]);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [listWard, setListWard] = useState([]);
  const [wardSelected, setWardSelected] = useState(null);
  const [listShoeDataQR, setListShoeDataQR] = useState([]);
  const [typeOfReduceVoucher, setTypeOfReduceVoucher] = useState(null);
  const [vocherSelected, setVoucherSelected] = useState({});

  const [form] = Form.useForm();

  const staffName = useSelector((state) => state.account.user.name);

  const onChange = (key) => {
    setActiveKey(key);
    console.log("key", key);
    //handleGetOrderDetailById(key);
    form.setFieldValue("id", key);
    const code = listOrderAtCounter?.filter((item) => item.id == key)[0]?.code;
    console.log("code", code);
    form.setFieldValue("code", code);
    console.log("listOrderDetail", listOrderDetail);
    setShipPrice(0);
    getTotalPriceShip();
    setProvinceSelected(201);
    setDistrictSelected(null);
    setWardSelected(null);
  };

  const handleGetOrderDetailById = async (id) => {
    console.log("handleGetOrderDetailById id ", id);
    console.log("handleGetOrderDetailById a ", activeKey);
    const res = await callGetOrderDetailAtCounterById(id);
    setListOrderDetail(res.data);
    console.log("handleGetOrderDetailById b ", activeKey);
  };

  const addNewOrder = async () => {
    const data = {
      createdBy: staffName,
      updatedBy: staffName,
    };
    const res = await callAddNewOrderAtCounter(data);
    if (res.status === 0) {
      const rescallGetListOrder = await callGetListOrderAtCounter();
      if (rescallGetListOrder.data.length > 0) {
        const res = await callGetListOrderAtCounter();
        if (res.data.length > 0) {
          const newData = res.data;
          setListOrderAtCounter(res.data);
          setActiveKey(String(res.data[res.data.length - 1].id));
          form.setFieldValue("id", res.data[res.data.length - 1].id);
          console.log("listOrderAtCounter", listOrderAtCounter);
          const code = newData?.filter(
            (item) => item.id == res.data[res.data.length - 1].id
          )[0].code;

          form.setFieldValue("code", code);
        }
      }
    } else {
      message.error(res.mess);
    }
  };

  const fetchListOrderAtCounter = async () => {
    localStorage.removeItem("reloaded");
    const res = await callGetListOrderAtCounter();
    if (res?.data?.length > 0) {
      setListOrderAtCounter(res.data);
      setActiveKey(String(res.data[0].id));
      form.setFieldValue("id", res.data[0].id);
      console.log("listOrderAtCounter", listOrderAtCounter);
      const code = listOrderAtCounter?.filter(
        (item) => item.id == res.data[0].id
      )[0]?.code;
      form.setFieldValue("code", code);
      // setActiveKey(String(activeKey));
    } else {
      console.log("vao elserr");
      if (!localStorage.getItem("reloaded")) {
        localStorage.setItem("reloaded", true);
        setListOrderAtCounter([]);
        window.location.href = `http://localhost:8080/api/v1/admin/order/generate-hoa-don-report/${res.data[0].id}`;
      } else {
        localStorage.removeItem("reloaded");
      }
    }
  };

  const fetchListShoeDetailAtCounter = async () => {
    const res = await callListShoeDetailAtCounter();
    console.log("res", res);
    if (res.data.length > 0) {
      const list = res.data.map((item) => {
        return {
          price: item.priceInput,
          thumbnail: item.thumbnail,
          label: item.code,
          value:
            item.id +
            "-" +
            activeKey +
            "-" +
            item.thumbnail +
            "-" +
            item.priceInput +
            "-" +
            1 +
            "-" +
            0 +
            "-" +
            1,
        };
      });
      setListShoeDataQR(res.data);
      setListShoeDetail(list);
    } else {
      setListShoeDetail([]);
      setListShoeDataQR([]);
    }
  };

  // useEffect(() => {
  //   fetchListShoeDetailAtCounter();
  //   handleGetOrderDetailById(activeKey);
  //   console.log("activeKey 1", activeKey);
  //   setShipPrice(0);
  // }, [activeKey]);

  useEffect(() => {
    fetchListOrderAtCounter();
    fetchListShoeDetailAtCounter();
    console.log("activeKey 1", activeKey);
  }, []);

  useEffect(() => {
    form.resetFields([
      "customerName",
      "phone",
      "province",
      "district",
      "ward",
      "address",
      "moneyPaid",
      "note",
      "typeOfMethodPaymentOnlineOrder",
      "voucher",
    ]);
    form.setFieldsValue({ typeOfSale: 1 });
    setRefund(0);
    setTypeOfSales(1);
    getTotalPriceShip();
    setShipPrice(0);
    setProvinceSelected(201);
    setDistrictSelected(null);
    setWardSelected(null);
    console.log("activeKey 2", activeKey);
    setVoucherSelected({});
    setTypeOfReduceVoucher(null);
    fetchListShoeDetailAtCounter();
    handleGetOrderDetailById(activeKey);
    console.log("activeKey 3", activeKey);
  }, [activeKey]);

  const optionTypeSales = [
    {
      label: "Bán hàng tại quầy",
      value: 1,
    },
    {
      label: "Bán hàng online",
      value: 2,
    },
  ];

  const optionTypeOfMethodPayment = [
    {
      label: "Tiền mặt",
      value: "Tiền mặt",
    },
    {
      label: "Chuyển khoản",
      value: "Chuyển khoản",
    },

    {
      label: "Tiền mặt + chuyển khoản",
      value: "Tiền mặt + chuyển khoản",
    },
  ];

  const optionTypeOfMethodPaymentOrderOnline = [
    {
      label: "Thanh toán khi nhận hàng",
      value: "Thanh toán khi nhận hàng",
    },
    {
      label: "Thanh toán tại quầy",
      value: "Thanh toán tại quầy",
    },
  ];

  const onFinish = async (values) => {
    if (handleCalTotalPrice() <= 0) {
      message.error("Giỏ hàng không được để trống!");
      return;
    }
    const {
      typeOfSale,
      code,
      id,
      customerName,
      note,
      phone,
      typeOfMethodPaymentOnlineOrder,
      typeOfMethodPayment,
      address,
      voucher,
    } = values;
    console.log("values", values);
    console.log("typeOfSale", typeOfSale);
    console.log("shipPrice", shipPrice);
    if (typeOfSale === 2) {
      const province = listProvince.filter(
        (item) => item.value == provinceSelected
      )[0].label;
      const district = listDistrict.filter(
        (item) => item.value === districtSelected
      )[0].label;
      const ward = listWard.filter((item) => item.value === wardSelected)[0]
        .label;

      const totalPrice = handleCalTotalPriceOfProd() - handleCalTotalPrice();
      const maxReductionValue = vocherSelected?.maximumReductionValue;

      const moneyReduce =
        totalPrice > maxReductionValue ? maxReductionValue : totalPrice;

      const data = {
        id: id,
        idVoucher: null,
        idAccount: null,
        code: code,
        type: typeOfSale,
        customerName: customerName,
        phoneNumber: phone,
        address: province + ", " + district + ", " + ward + ", " + address,
        shipFee: shipPrice,
        moneyReduce:
          vocherSelected?.reduceForm === 0 ? discountVoucher : moneyReduce,
        totalMoney: handleCalTotalPrice() + shipPrice,
        payDate:
          typeOfMethodPaymentOnlineOrder === "Thanh toán tại quầy"
            ? new Date().toISOString()
            : null,
        shipDate: null,
        desiredDate: null,
        receiveDate: null,
        updatedBy: staffName,
        note: note
          ? `Nhân viên ${staffName} xác nhận thanh toán, ${note}`
          : `Nhân viên ${staffName} xác nhận thanh toán`,
        status:
          typeOfMethodPaymentOnlineOrder === "Thanh toán tại quầy" ? 2 : 1,
      };
      console.log("data", data);
      const res = await callUpdateNewOrderAtCounter(data);
      if (res.status === 0) {
        message.success("Thanh toán thành công!");
        fetchListOrderAtCounter();
        await callAddMethodPayment({
          orderId: id,
          method: typeOfMethodPaymentOnlineOrder,
          total: handleCalTotalPrice() + shipPrice,
          note: `Nhân viên ${staffName} xác nhận `,
          status:
            typeOfMethodPaymentOnlineOrder === "Thanh toán tại quầy" ? 1 : 0,
        });
      } else {
        message.error(res.mess);
      }
    }
    if (typeOfSale === 1) {
      const totalPrice = handleCalTotalPriceOfProd() - handleCalTotalPrice();
      const maxReductionValue = vocherSelected?.maximumReductionValue;

      const moneyReduce =
        totalPrice > maxReductionValue ? maxReductionValue : totalPrice;

      const data = {
        id: id,
        idVoucher: voucher,
        idAccount: null,
        code: code,
        type: typeOfSale,
        customerName: customerName ?? "Khách lẻ",
        phoneNumber: null,
        address: null,
        shipFee: null,
        moneyReduce:
          vocherSelected?.reduceForm === 0 ? discountVoucher : moneyReduce,
        totalMoney: handleCalTotalPrice(),
        payDate: new Date().toISOString(),
        shipDate: null,
        desiredDate: null,
        receiveDate: null,
        updatedBy: staffName,
        note: note
          ? `Nhân viên ${staffName} xác nhận thanh toán, ${note}`
          : `Nhân viên ${staffName} xác nhận thanh toán`,
        status: 8,
      };
      console.log("data", data);
      const res = await callUpdateNewOrderAtCounter(data);
      if (res.status === 0) {
        message.success("Thanh toán thành công!");

        // handleGetOrderDetailById(res.data[0].id);
        await callAddMethodPayment({
          orderId: id,
          method: typeOfMethodPayment,
          total: handleCalTotalPrice() - discountVoucher,
          note: `Nhân viên ${staffName} xác nhận thanh toán`,
          status: 1,
        });

        window.location.href = `http://localhost:8080/api/v1/admin/order/generate-hoa-don-report/${id}`;
        fetchListOrderAtCounter();
      } else {
        message.error(res.mess);
      }
    }

    // callUpdateNewOrderAtCounter;
  };

  useEffect(() => {
    const total = handleCalTotalPrice();
    setTotalMoney(total);
  }, [listOrderDetail]);

  useEffect(() => {
    handleGetListVoucher(totalMoney);
    form.resetFields(["voucher", "moneyPaid"]);
    setDiscountVoucher(0);
  }, [totalMoney, listOrderDetail]);

  const handleCalTotalPrice = () => {
    if (typeOfReduceVoucher === 1) {
      let maximumReductionValue = vocherSelected?.maximumReductionValue;
      let totalWithReduce = 0;
      listOrderDetail?.forEach((item) => {
        totalWithReduce += item.price * item.quantity;
      });

      const discountValue =
        totalWithReduce * (vocherSelected?.discountAmount / 100);

      if (discountValue > maximumReductionValue) {
        return totalWithReduce - maximumReductionValue;
      } else {
        return totalWithReduce - discountValue;
      }
    } else {
      let total = 0;
      listOrderDetail?.forEach((item) => {
        total += item.price * item.quantity;
      }) ?? 0;

      return total - discountVoucher;
    }
  };

  const handleCalTotalPriceOfProd = () => {
    let total = 0;
    listOrderDetail?.forEach((item) => {
      total += item.price * item.quantity;
    }) ?? 0;

    return total;
  };

  const handleCalRefund = (value) => {
    setRefund(value - handleCalTotalPrice());
    console.log("value", value);
    console.log("handleCalTotalPrice", handleCalTotalPrice());
    console.log("refund", refund);
  };

  const getTotalPriceShip = () => {
    async function getShipFee(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: "d57a9f98-45b8-11ee-a6e6-e60958111f48",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }

    getShipFee(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      {
        service_id: 53320,
        service_type_id: null,
        to_district_id: districtSelected,
        to_ward_code: wardSelected,
        height: 5,
        length: 30,
        weight: 900,
        width: 20,
        insurance_value: null,
        cod_failed_amount: 2000,
        coupon: null,
      }
    ).then((data) => {
      setShipPrice(data?.data?.total ?? 0);
    });
  };

  const handleCalTotalPriceOrder = () => {
    return +handleCalTotalPrice() + shipPrice ?? 0;
  };
  useEffect(() => {
    handleCalTotalPriceOrder();
  }, [shipPrice]);

  const handleScanQr = () => {
    setOpenScanQr(true);
  };

  const handleGetListVoucher = async (total) => {
    const data = {
      totalMoneyMyOrder: total,
    };
    const res = await callGetVouchersByTotalMoney(data);
    if (res?.status === 0) {
      const listVoucherActive = res?.data?.filter((item) => item?.status === 1);
      setListVoucher(listVoucherActive);
    }
  };

  const handleOnChangeVoucher = (value) => {
    console.log("value", value);
    const voucher = listVoucher?.filter((item) => item.id === value)[0];
    console.log("voucher", voucher);
    setVoucherSelected(voucher);
    setTypeOfReduceVoucher(voucher?.reduceForm);
    if (voucher?.reduceForm === 1) {
      setDiscountVoucher(0);
    } else {
      setDiscountVoucher(voucher?.discountAmount ?? 0);
    }
    form.resetFields(["moneyPaid"]);
    setRefund(0);
  };

  return (
    <div className="banHang" style={{ padding: "1.5rem" }}>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={addNewOrder} className="buttonShopping">
          <ShoppingOutlined /> Tạo Hoá Đơn
        </Button>
      </div>
      <div
        style={{
          padding: "0.8rem",
          borderRadius: "0.5em",
          backgroundColor: "white",
          // height: "800px",
        }}
      >
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          // onEdit={onEdit}
          // items={items}
        >
          {listOrderAtCounter?.map((pane) => (
            <TabPane tab={pane?.code} key={pane?.id}>
              <div className="tab-container">
                <div className="tab-left-content">
                  <div className="title-order">
                    <h5>Hoá Đơn {pane?.code}</h5>
                  </div>
                  <div className="title-order-infor">
                    <h5>Thông Tin Khách Hàng</h5>
                  </div>
                  <div>
                    <Form
                      form={form}
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      autoComplete="off"
                      scrollToFirstError={true}
                      layout={"vertical"}
                    >
                      <Form.Item name="code" initialValue={pane?.code} hidden>
                        <Input value={pane?.code} />
                      </Form.Item>
                      <Form.Item name="id" initialValue={pane?.id} hidden>
                        <Input value={pane?.id} />
                      </Form.Item>
                      <Form.Item
                        label="Hình thức bán hàng:"
                        name="typeOfSale"
                        rules={[
                          {
                            required: true,
                            message: "Hình thức bán hàng không được để trống!",
                          },
                        ]}
                        initialValue={1}
                      >
                        <Select
                          showSearch
                          // style={{ width: 150 }}
                          // placeholder="Chọn Tỉnh/Thành Phố"
                          options={optionTypeSales}
                          // filterOption={filterOption}
                          onChange={(value) => setTypeOfSales(value)}
                        />
                      </Form.Item>

                      {typeOfSales === 2 ? (
                        <>
                          <SearchCustomerInput />
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col span={11}>
                              <Form.Item
                                label="Tên khách hàng"
                                // style={{ fontSize: "3rem" }}
                                name="customerName"
                                labelCol={{ span: 24 }}
                                labelAlign="left"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Tên người nhận không được để trống!",
                                  },
                                ]}
                              >
                                <Input />
                              </Form.Item>
                            </Col>
                            <Col span={11}>
                              <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                labelCol={{ span: 24 }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Số điện thoại không đúng!",
                                    pattern: new RegExp(/^0\d{9}$/),
                                  },
                                ]}
                              >
                                <Input style={{ width: "100%" }} />
                              </Form.Item>
                            </Col>
                          </Row>

                          <SearchAddressInput
                            shipPrice={shipPrice}
                            setShipPrice={setShipPrice}
                            listProvince={listProvince}
                            setListProvince={setListProvince}
                            provinceSelected={provinceSelected}
                            setProvinceSelected={setProvinceSelected}
                            listDistrict={listDistrict}
                            setListDistrict={setListDistrict}
                            districtSelected={districtSelected}
                            setDistrictSelected={setDistrictSelected}
                            listWard={listWard}
                            setListWard={setListWard}
                            wardSelected={wardSelected}
                            setWardSelected={setWardSelected}
                            form={form}
                          />

                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col span={10.5}>
                              <Form.Item
                                label="Hình thức thanh toán"
                                // style={{ fontSize: "3rem" }}
                                name="typeOfMethodPaymentOnlineOrder"
                                labelCol={{ span: 24 }}
                                labelAlign="left"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Hình thức thanh toán không được để trống!",
                                  },
                                ]}
                                initialValue={"Thanh toán khi nhận hàng"}
                              >
                                <Select
                                  options={optionTypeOfMethodPaymentOrderOnline}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={5.5}>
                              <div className="total-money">
                                <span className="title">
                                  Tổng tiền sản phẩm
                                </span>

                                <span className="num">
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(handleCalTotalPriceOfProd())}
                                </span>
                              </div>
                            </Col>
                            <Divider type="" />
                            <Col span={5}>
                              <div className="total-money">
                                <span className="title">Phí vận chuyển</span>
                                <span className="num">
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(
                                    provinceSelected &&
                                      districtSelected &&
                                      wardSelected &&
                                      getTotalPriceShip()
                                      ? shipPrice
                                      : shipPrice
                                  )}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Form.Item
                            label="Voucher"
                            name="voucher"
                            labelCol={{ span: 24 }}
                            labelAlign="left"
                          >
                            <Select
                              style={{ width: "100%" }}
                              allowClear
                              onChange={(item) => {
                                handleOnChangeVoucher(item);
                              }}
                            >
                              {listVoucher.map((item) => {
                                return (
                                  <Option value={item.id} label={item.name}>
                                    <div
                                      style={{
                                        gap: "2rem",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <span>Mã vc: {item.code}</span>

                                      <span>
                                        Giá trị giảm:{" "}
                                        {Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(item.discountAmount)}
                                      </span>

                                      <span>
                                        Giá trị đơn tối thiểu:{" "}
                                        {Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(item.minBillValue)}
                                      </span>
                                    </div>
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="Ghi chú"
                            name="note"
                            labelCol={{ span: 24 }}
                            labelAlign="left"
                          >
                            <Input style={{ width: "100%" }} />
                          </Form.Item>
                          <Divider />
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            <span>Tổng tiền: </span>

                            <span style={{ color: "red" }}>
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(handleCalTotalPrice() + shipPrice)}
                            </span>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {typeOfSales === 1 && (
                        <>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col span={11}>
                              <Form.Item
                                label="Hình thức thanh toán:"
                                // style={{ fontSize: "3rem" }}
                                name="typeOfMethodPayment"
                                labelCol={{ span: 24 }}
                                labelAlign="left"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Hình thức thanh toán không được để trống!",
                                  },
                                ]}
                                initialValue={"Tiền mặt"}
                              >
                                <Select options={optionTypeOfMethodPayment} />
                              </Form.Item>
                            </Col>
                            <Col span={11}>
                              <div className="total-money">
                                <span className="title">
                                  Tổng tiền hoá đơn:
                                </span>

                                <span className="num">
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(handleCalTotalPrice())}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col span={11}>
                              <Form.Item
                                label="Số tiền khách đưa:"
                                // style={{ fontSize: "3rem" }}
                                name="moneyPaid"
                                labelCol={{ span: 24 }}
                                labelAlign="left"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Số tiền khách đưa không được để trống!",
                                  },
                                  {
                                    validator: (rule, value) => {
                                      if (value < handleCalTotalPrice()) {
                                        return Promise.reject(
                                          "Số tiền khách đưa phải lớn hơn tổng giá trị đơn hàng"
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  style={{ width: "100%" }}
                                  formatter={(value) =>
                                    `${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )
                                  }
                                  addonAfter="VND"
                                  disabled={listOrderDetail?.length <= 0}
                                  onChange={(value) => handleCalRefund(value)}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={11}>
                              <div className="total-money">
                                <span className="title">
                                  Tiền trả lại khách:
                                </span>
                                <span
                                  className="num"
                                  style={{ color: "black" }}
                                >
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(refund ?? 0)}
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Form.Item
                            label="Voucher:"
                            name="voucher"
                            labelCol={{ span: 24 }}
                            labelAlign="left"
                          >
                            <Select
                              style={{ width: "100%" }}
                              allowClear
                              onChange={(item) => {
                                handleOnChangeVoucher(item);
                              }}
                            >
                              {listVoucher.map((item) => {
                                return (
                                  <Option value={item.id} label={item.name}>
                                    <div
                                      style={{
                                        gap: "2rem",
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "row",
                                      }}
                                    >
                                      <span>Mã vc: {item.code}</span>
                                      <span>
                                        Giá trị giảm:{" "}
                                        {item.reduceForm === 0 ? (
                                          Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                          }).format(item.discountAmount)
                                        ) : (
                                          <>{item.discountAmount}%</>
                                        )}
                                      </span>

                                      <span>
                                        Giá trị đơn tối thiểu:{" "}
                                        {Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(item.minBillValue)}
                                      </span>
                                    </div>
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="Ghi chú:"
                            name="note"
                            labelCol={{ span: 24 }}
                            labelAlign="left"
                          >
                            <Input style={{ width: "100%" }} />
                          </Form.Item>
                        </>
                      )}

                      <div
                        className="order-btn-paid"
                        // htmlType="submit"
                        onClick={() => form.submit()}
                      >
                        <span className="order-btn-paid-title">Thanh Toán</span>
                      </div>
                    </Form>
                  </div>
                </div>
                <div className="tab-right-content">
                  <div
                    style={{
                      display: "flex",
                      paddingBottom: "0.5em",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <h5>Giỏ Hàng</h5>
                    </span>
                    <span>
                      <Button
                        className="buttonShopping"
                        type="primary"
                        icon={<QrcodeOutlined />}
                        onClick={() => handleScanQr()}
                      >
                        Quét mã QrCode
                      </Button>
                    </span>
                  </div>
                  <div className="search-shoe-detail">
                    <SearchProductInput
                      listShoeDetail={listShoeDetail}
                      activeKey={activeKey}
                      handleGetOrderDetailById={handleGetOrderDetailById}
                      setListOrderDetail={setListOrderDetail}
                    />
                  </div>
                  <div className="table-list-order-detail">
                    <TableProductDetail
                      listOrderDetail={listOrderDetail}
                      setListOrderDetail={setListOrderDetail}
                      activeKey={activeKey}
                      handleGetListVoucher={handleGetListVoucher}
                    />
                  </div>
                  <div className="total-money">
                    <span className="title">Tạm Tính:</span>
                    <span className="num">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(handleCalTotalPriceOfProd())}
                    </span>
                  </div>
                </div>
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
      <ScanQrCode
        openScanQr={openScanQr}
        setOpenScanQr={setOpenScanQr}
        listShoeDataQR={listShoeDataQR}
        activeKey={activeKey}
        setListOrderDetail={setListOrderDetail}
      />
    </div>
  );
};
export default ShoppingCounter;
