import React, { FC } from "react";
import { AvatarProps } from "./props";
import classnames from "classnames";
import styles from "./Avatar.module.scss";

const Avatar: FC<AvatarProps> = ({ source, readonly }) => {
  return (
    <div
      className={classnames(
        styles.avatar,
        readonly && styles["avatar--readonly"]
      )}
    >
      <img
        className={styles.avatar__image}
        src={source ? source : "https://vk.com/images/camera_200.png"}
        alt="User's avatar"
      />
    </div>
  );
};

export default Avatar;
