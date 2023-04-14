import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { isAuth, setAuth, user, setUser, getUserInfo } =
    useContext(AuthContext);

  return {
    isAuth,
    setAuth,
    user,
    setUser,
    getUserInfo,
  };
};

export default useAuth;
