export interface ButtonProps {
  variant: "button" | "link";
  text: string;

  href?: string;
  modifier?: "primary" | "error";
  onClick?: VoidFunction;
}
