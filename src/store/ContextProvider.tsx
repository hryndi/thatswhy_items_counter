import { createContext } from "use-context-selector";
import { TContextAPI } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useLogIn } from "../hooks/useLogIn";
import { useLogOut } from "../hooks/useLogOut";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import firebase from "firebase/compat/app";
import { auth } from "../firebase/fbconfig";
import { set } from "firebase/database";
import { useGroupMenu } from "../hooks/useGroupMenu";

import { db } from "../firebase/fbconfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const ContextAPI = createContext<null | TContextAPI>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<firebase.User | undefined | null>(undefined);
  const [currentUserId, setCurrentUserId] = useState<string | undefined | null>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { signUpValues, SignUpInputConstructor, handleRegister, signUpError } = useAuth();
  const { logInValues, SignInInputConstructor } = useLogIn();
  const { handleLogout, logOutError } = useLogOut();
  const { newGroupName, isShowGroupCreator, setIsShowGroupCreator, setNewGroupName } = useGroupMenu();

  const handleUserGroups = () => {
    if (currentUserId) {
      const groupRef = doc(db, `/user_groups/${currentUserId}/${newGroupName}`, uuid());
      if (newGroupName === "" || newGroupName.length > 20) {
        console.log("group name is incorrect");
      } else {
        setDoc(groupRef, { merge: true });
        console.log("db updated sucessfully");
        navigate("/");
      }
    } else {
      console.log("currentUserId is not set");
    }
  };

  const [logInError, setLogInError] = useState<string>("");
  const logIn = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s].*@.*$/.test(logInValues.email)) {
      return setLogInError("email is not correct");
    }
    if (logInValues.password === "") {
      return setLogInError("password field can not be empty");
    } else {
      try {
        setLogInError("");
        setLoading(true);
        logIn(logInValues.email, logInValues.password).then(() => {
          navigate("/");
        });
      } catch (errors) {
        setLogInError("Failed to log-in in account");
      }
      setLoading(false);
    }
  };

  const vals: TContextAPI = {
    setNewGroupName,
    isShowGroupCreator,
    setIsShowGroupCreator,

    newGroupName,
    currentUserId,
    handleUserGroups,
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
      setCurrentUserId(user?.uid || null);
    });

    return unsubscribe;
  }, []);

  return <ContextAPI.Provider value={vals}> {!loading && children} </ContextAPI.Provider>;
};
export default ContextProvider;
