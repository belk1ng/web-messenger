import React, { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ButtonProps } from "./props";

import classnames from "classnames";
import styles from "./Button.module.scss";

const Button: FC<ButtonProps> = ({
  variant,
  text,
  href,
  modifier,
  onClick,
}) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    onClick && onClick();
  };

  if (variant === "button") {
    return (
      <button
        className={classnames(
          styles.button,
          modifier && styles[`button--${modifier}`]
        )}
        type="submit"
        onClick={onClick && handleClick}
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
        modifier && styles[`button--${modifier}`]
      )}
      onClick={onClick && handleClick}
    >
      {text}
    </Link>
  );
};

export default Button;
