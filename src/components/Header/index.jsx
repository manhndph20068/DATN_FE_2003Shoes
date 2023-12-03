import React, { useState } from "react";
import { GiOpenBook } from "react-icons/gi";
import { BiCart } from "react-icons/bi";
import "./header.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  DownOutlined,
  UserOutlined,
  UserAddOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
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
import { callListShoeDetailAtCounter, callLogout } from "../../services/api";
import { doLogout } from "../../redux/account/accountSlice";
import { clearCart } from "../../redux/order/orderSlice";
import "../../styles/global.scss";
import { useEffect } from "react";
import ManageAccount from "../ManageAccount";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [listShoeDetail, setListShoeDetail] = useState([]);
  const [isModalManageAcconut, setIsModalManageAcconut] = useState(false);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const user = useSelector((state) => state.account.user);
  const cart = useSelector((state) => state.order.cart);
  const role = useSelector((state) => state.account.user.role.name);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (value) => {
    setSearchInput(value);
  };

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
                <img style={{ width: "5rem" }} src={item.detail.thumbnail} />
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

  const handleMangeAccount = () => {
    setIsModalManageAcconut(true);
  };

  const items = [
    {
      label: (
        <label onClick={() => handleMangeAccount()}>Quản lý tài khoản</label>
      ),
      key: "account",
    },
    {
      label: (
        <label
          onClick={() => {
            navigate("/history");
          }}
        >
          Lịch sử mua hàng
        </label>
      ),
      key: "history",
    },
    {
      label: <label onClick={() => Logout()}>Đăng xuất</label>,
      key: "logout",
    },
  ];
  if (user?.role?.name === "ROLE_ADMIN" || user?.role?.name === "ROLE_STAFF") {
    items.unshift({
      label: <Link to="/admin">Trang quản trị</Link>,
      key: "admin",
    });
  }

  // const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/5.jpg`;
  const urlAvatar =
    user?.avatar ??
    `${import.meta.env.VITE_BACKEND_URL}/images/avatar/no-avatar.jpg`;
  const urlLogo = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/logo.png`;

  const fetchListShoeDetailAtCounter = async () => {
    const res = await callListShoeDetailAtCounter();
    console.log("res", res);
    if (res.data.length > 0) {
      const list = res.data.map((item) => {
        return {
          price: item.priceInput,
          thumbnail: item.thumbnail,
          label: item.code,
          value: item.id + "-" + item.nameShoe,
        };
      });

      setListShoeDetail(list);
    } else {
      setListShoeDetail([]);
    }
  };

  useEffect(() => {
    fetchListShoeDetailAtCounter();
  }, []);

  const toNonAccentVietnamese = (str) => {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  };

  const convertSlug = (str) => {
    str = toNonAccentVietnamese(str);
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from =
      "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to =
      "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  };

  const handleChangeShoeDetail = (value) => {
    console.log("value", value);
    let arr = value.split("-");
    const id = arr[0];
    const nameShoe = arr[1];
    console.log("id", id);
    console.log("name", nameShoe);
    const slug = convertSlug(nameShoe);
    navigate(`/shoe/${slug}?id=${id}`);
    form.resetFields(["itemShoeDetailSelect"]);
    setSearchInput("");
  };
  return (
    <>
      <div className="hi">
        <div className="menu">
          <div className="header-container" justify="center" align="middle">
            <div className="page-header">
              <div className="page-header__left">
                <div
                  className="page-header__toggle"
                  onClick={() => setOpenDrawer(true)}
                >
                  ☰
                </div>
                <div
                  className="page-header__logo"
                  style={{ marginTop: "25px" }}
                >
                  <div className="logo">
                    {/* <GiOpenBook className="icon-react" /> manh-store */}
                    <Link to={"/"}>
                      <img
                        src={urlLogo}
                        alt="logo"
                        style={{ height: "4rem" }}
                      />
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
                              onSearch={handleSearch}
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
                              onChange={(value) =>
                                handleChangeShoeDetail(value)
                              }
                            >
                              {searchInput && listShoeDetail
                                ? listShoeDetail.map((item) => {
                                    return (
                                      <Option
                                        value={item.value}
                                        label={item.label}
                                      >
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
                                              style={{
                                                height: "3rem",
                                                width: "3rem",
                                              }}
                                            />{" "}
                                          </span>

                                          <span>{item.label}</span>
                                          <span>
                                            Giá:{" "}
                                            {Intl.NumberFormat("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                            }).format(item.price)}{" "}
                                          </span>
                                        </div>
                                      </Option>
                                    );
                                  })
                                : null}
                            </Select>
                            {/* <Select options={listShoeDetail}>hi</Select> */}
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="page-header__right" style={{ marginTop: "10px" }}>
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
                  {/* Đăng nhập */}
                  <li className="navigation__item mobile">
                    {!isAuthenticated ? (
                      <div>
                        <span onClick={() => navigate("/login")}>
                          <UserOutlined />
                        </span>
                        <span
                          onClick={() => navigate("/login")}
                          className="account"
                        >
                          {" "}
                          Đăng nhập
                        </span>
                      </div>
                    ) : (
                      <Dropdown
                        className="accountLogin"
                        menu={{ items }}
                        trigger={["click"]}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space className="accountLogin">
                            <Avatar src={urlAvatar} />
                            <span
                              style={{ fontWeight: "bold", color: "black" }}
                            >
                              {user?.name}
                            </span>
                            <CaretDownOutlined
                              style={{
                                marginLeft: "10px",
                                marginBottom: "3px",
                                color: "black",
                              }}
                            />
                          </Space>
                        </a>
                      </Dropdown>
                    )}
                  </li>
                  {/* đăng kí */}
                  <li
                    className="navigation__item mobile"
                    style={{ marginLeft: "20px" }}
                  >
                    {!isAuthenticated ? (
                      <div>
                        <span onClick={() => navigate("/login")}>
                          <UserAddOutlined />
                        </span>
                        <span
                          onClick={() => navigate("/register")}
                          className="account"
                        >
                          {" "}
                          Đăng ký
                        </span>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="submenu" justify="center" align="middle">
            <nav className="navbar navbar-expand-lg ">
              <div className="container">
                <Link
                  className="navbar-brand"
                  to="/"
                  style={{ fontSize: "16px" }}
                >
                  Trang chủ
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <div className="navbar-nav">
                    <Link className="nav-link " to="/introduction">
                      Giới Thiệu
                    </Link>
                    <Link className="nav-link" to="/news">
                      Tin Tức
                    </Link>
                    <Link className="nav-link" to="/productions">
                      Sản Phẩm
                    </Link>
                    <Link className="nav-link " to="/contact">
                      Liên Hệ
                    </Link>
                    <Link className="nav-link " to="/vouchers">
                      Vouchers
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
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
      <ManageAccount
        isModalManageAcconut={isModalManageAcconut}
        setIsModalManageAcconut={setIsModalManageAcconut}
      />
    </>
  );
};
export default Header;
