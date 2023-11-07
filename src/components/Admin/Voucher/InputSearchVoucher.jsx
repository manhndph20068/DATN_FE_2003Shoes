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
} from "antd";
import moment from "moment/moment";
const InputSearchVoucher = (props) => {
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
      name: values.nameOfVaoucher ?? null,
      status: values.status ?? null,
      startDate,
      endDate,
    };
    console.log("newFilter", newFilter);
    setFilter(newFilter);
  };

  const optionStatusVoucher = [
    {
      label: "Chờ kích hoạt",
      value: 0,
    },
    {
      label: "Đang hoạt động",
      value: 1,
    },
    {
      label: "Hết hạn",
      value: 2,
    },
    {
      label: "Huỷ",
      value: 3,
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
        padding: "20px 10px 20px 10px",
      }}
    >
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row
          gutter={[25, 25]}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Col span={7}>
            <Form.Item label="Tên Voucher" name="nameOfVaoucher">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Trạng thái" name="status">
              <Select options={optionStatusVoucher} allowClear />
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
        </Row>

        <div
          wrappercol={{ offset: 8, span: 16 }}
          style={{ textAlign: "right", paddingRight: "75px" }}
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
      </Form>
    </div>
  );
};
export default InputSearchVoucher;
