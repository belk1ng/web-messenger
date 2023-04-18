import React, { FC, createContext, useState, useEffect } from "react";
import AuthAPI from "../api/auth";
import { AuthUser, AuthContextUser } from "../@types/auth";

interface AuthContextProps {
  children: Children;
}

interface AuthContextValues {
  isInit: boolean;

  user: null | AuthUser;
  setUser: (user: AuthContextUser) => void;

  isAuth: boolean;
  setAuth: (value: boolean) => void;

  getUserInfo: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);

  const [user, setUser] = useState<AuthContextUser>(null);

  const [isInit, setInit] = useState(false);

  const getUserInfo = async () => {
    const response = await AuthAPI.getUser();

    if (response && response.status === 200) {
      setUser(response.data as AuthContextUser);
      setAuth(true);
    }
  };

  const _init = async () => {
    await getUserInfo();
    setInit(true);
  };

  useEffect(() => {
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
