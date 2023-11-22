import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { ArrowRightOutlined, AppstoreOutlined } from "@ant-design/icons";
const InputSearchShoe = (props) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("values", values);
    let query = "";
    if (values.nameShoe) {
      query += `&nameShoe=${values.nameShoe}`;
    }
    if (values.size) {
      query += `&sizeShoe=${values.size}`;
    }
    if (values.brand) {
      query += `&brandShoe=${values.brand}`;
    }
    if (query) {
      props.handleFilter(query);
    }
  };
  return (
    <>
      <div style={{ paddingBottom: "1.5rem" }}>
        <p style={{ fontSize: "15px" }}>
          <AppstoreOutlined style={{ fontSize: "14px", marginRight: "5px" }} />
          <span>Quản lý sản phẩm </span>
          <ArrowRightOutlined
            style={{
              fontSize: "10px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />
          <span>
            <i>Danh sách sản phẩm</i>
          </span>
        </p>
      </div>
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
              <Form.Item
                style={{ fontWeight: "bold" }}
                label="Tên Giày"
                name="nameShoe"
              >
                <Input placeholder="Nhập tên giày" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                style={{ fontWeight: "bold" }}
                label="Kích cỡ"
                name="size"
              >
                <Input placeholder="Nhập kích cỡ" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                style={{ fontWeight: "bold" }}
                label="Thương hiệu"
                name="brand"
              >
                <Input placeholder="Nhập thương hiệu" />
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
              Tìm kiếm
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Cài lại
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
export default InputSearchShoe;
