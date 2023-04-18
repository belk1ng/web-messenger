import React, { FC, useState } from "react";
import { AvatarProps } from "./props";
import classnames from "classnames";
import styles from "./Avatar.module.scss";
import Modal from "../modal/Modal";

const Avatar: FC<AvatarProps> = ({ source, readonly }) => {
  const [modalActive, setModalActive] = useState(false);

  const handleModalOpen = () => {
    if (!readonly) {
      setModalActive(true);
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

      <Modal active={modalActive} setActive={setModalActive}>
        <div>Feature in work :3</div>
      </Modal>
    </>
  );
};

export default Avatar;
