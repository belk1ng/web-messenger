import React, { FC } from "react";
import ProfileAside from "../../components/profile-aside";
import { ProfileLayoutProps } from "./types";
import useTitle from "../../hooks/useTitle";
import styles from "./ProfileLayout.module.scss";

const ProfileLayout: FC<ProfileLayoutProps> = ({
  title,
  asideHref,
  children,
}) => {
  useTitle(title);

  return (
    <main className={styles.profile}>
      <ProfileAside href={asideHref} />
      <section className={styles.profile__content}>{children}</section>
    </main>
  );
};

export default ProfileLayout;
