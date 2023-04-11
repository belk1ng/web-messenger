import React, { SyntheticEvent } from "react";
import FormInput from "../../components/form-input";
import Button from "../../components/button";
import Cloud from "../../components/cloud";
import styles from "./Registration.module.scss";
import { VALIDATION_FIELD } from "../../utils/validate";
import { APP_ROUTES } from "../../routes/routes";
import useTitle from "../../hooks/useTitle";
import { APP_TITLE } from "../../hooks/useTitle";

const RegistragionPage = () => {
  useTitle(APP_TITLE.REGISTRATION);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    for (const [name, value] of formData) {
      console.log(name, ": ", value);
    }
  };

  return (
    <main className={styles.registration}>
      <Cloud>
        <h1 className={styles.registration__title}>Create account</h1>
        <form noValidate onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            label="Email"
            placeholder="Enter the email"
            validationRule={VALIDATION_FIELD.EMAIL}
          />
          <FormInput
            name="login"
            type="text"
            label="Login"
            placeholder="Enter the login"
            validationRule={VALIDATION_FIELD.LOGIN}
          />
          <FormInput
            name="first_name"
            type="text"
            label="First name"
            placeholder="Enter the first name"
            validationRule={VALIDATION_FIELD.NAME}
          />
          <FormInput
            name="second_name"
            type="text"
            label="Second name"
            placeholder="Enter the second name"
            validationRule={VALIDATION_FIELD.NAME}
          />
          <FormInput
            name="phone"
            type="phone"
            label="Phone"
            placeholder="Enter the phone"
            validationRule={VALIDATION_FIELD.PHONE}
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            placeholder="Enter the password"
            validationRule={VALIDATION_FIELD.PASSWORD}
          />
          <FormInput
            name="password_confirm"
            type="password"
            label="Password again"
            placeholder="Enter the password again"
            validationRule={VALIDATION_FIELD.PASSWORD}
          />

          <div className={styles.registration__actions}>
            <Button
              variant="button"
              text="Create account"
              modificator="primary"
            />
            <Button variant="link" text="Sign In" href={APP_ROUTES.LOGIN} />
          </div>
        </form>
      </Cloud>
    </main>
  );
};

export default RegistragionPage;
