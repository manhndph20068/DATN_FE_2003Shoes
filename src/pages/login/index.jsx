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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doAddIdCart, doLogin } from "../../redux/account/accountSlice";
import {
  clearCart,
  doInitalCartWithAccount,
} from "../../redux/order/orderSlice";

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
      <div className="form-register">
        <h3 style={{ textAlign: "center" }}>Login</h3>
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Pasword không được để trống!",
              },
            ]}
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
    </div>
  );
};

export default LoginPage;
