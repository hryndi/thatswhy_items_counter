import { createContext } from "use-context-selector";
import { TContextAPI } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useLogIn } from "../hooks/useLogIn";
import { useLogOut } from "../hooks/useLogOut";
import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import { auth } from "../firebase/fbconfig";
import { set } from "firebase/database";

export const ContextAPI = createContext<null | TContextAPI>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | undefined | null>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { signUpValues, SignUpInputConstructor, handleRegister, signUpError } = useAuth();
  const { logInValues, SignInInputConstructor, handleLogIn, logInError } = useLogIn();
  const { handleLogout, logOutError } = useLogOut();

  const vals: TContextAPI = {
    handleLogout,
    logOutError,
    setLoading,
    currentUser,
    signUpValues,
    SignUpInputConstructor,
    handleRegister,
    loading,
    signUpError,
    logInValues,
    SignInInputConstructor,
    handleLogIn,
    logInError,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return <ContextAPI.Provider value={vals}> {!loading && children} </ContextAPI.Provider>;
};
export default ContextProvider;
