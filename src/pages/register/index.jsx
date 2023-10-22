import React, { useState } from "react";
import "./index.scss";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  Space,
  notification,
  message,
} from "antd";
import { callRegister } from "../../services/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { fullName, email, password } = values;
    setIsLoading(true);
    const res = await callRegister(fullName, email, password);
    console.log("res", res);
    setIsLoading(false);
    if (res?.data?.email) {
      message.success(res.data.message);
      navigate("/login");
    } else {
      notification.error({
        message: "Error",
        description: res.message,
      });
    }
  };

  return (
    <div className="form-register">
      <h3 style={{ textAlign: "center" }}>Đăng kí</h3>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: "auto" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Fullname"
          name="fullName"
          rules={[{ required: true, message: "Tên không được để trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email không được để trống!",
              // type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Pasword không được để trống!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterPage;
