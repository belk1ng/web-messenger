import React from "react";
import { useRoutes } from "react-router-dom";

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
      element: <LoginPage />,
    },
    {
      path: APP_ROUTES.REGISTRATION,
      element: <RegistrationPage />,
    },
    {
      path: APP_ROUTES.CHATS,
      element: <ChatsPage />,
    },
    {
      path: APP_ROUTES.PROFILE,
      children: [
        {
          path: APP_ROUTES.PROFILE_ROOT,
          element: <ProfilePage />,
        },
        {
          path: APP_ROUTES.PROFILE_EDIT,
          element: <ProfileEditPage />,
        },
        {
          path: APP_ROUTES.PROFILE_EDIT_PASSWORD,
          element: <ProfileChangePasswordPage />,
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
