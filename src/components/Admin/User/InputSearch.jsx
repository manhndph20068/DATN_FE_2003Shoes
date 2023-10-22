import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";

const InputSearch = (props) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    let query = "";
    if (values.fullName) {
      query += `&fullName=/${values.fullName}/i`;
    }
    if (values.email) {
      query += `&email=/${values.email}/i`;
    }
    if (values.phone) {
      query += `&phone=/${values.phone}/i`;
    }
    if (query) {
      props.handleSearch(query);
    }
    console.log("queryINput:", query);
  };
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
            <Form.Item label="Full Name" name="fullName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="Phone" name="phone">
              <Input />
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
export default InputSearch;
