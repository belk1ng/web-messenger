import React from "react";
import Cloud from "../../components/cloud";
import FormInput from "../../components/form-input";
import Button from "../../components/button";
import styles from "./Login.module.scss";
import {
  VALIDATION_FIELD,
  loginMessage,
  loginRegExp,
  passwordMessage,
  passwordRegExp,
} from "../../utils/validate";
import { APP_ROUTES } from "../../routes/routes";
import useTitle, { APP_TITLE } from "../../hooks/useTitle";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../../@types/auth";
import AuthAPI from "../../api/auth";

const LoginPage = () => {
  useTitle(APP_TITLE.LOGIN);

  const navigate = useNavigate();

  const initState = {
    login: "",
    password: "",
  };

  const validations = {
    login: {
      pattern: {
        value: loginRegExp,
        message: loginMessage,
      },
    },
    password: {
      pattern: {
        value: passwordRegExp,
        message: passwordMessage,
      },
    },
  };

  const onSubmit = () => {
    login(data);
  };

  const { data, errors, handleSubmit, handleChange, handleError } =
    useForm<LoginValues>({
      initState,
      onSubmit,
      validations,
    });

  const { getUserInfo } = useAuth();

  const login = async (data: LoginValues) => {
    const response = await AuthAPI.login(data);

    if (response && response.status === 200) {
      await getUserInfo();

      navigate(APP_ROUTES.CHATS);
    } else if (
      response &&
      response.status === 400 &&
      typeof response.data === "object"
    ) {
      const reason = response.data.reason;

      handleError(["login", "password"], reason);
    } else {
      console.log("Error: ", response);
    }
  };

  return (
    <main className={styles.login}>
      <Cloud>
        <h1 className={styles.login__title}>Sign In</h1>
        <form noValidate onSubmit={handleSubmit}>
          <FormInput
            name="login"
            label="Login"
            placeholder="Enter the login"
            type="text"
            validationRule={VALIDATION_FIELD.LOGIN}
            value={data.login}
            onChange={handleChange}
            error={errors.login}
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter the password"
            type="password"
            validationRule={VALIDATION_FIELD.PASSWORD}
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className={styles.login__actions}>
            <Button variant="button" text="Sign In" modificator="primary" />
            <Button
              variant="link"
              text="Create account"
              href={APP_ROUTES.REGISTRATION}
            />
          </div>
        </form>
      </Cloud>
    </main>
  );
};

export default LoginPage;
