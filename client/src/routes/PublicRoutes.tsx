import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/AuthService";

const PublicRoutes = () => {
  const isAuth = isAuthenticated();
  const location = useLocation();
  if (isAuth) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
export default PublicRoutes;
