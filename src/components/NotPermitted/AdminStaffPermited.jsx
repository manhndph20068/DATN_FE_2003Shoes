import { Button, Result } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AdminStaffPermited = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.account.user.role.name);
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (!hasNavigated && role !== "ROLE_ADMIN" && role !== "ROLE_STAFF") {
      navigate("/");
      setHasNavigated(true);
    }
  }, [role, navigate, hasNavigated]);

  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you`re not authorzired to access this page"
      extra={
        role === "ROLE_ADMIN" ? (
          <Button type="primary" onClick={() => navigate("/admin")}>
            Trở về trang admin
          </Button>
        ) : role === "ROLE_STAFF" ? (
          <Button
            type="primary"
            onClick={() => navigate("/admin/shopping-counter")}
          >
            Trở về trang bán hàng
          </Button>
        ) : null
      }
    />
  );
};
export default AdminStaffPermited;
