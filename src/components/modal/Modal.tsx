import React, { FC, MouseEvent } from "react";
import { ModalProps } from "./props";
import styles from "./Modal.module.scss";
import classnames from "classnames";

const Modal: FC<ModalProps> = ({ active, setActive, children }) => {
  const handleModalClose = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      setActive(false);
    }
  };

  return (
    <div
      className={classnames(
        styles.modal,
        active ? styles["modal--active"] : ""
      )}
      onClick={handleModalClose}
    >
      {children}
    </div>
  );
};

export default Modal;
