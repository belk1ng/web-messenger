import React, {
  FC,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import AuthAPI from "../api/auth";
import { AuthUser } from "../@types/auth";

interface AuthContextProps {
  children: ReactNode | ReactNode[];
}

interface AuthContextValues {
  user: null | AuthUser;
  isAuth: boolean;
}

const AuthContext = createContext<AuthContextValues>({
  isAuth: false,
  user: null,
});

const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const getUserInfo = async () => {
    const response = await AuthAPI.getUser();

    console.log(response?.data);

    if (response && response.status < 400) {
      setUser(response.data as AuthUser);
      setAuth(true);
    }
  };

  useEffect(() => {
    console.log("Init auth context");
    getUserInfo();
  }, []);

  const value = {
    isAuth,
    setAuth,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
