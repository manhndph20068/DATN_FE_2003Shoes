import React, { useState } from "react";
import {
  Button,
  Modal,
  Checkbox,
  Form,
  Input,
  message,
  notification,
} from "antd";
import { Divider } from "antd";
import { callCreateUser } from "../../../services/api";

const UserModelCreate = (props) => {
  const { isModalCreateOpen, setIsModalCreateOpen, fetchUser } = props;

  const handleCancel = () => {
    setIsModalCreateOpen(false);
  };

  const onFinish = async (values) => {
    // console.log("Success:", values);
    const { fullName, password, email, phone } = values;
    let res = await callCreateUser(fullName, password, email, phone);
    console.log("res:", res);
    if (res?.data?.isActive === true) {
      form.resetFields();
      handleCancel();
      message.success("Thêm thành công");
      fetchUser();
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title="Thêm mới User"
        open={isModalCreateOpen}
        onOk={() => {
          form.submit();
        }}
        onCancel={handleCancel}
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
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
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
            <Input />
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
export default UserModelCreate;
