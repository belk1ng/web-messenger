import React, { SyntheticEvent } from "react";
import Cloud from "../../components/cloud";
import FormInput from "../../components/form-input";
import Button from "../../components/button";
import styles from "./Login.module.scss";
import { VALIDATION_FIELD } from "../../utils/validate";
import { APP_ROUTES } from "../../routes/routes";
import useTitle, { APP_TITLE } from "../../hooks/useTitle";
import useForm from "../../hooks/useForm";

import { validate } from "../../utils/validate";

const LoginPage = () => {
  useTitle(APP_TITLE.LOGIN);

  const initState = {
    login: {
      value: "",
      errorMessage: "",
    },
    password: {
      value: "",
      errorMessage: "",
    },
  };

  const { state, handleChange, handleError } = useForm(initState);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    let formValid = true;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    for (const [name, value] of formData) {
      const { isValid, message } = validate(
        value as string,
        name as VALIDATION_FIELD
      );

      if (!isValid) {
        formValid = false;
        handleError(name, message);
      }
    }

    if (formValid) {
      console.log("Form valid");
    } else {
      console.log("Form not valid");
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
            value={state.login.value}
            errorMessage={state.login.errorMessage}
            onChange={handleChange}
          />
          <FormInput
            name="password"
            label="Password"
            placeholder="Enter the password"
            type="password"
            validationRule={VALIDATION_FIELD.PASSWORD}
            value={state.password.value}
            errorMessage={state.password.errorMessage}
            onChange={handleChange}
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
