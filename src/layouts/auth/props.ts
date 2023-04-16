import { APP_TITLE } from "../../hooks/useTitle";

export interface AuthLayoutProps {
  children: Children;
  documentTitle: APP_TITLE;
  title: string;
}
