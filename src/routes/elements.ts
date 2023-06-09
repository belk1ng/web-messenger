import { lazy } from "react";

export const LoginPage = lazy(() => import("../pages/Login"));
export const RegistrationPage = lazy(() => import("../pages/Registration"));
export const ProfilePage = lazy(() => import("../pages/Profile"));
export const ProfileEditPage = lazy(() => import("../pages/ProfileEdit"));
export const ProfileChangePasswordPage = lazy(
  () => import("../pages/ProfileChangePassword")
);
export const ChatsPage = lazy(() => import("../pages/Chats/ChatsContent"));
export const NotFoundPage = lazy(() => import("../pages/404"));
