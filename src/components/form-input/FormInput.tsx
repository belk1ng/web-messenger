import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { FormInputProps } from "./types";

import styles from "./FormInput.module.scss";

const FormInput: FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  label,
  errorMessage,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof errorMessage === "string" && errorMessage.trim().length > 0) {
      setError(errorMessage);
    } else {
      setError("");
    }
  }, [errorMessage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleFocus = () => {
    setError("");
  };

  const handleBlur = () => {
    const isValid = Math.random() > 0.5;

    if (!isValid) {
      setError("Error message here");
    }
  };

  return (
    <div className={styles["input-wrapper"]}>
      <label className={styles.input}>
        <p className={styles.input__label}>{label}</p>
        <input
          className={styles.input__input}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {error && <p className={styles.input__error}>{error}</p>}
      </label>
    </div>
  );
};

export default FormInput;
