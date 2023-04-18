import React from "react";
import Avatar from "../components/avatar/Avatar";
import ProfileRow from "../components/profile-row/ProfileRow";
import Button from "../components/button";
import ProfileLayout from "../layouts/profile";
import styles from "../layouts/profile/ProfileLayout.module.scss";
import classnames from "classnames";
import useForm from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../routes/routes";
import { APP_TITLE } from "../hooks/useTitle";
import UserAPI from "../api/user";
import {
  passwordRegExp,
  passwordMessage,
  VALIDATION_FIELD,
} from "../utils/validate";

const ProfileChangePasswordPage = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const initState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validations = {
    oldPassword: {
      pattern: {
        value: passwordRegExp,
        message: passwordMessage,
      },
    },
    newPassword: {
      pattern: {
        value: passwordRegExp,
        message: passwordMessage,
      },
    },
    confirmPassword: {
      pattern: {
        value: passwordRegExp,
        message: passwordMessage,
      },
      callback: {
        value: (value: string) => data.newPassword === value,
        message: "Password mismatch",
      },
    },
  };

  const updateProfilePassword = async () => {
    const response = await UserAPI.updateProfilePassword(data);

    if (response && response.status === 200) {
      navigate(APP_ROUTES.PROFILE);
    } else if (
      response &&
      response.status >= 400 &&
      typeof response.data === "object" &&
      "reason" in response.data
    ) {
      // Reason: old password is incorrect
      const reason = response.data.reason;

      handleError("oldPassword", reason);
    } else {
      console.log("Error: ", response);
    }
  };

  const onSubmit = () => {
    updateProfilePassword();
  };

  const { data, errors, handleChange, handleSubmit, handleError } = useForm({
    initState,
    onSubmit,
    validations,
  });

  return (
    <ProfileLayout
      asideHref={APP_ROUTES.PROFILE}
      title={APP_TITLE.PROFILE_EDIT_PASSWORD}
    >
      <Avatar readonly={true} source={user?.avatar} />

      <form noValidate onSubmit={handleSubmit}>
        <ProfileRow
          readonly={false}
          value={data.oldPassword}
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.PASSWORD}
          error={errors?.oldPassword}
          name="oldPassword"
          label="Old password"
          type="password"
        />
        <ProfileRow
          readonly={false}
          value={data.newPassword}
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.PASSWORD}
          error={errors?.newPassword}
          name="newPassword"
          label="New password"
          type="password"
        />
        <ProfileRow
          readonly={false}
          value={data.confirmPassword}
          onChange={handleChange}
          validationRule={VALIDATION_FIELD.PASSWORD}
          error={errors?.confirmPassword}
          name="confirmPassword"
          label="Confirm password"
          type="password"
        />

        <section
          className={classnames(
            styles.profile__actions,
            styles["profile__actions--form"]
          )}
        >
          <Button text="Save" variant="button" modificator="primary" />
        </section>
      </form>
    </ProfileLayout>
  );
};

export default ProfileChangePasswordPage;
