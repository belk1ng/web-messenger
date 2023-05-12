import React, { FC, useContext } from "react";
import { ModalType, ModalsContext } from "../../contexts/ModalsContext";
import { AvatarProps } from "./props";
import classnames from "classnames";
import styles from "./Avatar.module.scss";
import ChangeUserAvatarModal from "../modals/ChangeUserAvatarModal";

const Avatar: FC<AvatarProps> = ({ source, readonly }) => {
  const { handleOpenModal } = useContext(ModalsContext);

  const handleModalOpen = () => {
    if (!readonly) {
      handleOpenModal(ModalType.CHANGE_USER_AVATAR);
    }
  };

  const fullSource = `https://ya-praktikum.tech/api/v2/resources${source}`;

  return (
    <>
      <div
        className={classnames(
          styles.avatar,
          readonly && styles["avatar--readonly"]
        )}
        onClick={handleModalOpen}
      >
        <img
          className={styles.avatar__image}
          src={source ? fullSource : "https://vk.com/images/camera_200.png"}
          alt="User's avatar"
        />
      </div>

      <ChangeUserAvatarModal />
    </>
  );
};

export default Avatar;
