import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "../NotPermitted";

const RoleBaseRoute = (props) => {
  const role = useSelector((state) => state.account.user.role.name);
  console.log("role", role);
  return (
    <>
      {role === "ROLE_ADMIN" || "ROLE_STAFF" ? (
        <>{props.children}</>
      ) : (
        <NotPermitted />
      )}
    </>
  );
};

const ProtectedRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};
export default ProtectedRoute;
