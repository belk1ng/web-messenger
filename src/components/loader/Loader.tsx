import React, { FC } from "react";
import { LoaderProps } from "./props";
import styles from "./Loader.module.scss";

const Loader: FC<LoaderProps> = ({ fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className={styles.loader}>
        <div className={styles.loader__circle} />
      </div>
    );
  }

  return <div className={styles.loader__circle} />;
};

export default Loader;
