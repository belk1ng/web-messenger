import React from "react";
import Cloud from "../../components/cloud";
import FormInput from "../../components/form-input";

import styles from "./Login.module.scss";
import { VALIDATION_FIELD } from "../../utils/validate";

const LoginPage = () => {
  return (
    <section className={styles.login}>
      <Cloud>
        <h1 className={styles.login__title}>Sign In</h1>
        <form noValidate>
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
        </form>
      </Cloud>
    </section>
  );
};

export default LoginPage;
