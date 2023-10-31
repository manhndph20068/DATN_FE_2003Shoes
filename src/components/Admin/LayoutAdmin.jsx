import React, { useState } from "react";
import "./LayoutAdmin.scss";
import {
  AppstoreOutlined,
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
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { Content, Footer, Sider } = Layout;

const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <AppstoreOutlined />,
  },
  {
    label: <Link to="/admin/shopping-counter">Sale in counter</Link>,
    key: "counter",
    icon: <ShoppingCartOutlined />,
  },
  {
    label: <span>Manage Users</span>,
    key: "user",
    icon: <UserOutlined />,
    children: [
      {
        label: <Link to="/admin/user">CRUD</Link>,
        key: "crud",
        icon: <TeamOutlined />,
      },
      {
        label: "Files1",
        key: "file1",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/shoe">Manage Shoes</Link>,
    key: "shoe",
    icon: <ExceptionOutlined />,
    children: [
      {
        label: <Link to="/admin/shoe/create">Create</Link>,
        key: "Create",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    label: <Link to="/admin/order">Manage Orders</Link>,
    key: "order",
    icon: <DollarCircleOutlined />,
  },
  {
    label: <Link to="/admin/manage-voucher">Manage Voucher</Link>,
    key: "voucher",
    icon: <TagsOutlined />,
  },
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
        <div style={{ height: 32, margin: 16, textAlign: "center" }}>Admin</div>
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
