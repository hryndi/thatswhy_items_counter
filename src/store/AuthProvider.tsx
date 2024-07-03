import { createContext } from "use-context-selector";
import { TAuthAPI } from "../types";
import { useEffect, useState } from "react";
import { auth } from "../firebase/fbconfig";
import { useAuth } from "../hooks/useAuth";
import { useLogIn } from "../hooks/useLogIn";
import { useLogOut } from "../hooks/useLogOut";
import { ContextAPI } from "./ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";

export const AuthAPI = createContext<null | TAuthAPI>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const setCurrentUserId = useContextSelector(ContextAPI, (v) => v?.setCurrentUserId);

  const { signUpValues, SignUpInputConstructor, handleRegister, signUpError } = useAuth();
  const { logInValues, SignInInputConstructor } = useLogIn();
  const { handleLogout, logOutError } = useLogOut();
  const [logInError, setLogInError] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<firebase.User | undefined | null>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const logIn = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s].*@.*$/.test(logInValues.email)) {
      return setLogInError("Email is not correct");
    }
    if (logInValues.password === "") {
      return setLogInError("password field can not be empty");
    }

    try {
      setLogInError("");
      setLoading?.(true);

      await logIn(logInValues.email, logInValues.password);

      setTimeout(() => navigate("/"));
    } catch (errors) {
      setLogInError("Failed to log-in in account");
    } finally {
      setLoading?.(false);
    }
  };

  const vals: TAuthAPI = {
    handleLogout,
    logOutError,
    signUpValues,
    SignUpInputConstructor,
    handleRegister,
    signUpError,
    logInValues,
    SignInInputConstructor,
    handleLogIn,
    logInError,
    currentUser,
    loading,
    setLoading,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading?.(false);
      setCurrentUserId?.(user?.uid || null);
    });

    return unsubscribe;
  }, []);
  return <AuthAPI.Provider value={vals}> {!loading && children} </AuthAPI.Provider>;
};
export default AuthProvider;
