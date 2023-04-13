import { VALIDATION_FIELD } from "../../utils/validate";

export interface FormInputProps {
  type: "text" | "password" | "email" | "phone";
  name: string;
  placeholder: string;
  label: string;
  validationRule: VALIDATION_FIELD;

  value?: string;
  errorMessage?: string;
  clearError?: (value: string) => void;
  onChange?: (value: string, name: string) => void;
}