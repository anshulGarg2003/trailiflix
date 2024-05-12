import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    toast.error("Login First!!");
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
