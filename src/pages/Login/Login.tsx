import React, { SyntheticEvent } from "react";
import Cloud from "../../components/cloud";
import FormInput from "../../components/form-input";
import Button from "../../components/button";

import styles from "./Login.module.scss";
import { VALIDATION_FIELD } from "../../utils/validate";
import { APP_ROUTES } from "../../routes/routes";

const LoginPage = () => {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    for (const [name, value] of formData) {
      console.log(name, ": ", value);
    }
  };

  return (
    <section className={styles.login}>
      <Cloud>
        <h1 className={styles.login__title}>Sign In</h1>
        <form noValidate onSubmit={handleSubmit}>
          <FormInput
            name="login"
            label="Login"
            placeholder="Enter the login"
            type="text"
            validationRule={VALIDATION_FIELD.LOGIN}
          />

          <FormInput
            name="password"
            label="Password"
            placeholder="Enter the password"
            type="password"
            validationRule={VALIDATION_FIELD.PASSWORD}
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
    </section>
  );
};

export default LoginPage;
