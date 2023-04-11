import { useEffect } from "react";

export enum APP_TITLE {
  "LOGIN" = "Login | ",
  "REGISTRATION" = "Registration | ",
  "PROFILE" = "Profile | ",
  "PROFILE_EDIT" = "Edit profile | ",
  "PROFILE_EDIT_PASSWORD" = "Change password | ",
  "CHATS" = "Chats | ",
  "NOT_FOUND" = "Not found | ",
  "UNATHORIZED" = "Unauthorized | ",
}

const useTitle = (page: APP_TITLE) => {
  useEffect(() => {
    document.title = page + "Web-Messenger";
  }, [page]);
};

export default useTitle;
