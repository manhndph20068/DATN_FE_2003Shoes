import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
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
import TextArea from "antd/es/input/TextArea.js";
import {
  callUpdateNewOrderAtCounter,
  callUpdateOrderHistory,
} from "../../../services/api";

const ModalUpdateInforCustomer = (props) => {
  const {
    openModalUpdateInforCustomer,
    setOpenModalUpdateInforCustomer,
    dataOrder,
    provinceCurrent,
    districtCurrent,
    wardCurrent,
    handleGetOrder,
    setProvinceCurrent,
    setDistrictCurrent,
    setWardCurrent,
    handleCalTotalPrice,
  } = props;

  const [listProvince, setListProvince] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(null);
  const [listDistrict, setListDistrict] = useState([]);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [listWard, setListWard] = useState([]);
  const [wardSelected, setWardSelected] = useState(null);
  const [shipPrice, setShipPrice] = useState(0);

  const [form] = Form.useForm();

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleOk = () => {
    setOpenModalUpdateInforCustomer(false);
  };

  const handleCancel = () => {
    const address = dataOrder?.address?.split(", ");
    // const elementAtIndex3 = address[3];
    console.log("address", address);

    form.setFieldsValue({
      username: dataOrder?.customerName ?? "",
      phone: dataOrder?.phoneNumber ?? "",
      province: provinceCurrent?.value ?? "",
      district: districtCurrent?.value ?? "",
      ward: wardCurrent?.value ?? "",
      address: address ? address[3] : undefined ?? "",
    });
    setProvinceSelected(provinceCurrent?.value);
    setDistrictSelected(districtCurrent?.value);
    setWardSelected(wardCurrent?.value);
    setOpenModalUpdateInforCustomer(false);
  };

  useEffect(() => {
    console.log("dataOrder", dataOrder);
    console.log("provinceCurrent", provinceCurrent);
    console.log("districtCurrent", districtCurrent);
    console.log("wardCurrent", wardCurrent);
    const address = dataOrder?.address?.split(", ");
    // const elementAtIndex3 = address[3];
    console.log("address", address);

    form.setFieldsValue({
      username: dataOrder?.customerName ?? "",
      phone: dataOrder?.phoneNumber ?? "",
      province: provinceCurrent?.value ?? "",
      district: districtCurrent?.value ?? "",
      ward: wardCurrent?.value ?? "",
      address: address ? address[3] : undefined ?? "",
    });
    setProvinceSelected(provinceCurrent?.value);
    setDistrictSelected(districtCurrent?.value);
    setWardSelected(wardCurrent?.value);
  }, [provinceCurrent, districtCurrent, wardCurrent]);

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
      // setDistrictSelected(null);
      // setWardSelected(null);
      form.resetFields(["district"]);
      form.resetFields(["ward"]);
      // setWardCurrent(null);
      // setDistrictCurrent(null);
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
      // setDistrictSelected(null);
      // setWardSelected(null);

      form.resetFields(["ward"]);
      form.resetFields(["district"]);
      // setWardCurrent(null);
      // setDistrictCurrent(null);
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

  useEffect(() => {
    getTotalPriceShip();
  }, [districtSelected, wardSelected]);

  const onFinish = async (values) => {
    const { username, phone, address, typePaid, voucher, email } = values;
    console.log("Success:", values);

    const province = listProvince.filter(
      (item) => item.value == provinceSelected
    )[0].label;
    const district = listDistrict.filter(
      (item) => item.value === districtSelected
    )[0].label;
    const ward = listWard.filter((item) => item.value === wardSelected)[0]
      .label;
    console.log("address", province, district, ward);

    console.log("dataOrder", dataOrder);
    const data = {
      id: dataOrder?.id,
      idVoucher: dataOrder?.voucherOrder?.id ?? null,
      idAccount: dataOrder?.account?.id ?? null,
      code: dataOrder.code,
      type: dataOrder.type,
      customerName: username ?? null,
      phoneNumber: phone ?? null,
      address:
        province + ", " + district + ", " + ward + ", " + address ?? null,
      shipFee: shipPrice ?? 0,
      moneyReduce: dataOrder.moneyReduce ?? 0,
      totalMoney: handleCalTotalPrice() + shipPrice ?? 0,
      payDate: null,
      shipDate: null,
      desiredDate: null,
      receiveDate: null,
      updatedBy: dataOrder?.updatedBy ?? null,
      note: dataOrder?.note,
      status: dataOrder?.status,
    };
    console.log("dataryrtyrtyty", data);
    const res = await callUpdateOrderHistory(data);
    if (res.status === 0) {
      message.success("Cập nhật thành công");
      await handleGetOrder();
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Cập nhật thông tin nhận hàng"
        open={openModalUpdateInforCustomer}
        onOk={() => {
          {
            form.submit();
            setOpenModalUpdateInforCustomer(false);
          }
        }}
        onCancel={handleCancel}
      >
        <Divider />
        <div className="order-content">
          {/* <div className="order-title">Thông tin đơn hàng</div> */}
          <div className="order-title-input">
            <Form
              form={form}
              name="basic"
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

              <Row style={{ display: "flex", justifyContent: "space-between" }}>
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
                    initialValue={provinceCurrent?.value}
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
                    initialValue={districtCurrent?.value}
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
                initialValue={wardCurrent?.value}
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
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalUpdateInforCustomer;
