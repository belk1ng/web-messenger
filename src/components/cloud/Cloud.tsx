import React, { FC } from "react";
import { CloudProps } from "./props";
import styles from "./Cloud.module.scss";

const Cloud: FC<CloudProps> = ({ children }) => {
  return <div className={styles.cloud}>{children}</div>;
};

export default Cloud;
