import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { isAuth, setAuth, user, setUser, getUserInfo, isInit } =
    useContext(AuthContext);

  return {
    isInit,
    isAuth,
    setAuth,
    user,
    setUser,
    getUserInfo,
  };
};

export default useAuth;
