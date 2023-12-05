import React, { useState } from "react";
import {
  DatePicker,
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Select,
  Slider,
} from "antd";
import moment from "moment/moment";
import { ExportOutlined } from "@ant-design/icons";
import { callDoExportOrder } from "../../../services/api";
import axios from "axios";

const InputSearchOrder = (props) => {
  const { setFilter, filter, newFilterTemp, setNewFilterTemp } = props;
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("values", values);

    const formattedDates = values?.date?.map((item) => {
      const { $d } = item;
      const date = new Date($d);
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    });

    const startDate = formattedDates?.[0] ?? null;
    const endDate = formattedDates?.[1] ?? null;

    const newFilter = {
      ...filter,
      customer: values.customer ?? null,
      status: values.status ?? null,
      dateFirst: startDate
        ? moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS")
        : null,
      dateLast: endDate
        ? moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSS")
        : null,
      type: values.type ?? null,
      priceMin: values.price?.[0] ?? null,
      priceMax: values.price?.[1] ?? null,
    };

    setNewFilterTemp({
      page: newFilter?.page,
      size: newFilter?.size,
      customer: newFilter.customer,
      status: newFilter.status,
      dateFirst: newFilter.dateFirst,
      dateLast: newFilter.dateLast,
      type: newFilter.type,
      priceMin: newFilter.priceMin,
      priceMax: newFilter.priceMax,
    });

    console.log("newFilter", newFilter);
    setFilter(newFilter);
  };

  const optionType = [
    {
      value: 2,
      label: "Online",
    },
    {
      value: 1,
      label: "Tại quầy",
    },
  ];

  const optionStatus = [
    {
      value: 0,
      label: "Hoá đơn chờ",
    },
    {
      value: 1,
      label: "Chờ thanh toán",
    },
    {
      value: 2,
      label: "Đã thanh toán",
    },
    {
      value: 3,
      label: "Huỷ",
    },
    {
      value: 4,
      label: "Chờ xác nhận",
    },
    {
      value: 5,
      label: "Đã xác nhận",
    },
    {
      value: 6,
      label: "Chờ giao hàng",
    },
    {
      value: 7,
      label: "Đã bàn giao",
    },
    {
      value: 8,
      label: "Hoàn thành",
    },
  ];

  const handleExportData = async () => {
    const values = form.getFieldsValue();
    const formattedDates = values?.date?.map((item) => {
      const { $d } = item;
      const date = new Date($d);
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    });

    const startDate = formattedDates?.[0] ?? null;
    const endDate = formattedDates?.[1] ?? null;
    const newFilter = {
      ...filter,
      customer: values.customer ?? null,
      status: values.status ?? null,
      dateFirst: startDate
        ? moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS")
        : null,
      dateLast: endDate
        ? moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSS")
        : null,
      type: values.type ?? null,
      priceMin: values.price?.[0] ?? null,
      priceMax: values.price?.[1] ?? null,
    };
    console.log("dataExport", newFilter);

    // const newFilterTemp = {
    //   ...filter,
    //   customer: null,
    //   status: null,
    //   dateFirst: startDateTemp
    //     ? moment(startDateTemp).format("YYYY-MM-DDTHH:mm:ss.SSS")
    //     : null,
    //   dateLast: endDateTemp
    //     ? moment(endDateTemp).format("YYYY-MM-DDTHH:mm:ss.SSS")
    //     : null,
    //   type: null,
    //   priceMin: null,
    //   priceMax: null,
    // };

    const response = await axios.post(
      "http://localhost:8080/api/v1/admin/order/export-order",
      newFilterTemp,
      {
        responseType: "arraybuffer",
      }
    );
    console.log("response", response);

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    console.log("link", link);
    link.href = window.URL.createObjectURL(blob);
    link.download = "list-order-file.xlsx";
    link.click();
  };

  return (
    <div
      className=""
      style={{
        border: "1px solid",
        border: "none",
        background: "#ECECEC",
        borderRadius: "5px",
        padding: "20px 10px 20px 70px",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 7 }}
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row
          gutter={[25, 25]}
          style={{ display: "flex", justifyContent: "left" }}
        >
          <Col span={7}>
            <Form.Item
              style={{ fontWeight: "bold" }}
              label="Khách hàng"
              name="customer"
            >
              <Input
                placeholder="Nhập tên hoặc số điện thoại"
                allowClear
                style={{ width: "200px", marginLeft: "10px" }}
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              style={{ fontWeight: "bold" }}
              label="Khoảng ngày"
              name="date"
            >
              <RangePicker
                showTime={{ format: "HH:mm:ss" }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              style={{ fontWeight: "bold" }}
              label="Khoảng giá"
              name="price"
            >
              <Slider
                style={{ marginLeft: "10px" }}
                range={{ draggableTrack: true }}
                defaultValue={[0, 10000000]}
                min={0}
                max={10000000}
                tooltip={{
                  formatter: (value) => {
                    return Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(value);
                  },
                }}
                marks={{
                  0: "0",
                  5000000: "5,000,000",
                  10000000: "10,000,000",
                }}
              />
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item style={{ fontWeight: "bold" }} label="Loại" name="type">
              <Select
                placeholder="Chọn loại hóa đơn"
                style={{ marginLeft: "10px", fontWeight: "normal" }}
                options={optionType}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              style={{ fontWeight: "bold" }}
              label="Trạng thái"
              name="status"
            >
              <Select
                placeholder="Chọn trạng thái hóa đơn"
                style={{ fontWeight: "normal" }}
                options={optionStatus}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <div
              wrappercol={{ offset: 8, span: 16 }}
              style={{ textAlign: "right" }}
            >
              <Button
                className="orderButton"
                type="primary"
                htmlType="button"
                onClick={() => handleExportData()}
                icon={<ExportOutlined />}
                style={{ marginRight: "10px" }}
              >
                Export
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Tìm kiếm
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Cài lại
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default InputSearchOrder;
