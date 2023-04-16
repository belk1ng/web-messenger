import React from "react";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthAPI from "../../api/auth";
import { APP_ROUTES } from "../../routes/routes";

const Actions = () => {
  const { setAuth, setUser } = useAuth();

  const navigate = useNavigate();

  const logout = async () => {
    const response = await AuthAPI.logout();

    if (response && response.status === 200) {
      setAuth(false);
      setUser(null);

      navigate(APP_ROUTES.LOGIN);
    } else {
      console.log(response?.data);
    }
  };

  return (
    <>
      <Button
        text="Change personal data"
        variant="link"
        href={APP_ROUTES.PROFILE_EDIT}
      />
      <Button
        text="Change password"
        variant="link"
        href={APP_ROUTES.PROFILE_EDIT_PASSWORD}
      />
      <Button
        text="Sign out"
        variant="link"
        modificator="error"
        onClick={logout}
        href={APP_ROUTES.LOGIN}
      />
    </>
  );
};

export default Actions;
