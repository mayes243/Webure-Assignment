import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = JSON.parse(localStorage.getItem("token"));

  return auth?.token ? <Outlet /> : <Navigate to="/admin/signin" />;
};

export default PrivateRoutes;
