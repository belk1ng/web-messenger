import { lazy } from "react";

export const LoginPage = lazy(() => import("../pages/Login/Login"));
export const RegistrationPage = lazy(
  () => import("../pages/Registration/Registration")
);
export const ProfilePage = lazy(() => import("../pages/Profile"));
export const ProfileEditPage = lazy(() => import("../pages/ProfileEdit"));
export const ProfileChangePasswordPage = lazy(
  () => import("../pages/ProfileChangePassword")
);
export const ChatsPage = lazy(() => import("../pages/Chats"));
export const NotFoundPage = lazy(() => import("../pages/404"));
export const UnauthorizedPage = lazy(() => import("../pages/401"));
