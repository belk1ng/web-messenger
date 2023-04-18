import React, { FC } from "react";
import useInput from "../../hooks/useInput";
import styles from "./ProfileRow.module.scss";
import { ProfileRowProps } from "./props";

const ProfileRow: FC<ProfileRowProps> = ({
  label,
  value,
  error,
  onChange,
  name,
  placeholder,
  type,
  validationRule,
  readonly,
}) => {
  const { inputValue, inputError, handleFocus, handleBlur, handleChange } =
    useInput({ name, value, error, validationRule, onChange });

  return (
    <>
      <div className={styles.row}>
        <div className={styles.row__container}>
          <p className={styles.row__label}>{label}</p>
          <label>
            <input
              className={styles.row__value}
              type={type}
              value={inputValue}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              readOnly={readonly}
            />
          </label>
        </div>

        {inputError && <p className={styles.row__error}>{inputError}</p>}
      </div>
    </>
  );
};

export default ProfileRow;
