import React from "react";
import ProfileLayout from "../../layouts/profile";
import Actions from "./Actions";
import Avatar from "../../components/avatar";
import ProfileRow from "../../components/profile-row";
import useAuth from "../../hooks/useAuth";
import { APP_TITLE } from "../../hooks/useTitle";
import { APP_ROUTES } from "../../routes/routes";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <ProfileLayout
      title={APP_TITLE.PROFILE}
      asideHref={APP_ROUTES.CHATS}
      actions={<Actions />}
    >
      <Avatar readonly={true} source={user?.avatar ?? ""} />

      <ProfileRow
        label="Email"
        value={user?.email ?? ""}
        name="email"
        type="email"
        readonly={true}
      />
      <ProfileRow
        label="Login"
        value={user?.login ?? ""}
        name="login"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="First name"
        value={user?.first_name ?? ""}
        name="first_name"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="Second name"
        value={user?.second_name ?? ""}
        name="second_name"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="Display name"
        value={user?.display_name ?? ""}
        name="display_name"
        type="text"
        readonly={true}
      />
      <ProfileRow
        label="Phone"
        value={user?.phone ?? ""}
        name="phone"
        type="phone"
        readonly={true}
      />
    </ProfileLayout>
  );
};

export default ProfilePage;
