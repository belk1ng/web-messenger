import React, { FC } from "react";
import { ProfileRowProps } from "./props";
import styles from "./ProfileRow.module.scss";

const ProfileRow: FC<ProfileRowProps> = ({ label, value }) => {
  return (
    <div className={styles.row}>
      <p className={styles.row__label}>{label}</p>
      <p className={styles.row__value}>{value ?? ""}</p>
    </div>
  );
};

export default ProfileRow;
