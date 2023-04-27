import { useState, useEffect, ChangeEvent } from "react";
import { validate } from "../utils/validate";
import { FormInputProps } from "../components/form-input/props";

type Props = Pick<
  FormInputProps,
  "name" | "value" | "error" | "validationRule" | "onChange"
>;

const useInput = ({ name, value, error, validationRule, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(value || "");

  const [inputError, setInputError] = useState(error || "");

  useEffect(() => {
    if (typeof error === "string" && inputError !== error) {
      setInputError(error);
    }

    if (typeof value === "string" && inputValue !== value) {
      setInputValue(value);
    }
  }, [error, value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(name)(event);
  };

  const handleFocus = () => {
    setInputError("");
  };

  const handleBlur = () => {
    if (validationRule) {
      const { isValid, message } = validate(inputValue, validationRule);

      if (!isValid) {
        setInputError(message);
      }
    }
  };

  return {
    inputValue,
    inputError,
    handleFocus,
    handleBlur,
    handleChange,
  };
};

export default useInput;
