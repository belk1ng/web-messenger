export interface ButtonProps {
  variant: "button" | "link";
  text: string;

  href?: string;
  modificator?: "primary" | "error";
  onClick?: VoidFunction;
}
