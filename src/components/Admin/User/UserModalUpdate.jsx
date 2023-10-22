import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  notification,
  Divider,
} from "antd";
import { callUpdateUser } from "../../../services/api";

const UserModelUpdate = (props) => {
  const { openViewUpdate, setOpenViewUpdate, dataViewUpdate, fetchUser } =
    props;

  const handleOk = () => {
    setOpenViewUpdate(false);
    form.submit();
  };

  const handleCancel = () => {
    setOpenViewUpdate(false);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    const { _id, fullName, phone } = values;
    const res = await callUpdateUser(_id, fullName, phone);
    if (res.statusCode === 200) {
      message.success("Update thành công");
      fetchUser();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(dataViewUpdate);
  }, [dataViewUpdate]);
  return (
    <>
      <Modal
        forceRender
        title="Basic Modal"
        open={openViewUpdate}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Cập nhật"
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          //   wrapperCol={{ span: 16 }}
          //   style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Divider />
          <Form.Item name="_id" rules={[{ required: true }]} hidden>
            <Input />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModelUpdate;
