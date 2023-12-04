import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "../NotPermitted";
import AdminStaffPermited from "../NotPermitted/AdminStaffPermited";

const RoleBaseRoute = (props) => {
  const role = useSelector((state) => state.account.user.role.name);
  console.log("role", role);
  return (
    <>
      {role === "ROLE_ADMIN" || "ROLE_STAFF" ? (
        <AdminStaffPermited />
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

const AdminStaffRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      {/* {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to={"/login"} />
      )} */}
      <RoleBaseRoute>{props.children}</RoleBaseRoute>
    </>
    // <>
    //   <RoleBaseRoute>{props.children}</RoleBaseRoute>
    // </>
  );
};
export default AdminStaffRoute;
