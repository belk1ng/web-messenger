import React, { FC } from "react";
import Cloud from "../../components/cloud";
import styles from "./AuthLayout.module.scss";
import useTitle from "../../hooks/useTitle";
import { AuthLayoutProps } from "./props";

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  documentTitle,
  title,
}) => {
  useTitle(documentTitle);

  return (
    <main className={styles.auth}>
      <Cloud>
        <h1 className={styles.auth__title}>{title}</h1>
        {children}
      </Cloud>
    </main>
  );
};

export default AuthLayout;
