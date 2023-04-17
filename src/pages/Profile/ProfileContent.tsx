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
      <Avatar readonly={true} source={user?.avatar} />
      <ProfileRow label="Email" value={user?.email} />
      <ProfileRow label="Login" value={user?.login} />
      <ProfileRow label="First name" value={user?.first_name} />
      <ProfileRow label="Second name" value={user?.second_name} />
      <ProfileRow label="Display name" value={user?.display_name} />
      <ProfileRow label="Phone" value={user?.phone} />
    </ProfileLayout>
  );
};

export default ProfilePage;
