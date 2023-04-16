import React, { FC } from "react";
import { ErrorLayoutProps } from "./props";
import styles from "./ErrorLayout.module.scss";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const ErrorLayout: FC<ErrorLayoutProps> = ({
  errorMessage,
  errorDescription,
  title,
}) => {
  useTitle(title);

  const navigate = useNavigate();

  const handleGoBack = () => {
    // TODO: for each error page render certain link
    navigate(-1);
  };

  return (
    <main className={styles.error}>
      <h1 className={styles.error__message}>{errorMessage}</h1>
      <h2 className={styles.error__description}>{errorDescription}</h2>

      <Button
        variant="button"
        text="Go back"
        onClick={handleGoBack}
        modificator="primary"
      />
    </main>
  );
};

export default ErrorLayout;
