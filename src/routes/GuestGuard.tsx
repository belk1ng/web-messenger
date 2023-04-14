import React, { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/loader/Loader";
import { Navigate } from "react-router-dom";
import { APP_ROUTES } from "./routes";

interface GuestGuardProps {
  children: ReactNode | ReactNode[];
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuth, isInit } = useAuth();

  if (!isInit) {
    return <Loader />;
  } else if (!isAuth) {
    return <>{children}</>;
  } else {
    return <Navigate to={APP_ROUTES.CHATS} replace={true} />;
  }
};

export default GuestGuard;
