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

const InputSearchOrder = (props) => {
  const { setFilter, filter } = props;
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
    console.log("startDate", startDate);
    console.log("endDate", endDate);
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
  ];

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
        labelCol={{ span: 5 }}
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
            <Form.Item label="Customer" name="customer">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item label="Date" name="date">
              <RangePicker
                showTime={{ format: "HH:mm:ss" }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Price" name="price">
              <Slider
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
            <Form.Item label="Loại" name="type">
              <Select options={optionType} allowClear />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item label="Trạng thái" name="status">
              <Select options={optionStatus} allowClear />
            </Form.Item>
          </Col>
          <Col span={7}>
            <div
              wrappercol={{ offset: 8, span: 16 }}
              style={{ textAlign: "right" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "7px" }}
              >
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default InputSearchOrder;
