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
import { Link, useNavigate } from "react-router-dom";

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
    <div>
      <div
        style={{
          backgroundColor: "rgb(242, 242, 242)",
          paddingTop: "60px",
          paddingBottom: "140px",
        }}
      >
        <div
          className="container"
          style={{
            backgroundColor: "white",
            width: "850px",
            height: "400px",
            borderRadius: "30px",
          }}
        >
          <div className="row">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Đăng Ký </h3>
          </div>
          <div className="row" style={{ marginTop: "10px" }}>
            <div className="col-6">
              <img
                src="/src/assets/logo2003Shoes.png"
                alt="anh"
                style={{ width: "400px" }}
              />
            </div>
            <div className="col-6">
              <div
                className="form-register"
                style={{ marginTop: "50px", marginRight: "50px" }}
              >
                {/* <Divider /> */}
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
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Họ và tên không được để trống!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên" />
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
                    <Input placeholder="Nhập email" />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Mật khẩu không được để trống!",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      className="buttonRegister"
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Đăng Ký
                    </Button>
                  </Form.Item>
                  <p style={{ marginLeft: "140px" }}>
                    Bạn đã có tài khoản ? <Link to={"/login"}>Đăng nhập</Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
