import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { isAuth, setAuth, user, setUser } = useContext(AuthContext);

  return {
    isAuth,
    setAuth,
    user,
    setUser,
  };
};

export default useAuth;
