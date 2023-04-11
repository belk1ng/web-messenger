import React from "react";
import ProfileAside from "../../components/profile-aside";
import Avatar from "../../components/avatar";
import ProfileRow from "../../components/profile-row";
import Button from "../../components/button";
import { APP_ROUTES } from "../../routes/routes";
import useTitle, { APP_TITLE } from "../../hooks/useTitle";
import styles from "./Profile.module.scss";

const ProfilePage = () => {
  useTitle(APP_TITLE.PROFILE);

  return (
    <main className={styles.profile}>
      <ProfileAside href={APP_ROUTES.CHATS} />
      <section className={styles.profile__content}>
        <Avatar
          readonly={true}
          source="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        />

        <ProfileRow label="Email" value="pochta@mail.ru" />
        <ProfileRow label="Login" value="belk1ng" />
        <ProfileRow label="First name" value="Dmitry" />
        <ProfileRow label="Second name" value="Belkin" />
        <ProfileRow label="Display name" value="belk1ng" />
        <ProfileRow label="Phone" value="88005553535" />

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
            href={APP_ROUTES.LOGIN}
          />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
