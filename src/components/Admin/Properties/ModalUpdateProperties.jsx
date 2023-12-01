import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import {
  callDoUpdateBrand,
  callDoUpdateCategory,
  callDoUpdateColor,
  callDoUpdateSize,
  callDoUpdateSole,
} from "../../../services/api";
import create from "@ant-design/icons/lib/components/IconFont";

const ModalUpdateProperties = (props) => {
  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    currentProperties,
    setDataUpdate,
    dataUpdate,
    handleGetListProperties,
  } = props;
  const [form] = Form.useForm();
  console.log("dataUpdate", dataUpdate);

  const handleOk = () => {
    setIsModalUpdateOpen(false);
  };

  const handleCancel = () => {
    setIsModalUpdateOpen(false);
  };

  const onFinish = async (values) => {
    const data = {
      id: values?.id,
      name: values?.name,
      createdAt: null,
      updatedAt: null,
      status: values?.status,
    };
    console.log("data", data);
    if (currentProperties === 1) {
      const res = await callDoUpdateCategory(data);
      if (res.status === 0) {
        message.success("Cập nhật thành công");
        setIsModalUpdateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Cập nhật thất bại");
        setIsModalUpdateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 2) {
      const res = await callDoUpdateBrand(data);
      if (res.status === 0) {
        message.success("Cập nhật thành công");
        setIsModalUpdateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Cập nhật thất bại");
        setIsModalUpdateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 3) {
      const res = await callDoUpdateSole(data);
      console.log("res", res);
      if (res.status === 0) {
        message.success("Cập nhật thành công");
        setIsModalUpdateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Cập nhật thất bại");
        setIsModalUpdateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 4) {
      const res = await callDoUpdateSize(data);
      if (res.status === 0) {
        message.success("Cập nhật thành công");
        setIsModalUpdateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Cập nhật thất bại");
        setIsModalUpdateOpen(false);
        form.resetFields();
      }
    }
    if (currentProperties === 5) {
      const res = await callDoUpdateColor(data);
      if (res.status === 0) {
        message.success("Cập nhật thành công");
        setIsModalUpdateOpen(false);
        form.resetFields();
        handleGetListProperties();
      } else {
        message.error("Cập nhật thất bại");
        setIsModalUpdateOpen(false);
        form.resetFields();
      }
    }
  };

  useEffect(() => {
    form.setFieldValue("name", dataUpdate?.name);
    form.setFieldValue("id", dataUpdate?.id);
    form.setFieldValue("status", dataUpdate?.status);
  }, [dataUpdate]);

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Cập nhật thuộc tính"
        open={isModalUpdateOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={24}>
              <Form.Item hidden name="id">
                <Input hidden />
              </Form.Item>
              <Form.Item hidden name="status">
                <Input hidden />
              </Form.Item>
              <Form.Item
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên !",
                  },
                ]}
              >
                <Input placeholder="Nhập tên " />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdateProperties;
