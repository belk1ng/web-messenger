import { VALIDATION_FIELD } from "../../utils/validate";

export interface FormInputProps {
  type: "text" | "password" | "email" | "phone";
  name: string;
  placeholder: string;
  label: string;
  validationRule: VALIDATION_FIELD;

  value?: string;
  onChange?: (
    name: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}
