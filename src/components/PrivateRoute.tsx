import { useContextSelector } from "use-context-selector";
import { Navigate, Outlet } from "react-router-dom";
import { AuthAPI } from "../store/AuthProvider";
import Navbar from "./Navbar";

const PrivateRoute = () => {
  const currentUser = useContextSelector(AuthAPI, (v) => v?.currentUser);
  if (currentUser === undefined) return null;

  return (
    <>
      {currentUser ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/sign-in" />
      )}
    </>
  );
};

export default PrivateRoute;
// { children }: { children: React.ReactNode }
