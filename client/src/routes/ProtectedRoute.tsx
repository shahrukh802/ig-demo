import { Suspense, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { isAuthenticated } from "../services/AuthService";
import { Loader } from "../components/ui/Loader";

const RequireAuth = () => {
  const isAuth = isAuthenticated();
  let location = useLocation();

  if (!isAuth) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }

  return (
    <>
      <DashboardLayout>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    </>
  );
};
export default RequireAuth;
