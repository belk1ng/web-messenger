import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { FormInputProps } from "./types";
import { validate } from "../../utils/validate";

import styles from "./FormInput.module.scss";

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
  const [_value, setValue] = useState(value || "");

  const [_error, setError] = useState("");

  useEffect(() => {
    setValue(value ?? "");
  }, [value]);

  useEffect(() => {
    setError(error ?? "");
  }, [error]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(name)(event);
  };

  const handleFocus = () => {
    setError("");
  };

  const handleBlur = () => {
    const { isValid, message } = validate(_value, validationRule);

    if (!isValid) {
      setError(message);
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
        {_error && <p className={styles.input__error}>{_error}</p>}
      </label>
    </div>
  );
};

export default FormInput;
