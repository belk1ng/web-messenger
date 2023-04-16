import React from "react";
import ErrorLayout from "../layouts/error";
import { APP_TITLE } from "../hooks/useTitle";

const NotFoundPage = () => {
  return (
    <ErrorLayout
      title={APP_TITLE.NOT_FOUND}
      errorMessage="Looks like you got lost..."
      errorDescription="The page you're looking for doesn't exist."
    />
  );
};

export default NotFoundPage;
