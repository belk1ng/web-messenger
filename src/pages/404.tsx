import React from "react";
import ErrorLayout from "../layouts/error";

const NotFoundPage = () => {
  return (
    <ErrorLayout
      errorMessage="Looks like you got lost..."
      errorDescription="The page you're looking for doesn't exist."
    />
  );
};

export default NotFoundPage;
