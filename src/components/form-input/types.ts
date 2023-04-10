export interface FormInputProps {
  type: "text" | "password" | "email" | "phone";
  name: string;
  placeholder: string;
  label: string;

  errorMessage?: string;
}
