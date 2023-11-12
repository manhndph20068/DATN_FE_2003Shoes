import React, { useState } from "react";
import { GiOpenBook } from "react-icons/gi";
import { BiCart } from "react-icons/bi";
import "./header.scss";
import { DownOutlined } from "@ant-design/icons";
import {
  Divider,
  Badge,
  Drawer,
  message,
  Popover,
  Row,
  Col,
  Form,
  Select,
} from "antd";
import { Dropdown, Space, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "../../services/api";
import { doLogout } from "../../redux/account/accountSlice";
import { clearCart } from "../../redux/order/orderSlice";
import "../../styles/global.scss";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const cart = useSelector((state) => state.order.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const Logout = async () => {
    localStorage.removeItem("access_token");
    let res = await callLogout();
    localStorage.removeItem("access_token");
    console.log("resLogout", res);
    if (res?.statusCode === 0) {
      message.success(res.message);
      dispatch(doLogout());
      dispatch(clearCart());
      navigate("/");
    }
  };

  const contentPopover = () => {
    return (
      <div className="pop-cart-content">
        {cart?.length > 0 &&
          cart.map((item, index) => {
            return (
              <div className="book-cart" key={`shoe-${index}`}>
                <img src={item.detail.thumbnail} />
                <div style={{ width: "10rem" }}>{item.detail.code}</div>
                <div style={{ width: "5rem" }}>Số lượng {item.quantity}</div>
                <Row>
                  <Col span={24}>
                    <div style={{ color: "#d0011b" }}>
                      Đơn giá:{" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.detail.priceInput)}
                    </div>
                  </Col>
                  {/* <Col span={24}>
                    <div style={{ color: "#d0011b" }}>
                      Tổng tiền:{" "}
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.detail.priceInput * item.quantity)}
                    </div>
                  </Col> */}
                </Row>
              </div>
            );
          })}
        <Divider />
        {cart?.length > 0 ? (
          <div
            style={{
              marginTop: "10px",
              textAlign: "right",
            }}
          >
            <span className="btn-view-cart" onClick={() => navigate("/order")}>
              Xem giỏ hàng
            </span>
          </div>
        ) : (
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <span className="btn-view-cart" onClick={() => navigate("/")}>
              Tiếp tục mua hàng
            </span>
          </div>
        )}
      </div>
    );
  };

  const items = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: <label onClick={() => Logout()}>Đăng xuất</label>,
      key: "logout",
    },
  ];
  if (user?.role?.name === "ROLE_ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/5.jpg`;
  const urlLogo = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/logo.jpg`;

  return (
    <>
      <div className="header-container" justify="center" align="middle">
        <div className="page-header">
          <div className="page-header__left">
            <div
              className="page-header__toggle"
              onClick={() => setOpenDrawer(true)}
            >
              ☰
            </div>
            <div className="page-header__logo">
              <div className="logo">
                {/* <GiOpenBook className="icon-react" /> manh-store */}
                <Link to={"/"}>
                  <img src={urlLogo} alt="logo" style={{ height: "2.5rem" }} />
                </Link>
              </div>

              <div className="input-search">
                <Form layout={"vertical"} form={form}>
                  <Row>
                    <Col span={24}>
                      <Form.Item name="itemShoeDetailSelect">
                        <Select
                          showSearch
                          notFoundContent={"Không tìm thấy sản phẩm"}
                          // placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          // options={listShoeDetail}
                          // onChange={(value) => handleChangeShoeDetail(value)}
                        >
                          {/* {listShoeDetail.map((item) => {
                  return (
                    <Option value={item.value} label={item.label}>
                      <div
                        style={{
                          gap: "3rem",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                        }}
                      >
                        <span>
                          <img
                            src={item.thumbnail}
                            alt={item.thumbnail}
                            style={{ height: "3rem", width: "3rem" }}
                          />{" "}
                        </span>

                        <span>Mã sp: {item.label}</span>
                        <span>Giá: {item.price}</span>
                      </div>
                    </Option>
                  );
                })} */}
                        </Select>
                        {/* <Select options={listShoeDetail}>hi</Select> */}
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </div>
          <div className="page-header__right">
            <ul className="navigation">
              <li className="navigation__item badge">
                <Popover
                  placement="bottom"
                  title={"Giỏ Hàng"}
                  content={contentPopover}
                  arrow={true}
                  rootClassName="popover-cart"
                >
                  <Badge count={cart.length ?? 0} size={"small"}>
                    <BiCart className="icon-cart" />
                  </Badge>
                </Popover>
              </li>
              <li className="navigation__item mobile">
                <Divider type="vertical" />
              </li>
              <li className="navigation__item mobile">
                {!isAuthenticated ? (
                  <span onClick={() => navigate("/login")} className="account">
                    Tai khoan
                  </span>
                ) : (
                  <Dropdown
                    className="account"
                    menu={{ items }}
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className="account">
                        <Avatar src={urlAvatar} />
                        {user?.name}
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <p>Quan ly tai khoan</p>
        <Divider />
        <p>Dang xuat</p>
        <Divider />
      </Drawer>
    </>
  );
};
export default Header;
