import React from "react";
import { useRoutes } from "react-router-dom";

import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";

import ChatContextProvider from "../contexts/ChatContext";

import {
  LoginPage,
  RegistrationPage,
  ChatsPage,
  ProfilePage,
  ProfileEditPage,
  ProfileChangePasswordPage,
  NotFoundPage,
} from "./elements";

import { APP_ROUTES } from "./routes";

const Router = () => {
  return useRoutes([
    {
      path: APP_ROUTES.LOGIN,
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: APP_ROUTES.REGISTRATION,
      element: (
        <GuestGuard>
          <RegistrationPage />
        </GuestGuard>
      ),
    },
    {
      path: APP_ROUTES.CHATS,
      element: (
        <AuthGuard>
          <ChatContextProvider>
            <ChatsPage />
          </ChatContextProvider>
        </AuthGuard>
      ),
    },
    {
      path: APP_ROUTES.PROFILE,
      children: [
        {
          path: APP_ROUTES.PROFILE_ROOT,
          element: (
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          ),
        },
        {
          path: APP_ROUTES.PROFILE_EDIT,
          element: (
            <AuthGuard>
              <ProfileEditPage />
            </AuthGuard>
          ),
        },
        {
          path: APP_ROUTES.PROFILE_EDIT_PASSWORD,
          element: (
            <AuthGuard>
              <ProfileChangePasswordPage />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: APP_ROUTES.NOT_FOUND,
      element: <NotFoundPage />,
    },
  ]);
};

export default Router;
