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
import { QrcodeOutlined, ShoppingOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import {
  callAddNewOrderAtCounter,
  callGetListOrderAtCounter,
  callGetOrderDetailAtCounterById,
  callListShoeDetailAtCounter,
} from "../../../services/api";
import "./ShoppingCounter.scss";
import TextArea from "antd/es/input/TextArea";
import TableProductDetail from "./TableProductDetail";
import SearchProductInput from "./SearchProductInput";
import { useSelector } from "react-redux";
import SearchAddressInput from "./SearchAddressInput";

const defaultPanes = new Array(2).fill(null).map((_, index) => {
  const id = String(index + 1);
  return {
    label: `Tab ${id}`,
    children: `Content of Tab Pane ${index + 1}`,
    key: id,
  };
});

const ShoppingCounter = () => {
  const [listOrderAtCounter, setListOrderAtCounter] = useState([]);
  const [typeOfSales, setTypeOfSales] = useState(1);
  const [activeKey, setActiveKey] = useState(null);
  const [listOrderDetail, setListOrderDetail] = useState(null);
  const [listShoeDetail, setListShoeDetail] = useState([]);
  const [refund, setRefund] = useState(0);

  const [shipPrice, setShipPrice] = useState(0);
  const [listProvince, setListProvince] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(201);
  const [listDistrict, setListDistrict] = useState([]);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [listWard, setListWard] = useState([]);
  const [wardSelected, setWardSelected] = useState(null);

  const [form] = Form.useForm();

  const staffName = useSelector((state) => state.account.user.name);

  const onChange = (key) => {
    setActiveKey(key);
    console.log("key", key);
    handleGetOrderDetailById(key);
    console.log("listOrderDetail", listOrderDetail);
    setShipPrice(0);
    getTotalPriceShip();
    setProvinceSelected(201);
    setDistrictSelected(null);
    setWardSelected(null);
  };

  const handleGetOrderDetailById = async (id) => {
    const res = await callGetOrderDetailAtCounterById(id);
    setListOrderDetail(res.data);
    console.log("handleGetOrderDetailById ");
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
        setListOrderAtCounter(rescallGetListOrder.data);
      }
      setActiveKey(String(res.data.id));
      console.log("res.data.id", String(res.data.id));
      console.log("activeKey d", activeKey);
    } else {
      message.error(res.mess);
    }
  };

  const fetchListOrderAtCounter = async () => {
    const res = await callGetListOrderAtCounter();
    if (res.data.length > 0) {
      setListOrderAtCounter(res.data);
      setActiveKey(String(res.data[0].id));
    }
  };

  const fetchListShoeDetailAtCounter = async () => {
    const res = await callListShoeDetailAtCounter();
    console.log("res", res);
    if (res.data.length > 0) {
      const list = res.data.map((item) => {
        return {
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
      setListShoeDetail(list);
    } else {
      setListShoeDetail([]);
    }
  };

  useEffect(() => {
    fetchListShoeDetailAtCounter();
    handleGetOrderDetailById(activeKey);
    setShipPrice(0);
  }, [activeKey]);

  useEffect(() => {
    fetchListOrderAtCounter();
    fetchListShoeDetailAtCounter();
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
    ]);
    form.setFieldsValue({ typeOfSale: 1 });
    setRefund(0);
    setTypeOfSales(1);
    getTotalPriceShip();
    setShipPrice(0);
    setProvinceSelected(201);
    setDistrictSelected(null);
    setWardSelected(null);
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

  const onFinish = (values) => {
    const { typeOfSale } = values;
    console.log("values", values);
    console.log("typeOfSale", typeOfSale);
  };

  const handleCalTotalPrice = () => {
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

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={addNewOrder}>
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
          {listOrderAtCounter.map((pane) => (
            <TabPane tab={pane.code} key={pane.id}>
              <div className="tab-container">
                <div className="tab-left-content">
                  <div className="title-order">
                    <h2>Hoá Đơn {pane.code}</h2>
                  </div>
                  <div className="title-order-infor">
                    <h3>Thông Tin Khách Hàng</h3>
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
                      <Form.Item
                        label="Hình thức bán hàng"
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
                            <Col span={10}>
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
                                <Input disabled />
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
                                  }).format(handleCalTotalPrice())}
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
                              }).format(handleCalTotalPriceOrder())}
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
                                label="Hình thức thanh toán"
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
                                label="Số tiền khách đưa"
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
                      <h2>Hoá Đơn Chi Tiết</h2>
                    </span>
                    <span>
                      <Button type="primary" icon={<QrcodeOutlined />}>
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
                    />
                  </div>
                  <div className="total-money">
                    <span className="title">Tạm Tính:</span>
                    <span className="num">
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(handleCalTotalPrice())}
                    </span>
                  </div>
                </div>
              </div>
            </TabPane>
          ))}
          {/* <TabPane tab="Tab 1" key="1">
            1st TAB PANE Content
          </TabPane> */}
        </Tabs>
      </div>
    </div>
  );
};
export default ShoppingCounter;
