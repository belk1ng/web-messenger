import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { APP_ROUTES } from "./routes";
import Loader from "../components/loader/Loader";

interface AuthGuardProps {
  children: Children;
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { isAuth, isInit } = useAuth();

  if (!isInit) {
    return <Loader />;
  } else if (isAuth) {
    return <>{children}</>;
  } else {
    return <Navigate to={APP_ROUTES.LOGIN} replace={true} />;
  }
};

export default AuthGuard;
