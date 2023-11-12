import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/Counter.module.css";
import LoginPage from "./pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactPage from "./pages/contact";
import ShoePage from "./pages/shoe";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import {
  callFetchAccount,
  callGetCartByAccountId,
  callGetListCartDetailById,
  callRefreshToken,
} from "./services/api";
import { doAddIdCart, doLogin } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import UserTable from "./components/Admin/User/UserTable";
import "./styles/reset.scss";
import ShoeDetailTable from "./components/Admin/Shoe/ShoeDetailTable";
import CreateShoeDetail from "./components/Admin/Shoe/CreateShoeDetail";
import OrderPage from "./pages/order";
import { doInitalCartWithAccount } from "./redux/order/orderSlice";
import ShoppingCounter from "./components/Admin/Shopping/ShoppingCounter";
import ManageOrder from "./components/Admin/Order/ManageOrder";
import ManageVoucher from "./components/Admin/Voucher/ManageVoucher";
import OrderDetail from "./components/Admin/Order/OrderDetail";
import SuccessOrder from "./pages/resultOrder/SuccessOrder";
import StatisticalChart from "./components/Admin/Statistical/StatisticalChart";
import AdminTable from "./components/Admin/User/AdminTable";
import StaffTable from "./components/Admin/User/StaffTable";
import CustomerTable from "./components/Admin/User/CustomerTable";

const Layout = () => {
  return (
    <div className="Layout-app">
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

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
      handleGetListCartDetailById(res?.data?.id);
      dispatch(doAddIdCart(res?.data?.id));
    }
  };

  const fetchAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    ) {
      return;
    }
    const res = await callFetchAccount();
    if (res?.id) {
      dispatch(doLogin(res));
      handleGetCartByAccountId(res.id);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Home /> },
        {
          path: "order",
          element: <OrderPage />,
        },

        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "shoe/:slug",
          element: <ShoePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "order-success",
      element: <SuccessOrder />,
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <UserTable />,
        },
        {
          path: "admin-table",
          element: <AdminTable />,
        },
        {
          path: "customer-table",
          element: <CustomerTable />,
        },
        {
          path: "staff-table",
          element: <StaffTable />,
        },
        {
          path: "shoe",
          element: <ShoeDetailTable />,
        },
        {
          path: "shoe/create",
          element: <CreateShoeDetail />,
        },
        {
          path: "shopping-counter",
          element: <ShoppingCounter />,
        },
        {
          path: "order",
          element: <ManageOrder />,
        },
        {
          path: "order/detail/",
          element: <OrderDetail />,
        },
        {
          path: "manage-voucher",
          element: <ManageVoucher />,
        },
        {
          path: "statistics",
          element: <StatisticalChart />,
        },
      ],
    },
  ]);

  return (
    <>
      {isLoading == false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/order" ||
      window.location.pathname === "/order-success" ||
      location.pathname.startsWith("/shoe/") ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
