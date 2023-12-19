import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Row,
  Col,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { callAddNewAddress } from "../../services/api";

const ModalAddnewAddress = (props) => {
  const { isModalCreateOpen, setIsModalCreateOpen, handleGetListAddress } =
    props;
  const [listProvince, setListProvince] = useState([]);
  const [provinceSelected, setProvinceSelected] = useState(201);
  const [listDistrict, setListDistrict] = useState([]);
  const [listVoucher, setListVoucher] = useState([]);
  const [districtSelected, setDistrictSelected] = useState(null);
  const [listWard, setListWard] = useState([]);
  const [wardSelected, setWardSelected] = useState(null);
  const [discountVoucher, setDiscountVoucher] = useState(0);
  const [form] = Form.useForm();

  const user = useSelector((state) => state?.account?.user);

  const showModal = () => {
    setIsModalCreateOpen(true);
  };

  const handleOk = () => {
    setIsModalCreateOpen(false);
  };

  const handleCancel = () => {
    setIsModalCreateOpen(false);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    const data = {
      accountId: user?.id,
      name: values.name,
      phoneNumber: values.phone,
      specificAddress: values.address,
      ward: values.ward,
      district: values.district,
      province: values.province,
      note: "",
    };
    console.log("data", data);
    const res = await callAddNewAddress(data);
    if (res) {
      setIsModalCreateOpen(false);
      handleGetListAddress();
      message.success("Thêm địa chỉ thành công!");
      form.resetFields();
    } else {
      message.error("Thêm địa chỉ thất bại!");
      setIsModalCreateOpen(false);
      form.resetFields();
    }
  };

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

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        maskClosable={false}
        title="Thêm địa chỉ mới"
        open={isModalCreateOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Divider />
        <Form
          name="basic"
          form={form}
          //   labelCol={{
          //     span: 8,
          //   }}
          //   wrapperCol={{
          //     span: 16,
          //   }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout={"vertical"}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên không được để trống!",
              },
              {
                pattern: /^[^\s]*$/,
                message: "Không được nhập khoảng trắng!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
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
            <Input />
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
            <TextArea rows={3} placeholder="Nhập địa chỉ cụ thể" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddnewAddress;
