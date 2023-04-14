import { ChangeEvent, SyntheticEvent, useState } from "react";

interface Validation {
  callback?: {
    value: (value: string) => boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
}

interface Props<T> {
  initState: T;
  onSubmit: () => void;
  validations: Partial<Record<keyof T, Validation>>;
}

type Errors<T> = Partial<Record<keyof T, string>>;

const useForm = <T extends Record<string, string>>({
  initState,
  onSubmit,
  validations,
}: Props<T>) => {
  const [data, setData] = useState<T>(initState);

  const [errors, setErrors] = useState<Errors<T>>({});

  const handleError = (fieldName: string | string[], message: string) => {
    const errorsUpd = Array.isArray(fieldName)
      ? fieldName.reduce(
          (acc, curr) => Object.assign(acc, { [curr]: message }),
          {}
        )
      : { [fieldName]: message };

    setErrors((prev) => ({ ...prev, ...errorsUpd }));
  };

  const handleChange =
    (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }

      setData((prev) => ({ ...prev, [name]: event.target.value }));
    };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    let isFormValid = true;

    const _errors: Errors<T> = {};

    for (const [name, value] of formData) {
      console.log(name, ": ", value);
    }

    Object.keys(validations).forEach((field) => {
      const validation = validations[field];
      const fieldValue = data[field];

      const callback = validation?.callback;

      if (callback?.value && !callback.value(fieldValue)) {
        isFormValid = false;
        _errors[field as keyof T] = callback.message;
      }

      const pattern = validation?.pattern;

      if (pattern?.value && !pattern.value.test(fieldValue)) {
        isFormValid = false;
        _errors[field as keyof T] = pattern.message;
      }
    });

    if (onSubmit && isFormValid) {
      onSubmit();
      setErrors({});
    } else {
      setErrors(_errors);
    }
  };

  return {
    data,
    errors,
    handleChange,
    handleError,
    handleSubmit,
  };
};

export default useForm;
