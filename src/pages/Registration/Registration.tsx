import React from "react";
import FormInput from "../../components/form-input";
import Button from "../../components/button";
import Cloud from "../../components/cloud";
import styles from "./Registration.module.scss";
import {
  VALIDATION_FIELD,
  emailMessage,
  emailRegExp,
  loginMessage,
  loginRegExp,
  nameMessage,
  nameRegExp,
  passwordMessage,
  passwordRegExp,
  phoneMessage,
  phoneRegExp,
} from "../../utils/validate";
import { APP_ROUTES } from "../../routes/routes";
import useTitle from "../../hooks/useTitle";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { APP_TITLE } from "../../hooks/useTitle";
import { RegistrationValues } from "../../@types/auth";
import AuthAPI from "../../api/auth";

const RegistragionPage = () => {
  useTitle(APP_TITLE.REGISTRATION);

  const navigate = useNavigate();

  const { getUserInfo } = useAuth();

  const initState = {
    email: "",
    login: "",
    first_name: "",
    second_name: "",
    phone: "",
    password: "",
    confirm_password: "",
  };

  const onSubmit = () => {
    register(data);
  };

  const validations = {
    email: {
      pattern: {
        value: emailRegExp,
        message: emailMessage,
      },
    },
    login: {
      pattern: {
        value: loginRegExp,
        message: loginMessage,
      },
    },
    first_name: {
      pattern: {
        value: nameRegExp,
        message: nameMessage,
      },
    },
    second_name: {
      pattern: {
        value: nameRegExp,
        message: nameMessage,
      },
    },
    phone: {
      pattern: {
        value: phoneRegExp,
        message: phoneMessage,
      },
    },
    password: {
      pattern: {
        value: passwordRegExp,
        message: passwordMessage,
      },
    },
    confirm_password: {
      pattern: {
        value: passwordRegExp,
        message: passwordMessage,
      },
      callback: {
        value: (value: string) => data.password === value,
        message: "Password mismatch",
      },
    },
  };

  const { data, errors, handleSubmit, handleChange, handleError } =
    useForm<RegistrationValues>({
      initState,
      onSubmit,
      validations,
    });

  const register = async (values: RegistrationValues) => {
    const response = await AuthAPI.register(values);

    if (response && response.status === 200) {
      await getUserInfo();

      navigate(APP_ROUTES.CHATS);
    } else if (
      response &&
      response.status === 400 &&
      typeof response.data === "object" &&
      !("id" in response.data)
    ) {
      // There are 2 different errors:
      // Login or email already exists

      const reason = response.data.reason;
      const field = reason.split(" ")[0].toLowerCase();

      handleError(field, reason);
    } else {
      console.log("Error: ", response);
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
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormInput
            name="login"
            type="text"
            label="Login"
            placeholder="Enter the login"
            validationRule={VALIDATION_FIELD.LOGIN}
            value={data.login}
            onChange={handleChange}
            error={errors.login}
          />
          <FormInput
            name="first_name"
            type="text"
            label="First name"
            placeholder="Enter the first name"
            validationRule={VALIDATION_FIELD.NAME}
            value={data.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />
          <FormInput
            name="second_name"
            type="text"
            label="Second name"
            placeholder="Enter the second name"
            validationRule={VALIDATION_FIELD.NAME}
            value={data.second_name}
            onChange={handleChange}
            error={errors.second_name}
          />
          <FormInput
            name="phone"
            type="phone"
            label="Phone"
            placeholder="Enter the phone"
            validationRule={VALIDATION_FIELD.PHONE}
            value={data.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            placeholder="Enter the password"
            validationRule={VALIDATION_FIELD.PASSWORD}
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
          <FormInput
            name="confirm_password"
            type="password"
            label="Password again"
            placeholder="Enter the password again"
            validationRule={VALIDATION_FIELD.PASSWORD}
            value={data.confirm_password}
            onChange={handleChange}
            error={errors.confirm_password}
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
