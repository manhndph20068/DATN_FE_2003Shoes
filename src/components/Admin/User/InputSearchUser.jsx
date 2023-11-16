import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Row, Col, Select } from "antd";

const InputSearchUser = (props) => {
  const { setFilter, filter } = props;
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    const newFilter = {
      ...filter,
      name: values.fullName ?? null,
      email: values.email ?? null,
      statusAccount: values.status ?? null,
    };
    setFilter(newFilter);
  };

  const optionStatus = [
    { value: 1, label: "Hoạt động" },
    { value: 0, label: "Không hoạt động" },
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
        <Row gutter={[25, 25]} style={{ justifyContent: "center" }}>
          <Col span={7}>
            <Form.Item label="Tên" name="fullName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Satus" name="status">
              <Select options={optionStatus} allowClear />
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
export default InputSearchUser;
