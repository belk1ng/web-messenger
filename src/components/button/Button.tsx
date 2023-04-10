import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ButtonProps } from "./types";

import classnames from "classnames";
import styles from "./Button.module.scss";

const Button: FC<ButtonProps> = ({ variant, text, href, modificator }) => {
  if (variant === "button") {
    return (
      <button
        className={classnames(
          styles.button,
          modificator && styles[`button--${modificator}`]
        )}
        type="submit"
      >
        {text}
      </button>
    );
  }

  return (
    <Link
      to={href ? href : "/"}
      className={classnames(
        styles.button,
        modificator && styles[`button--${modificator}`]
      )}
    >
      {text}
    </Link>
  );
};

export default Button;
