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
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  AreaChartOutlined,
  FileDoneOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar, Tooltip } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import { BsFillPersonFill } from "react-icons/bs";

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Thống Kê</Link>,
    key: "dashboard",
    icon: <AreaChartOutlined />,
  },
  {
    label: <Link to="/admin/shopping-counter">Bán Hàng</Link>,
    key: "counter",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: <span>Quản Lý Tài Khoản</span>,
    key: "user",
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/admin-table">Admin </Link>,
        key: "admin-table",
        icon: <GrUserAdmin />,
      },
      {
        label: <Link to="/admin/staff-table">Nhân Viên </Link>,
        key: "staff-table",
        icon: <TeamOutlined />,
      },
      {
        label: <Link to="/admin/customer-table">Khách Hàng </Link>,
        key: "customer-table",
        icon: <BsFillPersonFill />,
      },
    ],
  },
  // {
  //   label: <Link to="/admin/shoe">Quản Lý Sản Phẩm</Link>,
  //   key: "shoe",
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     {
  //       label: <Link to="/admin/shoe/create">Tạo sản phẩm mới</Link>,
  //       key: "Create",
  //       icon: <AppstoreAddOutlined />,
  //     },
  //   ],
  // },
  {
    label: <span>Quản Lý Sản Phẩm</span>,
    key: "shoe",
    icon: <AppstoreOutlined />,
    children: [
      {
        label: (
          <Tooltip title="Danh sách sản phẩm">
            <Link to="/admin/shoe">Danh sách sản phẩm</Link>
          </Tooltip>
        ),
        key: "shoe",
        icon: <SnippetsOutlined />,
      },
      {
        label: (
          <Tooltip title="Tạo mới sản phẩm">
            <Link to="/admin/shoe/create">Tạo mới sản phẩm</Link>
          </Tooltip>
        ),
        key: "Create",
        icon: <AppstoreAddOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/order">Quản Lý Đơn Hàng</Link>,
    key: "order",
    icon: <FileDoneOutlined />,
  },
  {
    label: <Link to="/admin/manage-voucher">Quản Lý Voucher</Link>,
    key: "voucher",
    icon: <TagsOutlined />,
  },
  // {
  //   label: <Link to="/admin/statistics">Statistics</Link>,
  //   key: "statistics",
  //   icon: <AreaChartOutlined />,
  // },
];

const LayoutAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useSelector((state) => state.account.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/5.jpg`;

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-admin">
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <img src="/src/assets/logo.jpg" alt="" width="60%" height="50px" />
        </div>
        <Menu
          defaultSelectedKeys={[activeMenu]}
          mode="inline"
          items={items}
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
                <Avatar src={urlAvatar} /> {user?.name}
                <DownOutlined />
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
