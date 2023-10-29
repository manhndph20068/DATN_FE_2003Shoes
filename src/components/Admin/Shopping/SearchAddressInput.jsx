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
import TextArea from "antd/es/input/TextArea";

const SearchAddressInput = (props) => {
  const {
    shipPrice,
    setShipPrice,
    listProvince,
    setListProvince,
    provinceSelected,
    setProvinceSelected,
    listDistrict,
    setListDistrict,
    districtSelected,
    setDistrictSelected,
    listWard,
    setListWard,
    wardSelected,
    setWardSelected,
    form,
  } = props;

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

  return (
    <>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col span={7}>
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
              // filterOption={filterOption}
              onChange={(value) => setProvinceSelected(value)}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
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
              // filterOption={filterOption}
              allowClear
              value={districtSelected}
              onChange={(value) => setDistrictSelected(value)}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
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
              // filterOption={filterOption}
              allowClear
              value={wardSelected}
              onChange={(value) => setWardSelected(value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        width="100%"
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
        <TextArea rows={2} width="100%" />
      </Form.Item>
    </>
  );
};
export default SearchAddressInput;
