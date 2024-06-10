import { useContextSelector } from "use-context-selector";
import { ContextAPI } from "../store/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

import React from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = useContextSelector(ContextAPI, (v) => v?.currentUser);
  console.log(currentUser);
  return currentUser?.email ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
// { children }: { children: React.ReactNode }
