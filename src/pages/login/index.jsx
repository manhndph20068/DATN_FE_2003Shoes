import React, { useEffect, useState } from "react";
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
import {
  callGetCartByAccountId,
  callGetListCartDetailById,
  callLogin,
} from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doAddIdCart, doLogin } from "../../redux/account/accountSlice";
import {
  clearCart,
  doInitalCartWithAccount,
} from "../../redux/order/orderSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicket,
  faPhoneVolume,
  faTag,
  faShoePrints,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./login.scss";
const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleGetListCartDetailById = async (id) => {
    const res = await callGetListCartDetailById(id);
    console.log("res handleGetListCartDetailById", res);
    if (res?.status === 0) {
      dispatch(doInitalCartWithAccount(res.data));
    }
  };

  const handleGetCartByAccountId = async (id) => {
    const res = await callGetCartByAccountId(id);
    console.log("res handleGetCartBtAccountId", res);
    if (res?.status === 0) {
      handleGetListCartDetailById(res.data.id);
      dispatch(doAddIdCart(res.data.id));
    }
  };

  const onFinish = async (values) => {
    const { username, password } = values;
    setIsLoading(true);
    localStorage.removeItem("access_token");
    const res = await callLogin(username, password);
    console.log("res", res);
    setIsLoading(false);
    if (res?.statusCode === 0) {
      localStorage.setItem("access_token", res.accessToken);
      dispatch(clearCart());
      console.log("res.userInfo", res.userInfo);
      dispatch(doLogin(res.userInfo));
      handleGetCartByAccountId(res.userInfo.id);
      message.success(res.message);
      navigate("/");
      // window.location.reload();
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
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
              Đăng Nhập
            </h3>
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
                style={{ marginTop: "80px", marginRight: "50px" }}
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
                    label="Email"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Email không đúng định dạng!",
                        type: "email",
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
                      className="buttonLogin"
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                  <p style={{ marginLeft: "70px" }}>
                    Bạn chưa có tài khoản vui lòng:{" "}
                    <Link to={"/register"}>Đăng ký !</Link>
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

export default LoginPage;
