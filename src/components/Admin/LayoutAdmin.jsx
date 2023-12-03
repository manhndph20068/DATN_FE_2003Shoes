import React, { useState } from "react";
import "./LayoutAdmin.scss";
import {
  AppstoreOutlined,
  AppstoreAddOutlined,
  ExceptionOutlined,
  HeartTwoTone,
  TeamOutlined,
  UserOutlined,
  DollarCircleOutlined,
  ClusterOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  AreaChartOutlined,
  FileDoneOutlined,
  SnippetsOutlined,
  CaretDownOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar, Tooltip } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";
import { faEnvelope, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useSelector((state) => state.account.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const itemsAdmin = [
    {
      label: <Link to="/admin">Thống Kê</Link>,
      key: "dashboard",
      icon: <AreaChartOutlined className="iconMenu" />,
    },
    {
      label: <Link to="/admin/shopping-counter">Bán Hàng</Link>,
      key: "counter",
      icon: <ShoppingCartOutlined className="iconMenu" />,
    },
    {
      label: <span>Quản Lý Tài Khoản</span>,
      key: "user",
      icon: <UserOutlined className="iconMenu" />,
      children: [
        {
          label: <Link to="/admin/admin-table">Admin </Link>,
          key: "admin-table",
          icon: <GrUserAdmin className="iconMenuAccount" />,
        },
        {
          label: <Link to="/admin/staff-table">Nhân Viên </Link>,
          key: "staff-table",
          icon: <TeamOutlined className="iconMenuAccount" />,
        },
        {
          label: <Link to="/admin/customer-table">Khách Hàng </Link>,
          key: "customer-table",
          icon: <BsFillPersonFill className="iconMenuAccount" />,
        },
      ],
    },
    {
      label: <span>Quản Lý Sản Phẩm</span>,
      key: "shoe",
      icon: <AppstoreOutlined className="iconMenu" />,
      children: [
        {
          label: (
            <Tooltip title="Danh sách sản phẩm">
              <Link to="/admin/shoe">Danh sách sản phẩm</Link>
            </Tooltip>
          ),
          key: "shoe",
          icon: <SnippetsOutlined className="iconMenu" />,
        },
        {
          label: (
            <Tooltip title="Tạo mới sản phẩm">
              <Link to="/admin/shoe/create">Tạo mới sản phẩm</Link>
            </Tooltip>
          ),
          key: "Create",
          icon: <AppstoreAddOutlined className="iconMenu" />,
        },
        {
          label: (
            <Tooltip title="Quản lý thuộc tính sản phẩm">
              <Link to="/admin/shoe/properties">
                Quản lý thuộc tính sản phẩm
              </Link>
            </Tooltip>
          ),
          key: "Properties",
          icon: <ClusterOutlined className="iconMenu" />,
        },
      ],
    },
    {
      label: <Link to="/admin/order">Quản Lý Đơn Hàng</Link>,
      key: "order",
      icon: <FileDoneOutlined className="iconMenu" />,
    },
    {
      label: <Link to="/admin/manage-voucher">Quản Lý Voucher</Link>,
      key: "voucher",
      icon: <TagsOutlined className="iconMenu" />,
    },
    // {
    //   label: <Link to="/admin/statistics">Statistics</Link>,
    //   key: "statistics",
    //   icon: <AreaChartOutlined />,
    // },
  ];

  const itemsStaff = [
    {
      label: <Link to="/admin/shopping-counter">Bán Hàng</Link>,
      key: "counter",
      icon: <ShoppingCartOutlined className="iconMenu" />,
    },

    {
      label: <Link to="/admin/order">Quản Lý Đơn Hàng</Link>,
      key: "order",
      icon: <FileDoneOutlined className="iconMenu" />,
    },
  ];

  const itemsDropdown = [
    {
      label: <label style={{ cursor: "pointer" }}>Quản lý tài khoản</label>,
      key: "account",
    },
    {
      label: (
        <Link to={"/"} style={{ cursor: "pointer" }}>
          Trang chủ
        </Link>
      ),
      key: "home",
    },
    {
      label: <label style={{ cursor: "pointer" }}>Đăng xuất</label>,
      key: "logout",
    },
  ];

  const urlAvatar =
    user?.avatar ??
    `${import.meta.env.VITE_BACKEND_URL}/images/avatar/no-avatar.jpg`;

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-admin">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="menuAdmin"
      >
        <div
          style={{
            height: 32,
            margin: 16,
            textAlign: "center",
            marginBottom: "50px",
            marginTop: "10px",
          }}
        >
          <img src="/src/assets/logo.png" alt="" width="70%" height="70px" />
        </div>
        <Menu
          defaultSelectedKeys={[activeMenu]}
          mode="inline"
          items={user?.role?.name === "ROLE_ADMIN" ? itemsAdmin : itemsStaff}
          onClick={(e) => setActiveMenu(e.key)}
        />
      </Sider>
      <Layout>
        <div className="admin-header">
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </span>

          <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  beatFade
                  style={{
                    fontSize: "18px",
                    marginTop: "5px",
                    marginRight: "20px",
                    color: "#55cef7",
                  }}
                />
                <FontAwesomeIcon
                  icon={faBell}
                  shake
                  style={{
                    fontSize: "18px",
                    marginTop: "5px",
                    marginRight: "20px",
                    color: "#363636",
                  }}
                />
                <Avatar src={urlAvatar} />{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {user?.name}
                </span>
                <CaretDownOutlined
                  style={{
                    marginLeft: "10px",
                    color: "black",
                    marginRight: "20px",
                    marginBottom: "5px",
                  }}
                />
              </Space>
            </a>
          </Dropdown>
        </div>
        <Content>
          <Outlet />
        </Content>
        {/* <Footer style={{ padding: 0 }}>footer</Footer> */}
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
