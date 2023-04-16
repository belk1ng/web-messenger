import React, { FC } from "react";
import { FormInputProps } from "./types";

import styles from "./FormInput.module.scss";
import useInput from "../../hooks/useInput";

const FormInput: FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  label,
  validationRule,

  value,
  onChange,
  error,
}) => {
  const { inputValue, inputError, handleFocus, handleBlur, handleChange } =
    useInput({ name, value, error, validationRule, onChange });

  return (
    <div className={styles["input-wrapper"]}>
      <label className={styles.input}>
        <p className={styles.input__label}>{label}</p>
        <input
          className={styles.input__input}
          type={type}
          name={name}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {inputError && <p className={styles.input__error}>{inputError}</p>}
      </label>
    </div>
  );
};

export default FormInput;
