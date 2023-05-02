import React from "react";
import ProfileLayout from "../layouts/profile";
import styles from "../layouts/profile/ProfileLayout.module.scss";
import Avatar from "../components/avatar";
import ProfileRow from "../components/profile-row";
import Button from "../components/button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../api/auth";
import { APP_TITLE } from "../hooks/useTitle";
import { APP_ROUTES } from "../routes/routes";

const ProfilePage = () => {
  const { user, setAuth, setUser } = useAuth();

  const navigate = useNavigate();

  const logout = async () => {
    const response = await AuthAPI.logout();

    if (response && response.status === 200) {
      setAuth(false);
      setUser(null);

      navigate(APP_ROUTES.LOGIN);
    } else {
      console.log(response?.data);
    }
  };

  return (
    <ProfileLayout title={APP_TITLE.PROFILE} asideHref={APP_ROUTES.CHATS}>
      <Avatar readonly={true} source={user?.avatar ?? ""} />

      <ProfileRow
        label="Email"
        value={user?.email ?? ""}
        name="email"
        type="email"
        readonly={true}
      />
      <ProfileRow
        label="Login"
        value={user?.login ?? ""}
        name="login"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="First name"
        value={user?.first_name ?? ""}
        name="first_name"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="Second name"
        value={user?.second_name ?? ""}
        name="second_name"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="Display name"
        value={user?.display_name ?? ""}
        name="display_name"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="Phone"
        value={user?.phone ?? ""}
        name="phone"
        type="phone"
        readonly={true}
      />

      <section className={styles.profile__actions}>
        <Button
          text="Change personal data"
          variant="link"
          href={APP_ROUTES.PROFILE_EDIT}
        />
        <Button
          text="Change password"
          variant="link"
          href={APP_ROUTES.PROFILE_EDIT_PASSWORD}
        />
        <Button
          text="Sign out"
          variant="link"
          modifier="error"
          onClick={logout}
          href={APP_ROUTES.LOGIN}
        />
      </section>
    </ProfileLayout>
  );
};

export default ProfilePage;
