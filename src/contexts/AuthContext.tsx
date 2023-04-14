import React, { FC, createContext, useState, useLayoutEffect } from "react";
import AuthAPI from "../api/auth";
import { AuthUser } from "../@types/auth";

interface AuthContextProps {
  children: Children;
}

interface AuthContextValues {
  isInit: boolean;

  user: null | AuthUser;
  setUser: (user: null | AuthUser) => void;

  isAuth: boolean;
  setAuth: (value: boolean) => void;

  getUserInfo: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const [user, setUser] = useState<AuthUser | null>(null);

  const [isInit, setInit] = useState(false);

  const getUserInfo = async () => {
    const response = await AuthAPI.getUser();

    if (response && response.status === 200) {
      setUser(response.data as AuthUser);
      setAuth(true);
    }
  };

  const _init = async () => {
    await getUserInfo();
    setInit(true);
  };

  useLayoutEffect(() => {
    _init();
  }, []);

  const value = {
    isInit,
    isAuth,
    setAuth,
    user,
    setUser,
    getUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
