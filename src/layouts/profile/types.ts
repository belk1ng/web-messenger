import { APP_TITLE } from "../../hooks/useTitle";

export interface ProfileLayoutProps {
  asideHref: string;
  title: APP_TITLE;
  children: Children;
}
