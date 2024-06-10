import { useState } from "react";
import { auth } from "../firebase/fbconfig";
import { useNavigate } from "react-router-dom";
import { TUseLogOutReturn } from "../types";

export const useLogOut = (): TUseLogOutReturn => {
  const navigate = useNavigate();
  const [logOutError, setLogOutError] = useState<string>("");

  const logout = () => {
    auth.signOut();
  };

  const handleLogout = async () => {
    setLogOutError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setLogOutError("failed to log out");
    }
  };
  return { handleLogout, logOutError };
};
