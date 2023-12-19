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
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  clearCart,
  doClearTempCart,
  doDeleteItemCartAction,
  doDeleteItemCartAfterDoOrder,
  doInitalCartWithAccount,
  doInitalTempData,
  doUpdateCartAction,
} from "../../redux/order/orderSlice.js";
import TextArea from "antd/es/input/TextArea.js";
import {
  callAddMethodPayment,
  callDefaultAddressById,
  callDeleteCartDetail,
  callDoOrderByCustomer,
  callDoOrderByGuest,
  callFetchAccount,
  callGetCartByAccountId,
  callGetListCartDetailById,
  callGetVouchersByTotalMoney,
  callSubmitOrderVNPay,
} from "../../services/api.jsx";
import { v4 as uuidv4 } from "uuid";
import { BiArrowBack } from "react-icons/bi";
import { doAddIdCart } from "../../redux/account/accountSlice.js";

const ViewPayment = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalMoneyOfProds, setTotalMoneyOfProds] = useState(0);
  const [shipPrice, setShipPrice] = useState(0);
  const [nextStep, setNextStep] = useState(0);
  const [listProvince, setListProvince] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(201);
  const [listDistrict, setListDistrict] = useState([]);
  const [listVoucher, setListVoucher] = useState([]);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [listWard, setListWard] = useState([]);
  const [wardSelected, setWardSelected] = useState(null);
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const [typeOfReduceVoucher, setTypeOfReduceVoucher] = useState(null);
  const [vocherSelected, setVoucherSelected] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentStep } = props;

  const cart = useSelector((state) => state.order.cart);
  const dataAcc = useSelector((state) => state?.account?.user);
  const idCart = useSelector((state) => state.account.idCart);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const user = useSelector((state) => state?.account?.user);

  const handleGetDataAccountById = async () => {
    const data = {
      accountId: dataAcc?.id,
    };

    const res = await callDefaultAddressById(data);
    if (res.status === 0) {
      form.setFieldsValue({
        username: res?.data?.name,
        phone: res?.data?.phoneNumber,
        address: res?.data?.specificAddress,
        province: res?.data?.province,
        district: res?.data?.district,
        ward: res?.data?.ward,
      });
      setProvinceSelected(res?.data?.province);
      setDistrictSelected(res?.data?.district);
      setWardSelected(res?.data?.ward);
    }
  };

  useEffect(() => {
    if (dataAcc?.id) {
      handleGetDataAccountById();
    }
  }, [dataAcc?.id]);

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

  const confirmDelete = (item) => {
    if (idCart !== null) {
      handleDeleteCartDetail(+idCart, +item.id);
    } else {
      dispatch(doDeleteItemCartAction(item.id));
    }
  };

  useEffect(() => {
    handleGetListVoucher();
    if (cart && cart.filter((item) => item.status === 1).length > 0) {
      let sum = 0;
      cart
        .filter((item) => item.status === 1)
        .map((item) => {
          sum += item.quantity * item.detail.priceInput;
        });
      setTotalPrice(sum + shipPrice);
      setTotalMoneyOfProds(sum);
      setNextStep(1);
    } else {
      setTotalPrice(0);
      setTotalMoneyOfProds(0);
      setNextStep(0);
    }
  }, [cart, nextStep, shipPrice]);

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

  const handleSubmitOrderVnPay = async (data) => {
    const orderTotal = data?.totalMoney;
    const orderInfo = "VNPAY" + uuidv4();
    console.log("orderInfo", orderInfo);
    console.log("orderTotal", orderTotal);

    let res = await callSubmitOrderVNPay(orderTotal, orderInfo);
    console.log("res", res);
    if (res !== null) {
      window.location = res;
    }
  };

  const onFinish = async (values) => {
    const { username, phone, address, typePaid, voucher, email } = values;
    dispatch(doClearTempCart());
    const id = +dataAcc.id !== 0 ? dataAcc.id : null;
    const province = listProvince.filter(
      (item) => item.value == provinceSelected
    )[0].label;
    const district = listDistrict.filter(
      (item) => item.value === districtSelected
    )[0].label;
    const ward = listWard.filter((item) => item.value === wardSelected)[0]
      .label;
    console.log("address", province, district, ward);

    const detailOrder = cart
      .filter((item) => item.status === 1)
      .map((item) => {
        console.log("item", item);
        return {
          shoeName: item.detail.nameShoe,
          status: item.status,
          quantity: item.quantity,
          priceInput: item.detail.priceInput,
          id: item.id,
        };
      });

    const data = {
      idVoucher: voucher ?? null,
      specificAddress: address,
      ward: wardSelected,
      district: districtSelected,
      province: provinceSelected,
      idAccount: id,
      phoneNumber: phone,
      email: email,
      customerName: username,
      maximumReductionValue: vocherSelected?.maximumReductionValue,
      address: province + ", " + district + ", " + ward + ", " + address,
      shipFee: shipPrice,
      moneyReduce:
        typeOfReduceVoucher === 1
          ? Math.ceil(
              (totalPrice - discountVoucher) *
                (vocherSelected?.discountAmount / 100)
            )
          : discountVoucher || 0,
      totalMoney: 0,
      note: "Đơn khách đặt",
      shoeDetailListRequets: detailOrder,
    };

    if (
      data.moneyReduce > data.maximumReductionValue &&
      typeOfReduceVoucher === 1
    ) {
      data.moneyReduce = data.maximumReductionValue;
    }

    data.totalMoney =
      typeOfReduceVoucher === 1
        ? Math.ceil(totalPrice - data.moneyReduce)
        : Math.ceil(totalPrice - data.moneyReduce) || 0;

    console.log("data", data);
    if (typePaid === 2) {
      setIsLoading(true);
      dispatch(doInitalTempData(data));
      handleSubmitOrderVnPay(data);
      setIsLoading(false);
    } else {
      if (idCart !== null) {
        console.log("data", data);
        setIsLoading(true);
        const res = await callDoOrderByCustomer(data);
        if (res?.status === 0) {
          setCurrentStep(2);
          await callAddMethodPayment({
            orderId: res?.data?.id,
            method: "Thanh toán khi nhận hàng",
            total: data.totalMoney,
            note: `Khách hàng đặt`,
            status: 0,
          });
          if (dataAcc.id !== null) {
            handleGetCartByAccountId(dataAcc.id);
            setIsLoading(false);
          } else {
            dispatch(doDeleteItemCartAfterDoOrder());
            setIsLoading(false);
          }
          setIsLoading(false);
        } else {
          message.error("Đặt hàng thất bại");
          setIsLoading(false);
        }
      } else {
        console.log("data", data);
        setIsLoading(true);
        const res = await callDoOrderByGuest(data);
        if (res?.status === 0) {
          setCurrentStep(2);
          await callAddMethodPayment({
            orderId: res?.data?.id,
            method: "Thanh toán khi nhận hàng",
            total: data.totalMoney,
            note: `Khách hàng đặt`,
            status: 0,
          });
          dispatch(doDeleteItemCartAfterDoOrder());
          setIsLoading(false);
        } else {
          message.error("Đặt hàng thất bại");
          setIsLoading(false);
        }
      }
    }

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

  const handleGetListVoucher = async () => {
    const data = {
      totalMoneyMyOrder: totalPrice,
    };
    const res = await callGetVouchersByTotalMoney(data);
    if (res?.status === 0) {
      const listVoucherActive = res?.data?.filter(
        (item) => item?.status === 1 && item?.quantity > 0
      );
      setListVoucher(listVoucherActive);
    }
  };

  const handleOnChangeVoucher = (value) => {
    console.log("item", value);
    const voucher = listVoucher?.filter((item) => item.id === value)[0];
    console.log("voucher", voucher);
    setVoucherSelected(voucher);
    setTypeOfReduceVoucher(voucher?.reduceForm);
    if (voucher?.reduceForm === 1) {
      setDiscountVoucher(0);
    } else {
      setDiscountVoucher(voucher?.discountAmount ?? 0);
    }
    // setDiscountVoucher(voucher?.discountAmount ?? 0);
  };

  const handleGetListCartDetail = async (id) => {
    const res = await callGetListCartDetailById(id);
    console.log("res handleGetListCartDetailById", res);
    if (res?.status === 0) {
      dispatch(doInitalCartWithAccount(res.data));
    }
  };

  const handleCalTotalPriceOfProd = () => {
    let total = 0;
    listOrderDetail?.forEach((item) => {
      total += item.price * item.quantity;
    }) ?? 0;

    return total;
  };

  const handleGetCartByAccountId = async (id) => {
    const res = await callGetCartByAccountId(id);
    console.log("res handleGetCartBtAccountId", res);
    if (res?.status === 0) {
      handleGetListCartDetail(res?.data?.id);
      dispatch(doAddIdCart(res?.data?.id));
    }
  };

  return (
    <>
      <Row gutter={[20, 20]} style={{ justifyContent: "space-between" }}>
        <Col lg={15} md={15} xs={24} className="order-left-content">
          <div className="header-content" style={{ textAlign: "center" }}>
            <span style={{ margin: "0px 3px 0 0" }}>
              <BiArrowBack />
            </span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCurrentStep(0);
              }}
            >
              Trang đặt hàng
            </span>
          </div>
          {cart?.length > 0 &&
            cart
              .filter((item) => item.status === 1)
              ?.map((item, index) => {
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
                      Tổng:&nbsp;
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.detail.priceInput * item.quantity)}
                    </div>
                    <div className="item-delete">
                      {/* <Popconfirm
                        placement="top"
                        title={`Bạn có muốn xoá sản phẩm này không?`}
                        onConfirm={() => confirmDelete(item)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined />
                      </Popconfirm> */}
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

                    {
                      pattern: /^[^\s]*$/,
                      message: "Không được nhập khoảng trắng!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên người nhận" />
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

                    {
                      pattern: /^[^\s]*$/,
                      message: "Không được nhập khoảng trắng!",
                    },
                  ]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>

                {idCart === null && (
                  <>
                    {" "}
                    <Form.Item
                      label="Email"
                      name="email"
                      labelCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Email không đúng định dạng!",
                          type: "email",
                        },

                        {
                          pattern: /^[^\s]*$/,
                          message: "Không được nhập khoảng trắng!",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Nhập email "
                      />
                    </Form.Item>
                  </>
                )}

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
                      initialValue={districtSelected}
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
                  initialValue={wardSelected}
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
                  <TextArea rows={3} placeholder="Nhập địa chỉ cụ thể" />
                </Form.Item>

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
                              justifyContent: "space-between",
                              display: "flex",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <span>{item.code}</span>

                            <span>
                              Giá trị giảm:{" "}
                              {item.discountAmount <= 100
                                ? `${+item.discountAmount} %`
                                : Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.discountAmount)}
                            </span>

                            {/* <span>
                              Đơn tối thiểu:{" "}
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.minBillValue)}
                            </span> */}
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
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
                    <Radio value={1}>Thanh toán khi nhận hàng(COD)</Radio>
                    <br />
                    <Radio value={2}>Thẻ ATM / Thẻ tín dụng </Radio>
                  </Radio.Group>
                </Form.Item>
                <Divider />
                <div
                  className="order-total-money"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Tổng tiền hàng: </span>
                  <span style={{ fontSize: "1rem" }}>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalMoneyOfProds || 0)}
                  </span>
                </div>

                <div
                  className="order-ship"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Phí giao hàng: </span>
                  <span style={{ fontSize: "1rem" }}>
                    {provinceSelected &&
                    districtSelected &&
                    wardSelected &&
                    getTotalPriceShip()
                      ? formatterPrice.format(shipPrice)
                      : formatterPrice.format(shipPrice)}
                  </span>
                </div>
                <div
                  className="order-total-money"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Voucher giảm giá: </span>
                  <span style={{ fontSize: "1rem" }}>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      typeOfReduceVoucher === 1
                        ? Math.min(
                            (totalPrice - discountVoucher) *
                              (vocherSelected?.discountAmount / 100),
                            vocherSelected?.maximumReductionValue || 0
                          )
                        : discountVoucher || 0
                    )}
                  </span>
                </div>
                <div className="order-tong">
                  <span>Tổng tiền:</span>
                  <span style={{ color: "red", fontSize: "1.5rem" }}>
                    {Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(
                      typeOfReduceVoucher === 1
                        ? Math.max(
                            totalPrice -
                              (Math.min(
                                (totalPrice - discountVoucher) *
                                  (vocherSelected?.discountAmount / 100),
                                vocherSelected?.maximumReductionValue || 0
                              ) > vocherSelected?.maximumReductionValue
                                ? vocherSelected?.maximumReductionValue
                                : Math.min(
                                    (totalPrice - discountVoucher) *
                                      (vocherSelected?.discountAmount / 100),
                                    vocherSelected?.maximumReductionValue || 0
                                  )),
                            0
                          )
                        : Math.max(totalPrice - discountVoucher, 0)
                    )}
                  </span>
                </div>
                <Divider />
                {nextStep > 0 ? (
                  isLoading === false ? (
                    <div
                      className="order-btn-paid"
                      htmlType="submit"
                      onClick={() => form.submit()}
                    >
                      <span className="order-btn-paid-title">
                        Đặt Hàng(
                        {cart?.filter((item) => item.status === 1).length ?? 0})
                      </span>
                    </div>
                  ) : (
                    <div
                      className="order-btn-paid"
                      htmlType="submit"
                      onClick={() => form.submit()}
                      style={{ backgroundColor: "gray" }}
                    >
                      <span className="order-btn-paid-title">
                        <div
                          style={{
                            display: "flex",
                            gap: "0.6rem",
                          }}
                        >
                          <span style={{ paddingTop: "0.7rem" }}>
                            <SyncOutlined spin />
                          </span>
                          <span style={{ paddingTop: "0.7rem" }}>
                            <p> Đang xử lý</p>
                          </span>
                        </div>
                      </span>
                    </div>
                  )
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
