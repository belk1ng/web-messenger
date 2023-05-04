import React from "react";
import Button from "../components/button/Button";
import ProfileRow from "../components/profile-row";
import ProfileLayout from "../layouts/profile";
import Avatar from "../components/avatar";
import { ProfileEditValues } from "../@types/auth";
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
} from "../utils/validate/validate";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import styles from "../layouts/profile/ProfileLayout.module.scss";
import classnames from "classnames";
import { APP_ROUTES } from "../routes/routes";
import { APP_TITLE } from "../hooks/useTitle";
import UserAPI from "../api/user";

const ProfileEditPage = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const initState = {
    email: user?.email ?? "",
    login: user?.login ?? "",
    first_name: user?.first_name ?? "",
    second_name: user?.second_name ?? "",
    display_name: user?.display_name ?? "",
    phone: user?.phone ?? "",
  };

  const updateProfileData = async () => {
    const response = await UserAPI.updateProfileData(data);

    if (
      response?.data &&
      response.status === 200 &&
      typeof response.data === "object" &&
      "id" in response.data
    ) {
      setUser(response.data);

      navigate(APP_ROUTES.PROFILE);
    }
  };

  const onSubmit = () => {
    updateProfileData();
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
    <ProfileLayout
      asideHref={APP_ROUTES.PROFILE}
      title={APP_TITLE.PROFILE_EDIT}
    >
      <Avatar readonly={false} source={user?.avatar} />

      <form noValidate onSubmit={handleSubmit}>
        <ProfileRow
          label="Email"
          value={data.email}
          name="email"
          type="email"
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.EMAIL}
          readonly={false}
          autofocus
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

        <section
          className={classnames(
            styles.profile__actions,
            styles["profile__actions--form"]
          )}
        >
          <Button variant="button" text="Save" modifier="primary" />
        </section>
      </form>
    </ProfileLayout>
  );
};

export default ProfileEditPage;
