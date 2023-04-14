import React from "react";
import ProfileAside from "../../components/profile-aside";
import Avatar from "../../components/avatar";
import ProfileRow from "../../components/profile-row";
import Button from "../../components/button";
import { APP_ROUTES } from "../../routes/routes";
import useTitle, { APP_TITLE } from "../../hooks/useTitle";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../../api/auth";
import styles from "./Profile.module.scss";

const ProfilePage = () => {
  useTitle(APP_TITLE.PROFILE);

  const { setAuth, setUser, user } = useAuth();

  const navigate = useNavigate();

  const logout = async () => {
    const response = await AuthAPI.logout();

    if (response && response.status === 200) {
      setAuth(false);
      setUser(null);

      navigate(APP_ROUTES.LOGIN);
    }
  };

  return (
    <main className={styles.profile}>
      <ProfileAside href={APP_ROUTES.CHATS} />
      <section className={styles.profile__content}>
        <Avatar readonly={true} source={user?.avatar} />

        <ProfileRow label="Email" value={user?.email} />
        <ProfileRow label="Login" value={user?.login} />
        <ProfileRow label="First name" value={user?.first_name} />
        <ProfileRow label="Second name" value={user?.second_name} />
        <ProfileRow label="Display name" value={user?.display_name} />
        <ProfileRow label="Phone" value={user?.phone} />

        <div className={styles.profile__actions}>
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
            modificator="error"
            onClick={logout}
            href={APP_ROUTES.LOGIN}
          />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
