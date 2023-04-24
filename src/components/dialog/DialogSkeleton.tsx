import React from "react";
import classnames from "classnames";
import styles from "./Dialog.module.scss";

const DialogSkeleton = () => {
  return (
    <div className={styles.skeleton__wrapper}>
      <div className={classnames(styles.skeleton, styles.skeleton__circle)} />
      <div className={styles.skeleton__mock}>
        <div className={classnames(styles.skeleton, styles.skeleton__line)} />
        <div className={classnames(styles.skeleton, styles.skeleton__line)} />
      </div>
    </div>
  );
};

export default DialogSkeleton;
