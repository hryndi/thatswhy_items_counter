import { useContextSelector } from "use-context-selector";
import { ContextAPI } from "../store/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const PrivateRoute = () => {
  const currentUser = useContextSelector(ContextAPI, (v) => v?.currentUser);
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
