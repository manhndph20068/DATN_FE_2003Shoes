import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Row,
  Select,
  Steps,
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
  clearCart,
  doDeleteItemCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";
import TextArea from "antd/es/input/TextArea.js";
import { callFetchAccount } from "../../services/api.jsx";
const ViewPayment = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipPrice, setShipPrice] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [listProvince, setListProvince] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(201);
  const [listDistrict, setListDistrict] = useState([]);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [listWard, setListWard] = useState([]);
  const [wardSelected, setWardSelected] = useState(null);
  const { setCurrentStep } = props;

  const cart = useSelector((state) => state.order.cart);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const confirmDelete = (item) => {
    dispatch(doDeleteItemCartAction(item.id));
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let sum = 0;
      cart.map((item) => {
        sum += item.quantity * item.detail.priceInput;
      });
      setTotalPrice(sum);
      setNextStep(1);
    } else {
      setTotalPrice(0);
      setNextStep(0);
    }
  }, [cart, nextStep]);

  useEffect(() => {
    async function getDataProvince(url = "") {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: "d57a9f98-45b8-11ee-a6e6-e60958111f48",
        },
      });
      return response.json();
    }

    getDataProvince(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province"
    ).then((data) => {
      const listProvince = data?.data?.map((item) => {
        return {
          label: item.ProvinceName,
          value: item.ProvinceID,
        };
      });
      setListProvince(listProvince);
      form.resetFields(["district"]);
      form.resetFields(["ward"]);
    });
  }, [provinceSelected]);

  useEffect(() => {
    async function getDataDistrict(url = "", data = {}) {
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

    getDataDistrict(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
      { province_id: provinceSelected }
    ).then((data) => {
      const listDistrict = data?.data?.map((item) => {
        return {
          label: item.DistrictName,
          value: item.DistrictID,
        };
      });
      setListDistrict(listDistrict);
      form.resetFields(["ward"]);
    });
  }, [provinceSelected, districtSelected]);

  useEffect(() => {
    async function getDataDistrict(url = "", data = {}) {
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

    getDataDistrict(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
      { district_id: districtSelected }
    ).then((data) => {
      const listWard = data?.data?.map((item) => {
        return {
          label: item.WardName,
          value: item.WardCode,
        };
      });
      setListWard(listWard);
    });
  }, [provinceSelected, districtSelected]);

  const onFinish = async (values) => {
    const { username, phone, address, typePaid } = values;
    console.log("values", values);
    const detailOrder = cart.map((item) => {
      return {
        shoeName: item.detail.nameShoe,
        quantity: item.quantity,
        id: item.id,
      };
    });

    const data = {
      name: username,
      address: address,
      phone: phone,
      totalPrice: totalPrice,
      detail: detailOrder,
    };

    // await callFetchAccount();
    // const res = await callCreateAnOrder(data);
    // if (res?.statusCode === 201) {
    //   setCurrentStep(2);
    //   dispatch(clearCart());
    //   message.success(res.data);
    // }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
      console.log("shipPrice", shipPrice);
    });
  };

  const formatterPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <>
      <Row gutter={[20, 20]} style={{ justifyContent: "space-between" }}>
        <Col lg={15} md={15} xs={24} className="order-left-content">
          {cart?.length > 0 &&
            cart.map((item, index) => {
              return (
                <div className="cart-item" key={`id${index}`}>
                  <img className="item-img" src={item.detail.thumbnail} />
                  <div className="item-name">{item.detail.code}</div>
                  <div className="item-price">
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.detail.priceInput)}
                  </div>

                  <div style={{ width: "100px" }}>
                    Số lượng: {item.quantity}
                  </div>
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
            })}
        </Col>
        <Col lg={9} md={9} xs={24} className="order-right-content">
          <div className="order-content">
            {/* <div className="order-title">Thông tin đơn hàng</div> */}
            <div className="order-title-input">
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
                  label="Tên người nhận"
                  // style={{ fontSize: "3rem" }}
                  name="username"
                  labelCol={{ span: 24 }}
                  labelAlign="left"
                  rules={[
                    {
                      required: true,
                      message: "Tên người nhận không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không được để trống!",
                      pattern: new RegExp(/^0\d{9}$/),
                    },
                  ]}
                >
                  <Input style={{ width: "100%" }} />
                </Form.Item>

                <Row
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Col span={11}>
                    <Form.Item
                      label="Tỉnh/Thành Phố"
                      name="province"
                      rules={[
                        {
                          required: true,
                          message: "Tỉnh/Thành Phố không được để trống!",
                        },
                      ]}
                      initialValue={provinceSelected}
                    >
                      <Select
                        showSearch
                        // style={{ width: 150 }}
                        placeholder="Chọn Tỉnh/Thành Phố"
                        options={listProvince}
                        filterOption={filterOption}
                        onChange={(value) => setProvinceSelected(value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item
                      label="Quận/Huyện"
                      name="district"
                      rules={[
                        {
                          required: true,
                          message: "Quận/Huyện không được để trống!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        // style={{ width: 150 }}
                        placeholder="Chọn Quận/Huyện"
                        options={listDistrict}
                        filterOption={filterOption}
                        allowClear
                        value={districtSelected}
                        onChange={(value) => setDistrictSelected(value)}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Phường/Xã"
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: "Phường/Xã không được để trống!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    // style={{ width: 150 }}
                    placeholder="Chọn Phường/Xã"
                    options={listWard}
                    filterOption={filterOption}
                    allowClear
                    value={wardSelected}
                    onChange={(value) => setWardSelected(value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Địa chỉ không được để trống!",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                  name="typePaid"
                  label="Hình thức thanh toán"
                  rules={[
                    {
                      required: true,
                      message: "Phương thức thanh toán không được để trống!",
                    },
                  ]}
                  initialValue={1}
                >
                  <Radio.Group>
                    <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                  </Radio.Group>
                </Form.Item>
                <Divider />
                <div className="order-ship">
                  <span>
                    Phí giao hàng:{" "}
                    {provinceSelected &&
                    districtSelected &&
                    wardSelected &&
                    getTotalPriceShip()
                      ? formatterPrice.format(shipPrice)
                      : formatterPrice.format(shipPrice)}
                  </span>
                </div>
                <div className="order-tong">
                  <span>Tổng tiền:</span>
                  <span style={{ color: "red", fontSize: "1.5rem" }}>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice || 0)}
                  </span>
                </div>
                <Divider />
                {nextStep > 0 ? (
                  <div
                    className="order-btn-paid"
                    htmlType="submit"
                    onClick={() => form.submit()}
                  >
                    <span className="order-btn-paid-title">
                      Đặt Hàng({cart?.length ?? 0})
                    </span>
                  </div>
                ) : (
                  <div
                    className="order-btn-paid"
                    htmlType="submit"
                    style={{ backgroundColor: "gray" }}
                  >
                    <span className="order-btn-paid-title">
                      Đặt Hàng({cart?.length ?? 0})
                    </span>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ViewPayment;
