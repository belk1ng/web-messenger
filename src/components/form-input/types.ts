import { VALIDATION_FIELD } from "../../utils/validate";

export interface FormInputProps {
  type: "text" | "password" | "email" | "phone";
  name: string;
  placeholder: string;
  label: string;
  validationRule: VALIDATION_FIELD;

  errorMessage?: string;
}
