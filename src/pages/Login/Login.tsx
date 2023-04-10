import React from "react";
import Cloud from "../../components/cloud";
import FormInput from "../../components/form-input";

import styles from "./Login.module.scss";

const LoginPage = () => {
  return (
    <section className={styles.login}>
      <Cloud>
        <form noValidate>
          <FormInput
            name="login"
            label="Login"
            placeholder="Enter the login"
            type="text"
          />

          <FormInput
            name="password"
            label="Password"
            placeholder="Enter the password"
            type="password"
          />
        </form>
      </Cloud>
    </section>
  );
};

export default LoginPage;
