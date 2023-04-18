import React from "react";
import Button from "../../components/button/Button";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { ProfileEditValues } from "../../@types/auth";
import {
  VALIDATION_FIELD,
  emailRegExp,
  emailMessage,
  loginMessage,
  loginRegExp,
  nameRegExp,
  nameMessage,
  phoneRegExp,
  phoneMessage,
} from "../../utils/validate";
import ProfileRow from "../../components/profile-row/ProfileRow";

const ProfileEditPage = () => {
  const { user } = useAuth();

  const initState = {
    email: user?.email ?? "",
    login: user?.login ?? "",
    first_name: user?.first_name ?? "",
    second_name: user?.second_name ?? "",
    display_name: user?.display_name ?? "",
    phone: user?.phone ?? "",
  };

  const onSubmit = () => {
    console.log("SUBMIT PROFILE CALLED");
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
    display_name: {
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
  };

  const { data, handleChange, handleSubmit } = useForm<ProfileEditValues>({
    initState,
    onSubmit,
    validations,
  });

  return (
    <main>
      <form noValidate onSubmit={handleSubmit}>
        <ProfileRow
          label="Email"
          value={data.email}
          name="email"
          type="email"
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.EMAIL}
          readonly={false}
        />
        <ProfileRow
          label="Login"
          value={data.login}
          name="login"
          type="text"
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.LOGIN}
          readonly={false}
        />
        <ProfileRow
          label="First name"
          value={data.first_name}
          name="first_name"
          type="text"
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.NAME}
          readonly={false}
        />
        <ProfileRow
          label="Second name"
          value={data.second_name}
          name="second_name"
          type="text"
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.NAME}
          readonly={false}
        />
        <ProfileRow
          label="Display name"
          value={data.display_name}
          name="display_name"
          type="text"
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.NAME}
          readonly={false}
        />
        <ProfileRow
          label="Phone"
          value={data.phone}
          name="phone"
          type="phone"
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.PHONE}
          readonly={false}
        />

        <Button variant="button" text="Save" modificator="primary" />
      </form>
    </main>
  );
};

export default ProfileEditPage;
