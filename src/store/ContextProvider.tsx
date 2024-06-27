import { createContext } from "use-context-selector";
import { TContextAPI, TGroupList } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useLogIn } from "../hooks/useLogIn";
import { useLogOut } from "../hooks/useLogOut";
import React, { useEffect, useState } from "react";

import firebase from "firebase/compat/app";
import { auth } from "../firebase/fbconfig";
import { useGroupMenu } from "../hooks/useGroupMenu";
import { useGroupContent } from "../hooks/useGroupContent";

import { db } from "../firebase/fbconfig";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const ContextAPI = createContext<null | TContextAPI>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<firebase.User | undefined | null>(undefined);
  const [currentUserId, setCurrentUserId] = useState<string | undefined | null>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [groupList, setGroupList] = useState<TGroupList[] | null>(null);
  const [currentGroup, setCurrentGroup] = useState<string>("");
  const [currentPageName, setCurrentPageName] = useState<string>("Menu");

  const { signUpValues, SignUpInputConstructor, handleRegister, signUpError } = useAuth();
  const { logInValues, SignInInputConstructor } = useLogIn();
  const { handleLogout, logOutError } = useLogOut();
  const { newGroupName, isShowGroupCreator, setIsShowGroupCreator, setNewGroupName } = useGroupMenu();
  const { displayGroupItemsHandler, groupItemsData } = useGroupContent();

  const handleUserGroups = () => {
    if (newGroupName === "" || newGroupName.length > 20) {
      console.log("group name is incorrect");
    } else {
      addValueHandler();
      navigate("/");
    }
  };

  const [logInError, setLogInError] = useState<string>("");
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
      setLoading(true);

      await logIn(logInValues.email, logInValues.password);

      setTimeout(() => navigate("/"));
    } catch (errors) {
      setLogInError("Failed to log-in in account");
    } finally {
      setLoading(false);
    }
  };

  const getValue = () => {
    if (currentUserId) {
      const userGroupRef = doc(db, "user_groups", currentUserId);
      const collectionVal = query(collection(userGroupRef, "groups"));
      onSnapshot(collectionVal, (doc) => {
        setGroupList(doc.docs.map((doc) => ({ id: doc.id.replace(/ /g, "-"), name: doc.id })));
      });
      // const getValue = await getDocs(collectionVal);
      // setGroupList(getValue.docs.map((doc) => ({ id: doc.id })));
    }
  };
  const addValueHandler = () => {
    if (currentUserId) {
      const groupRef = doc(db, "user_groups", currentUserId, "groups", newGroupName);

      setDoc(groupRef, {});
    }
    alert("added...");
  };

  const vals: TContextAPI = {
    currentPageName,
    setCurrentPageName,
    currentGroup,
    setCurrentGroup,
    groupItemsData,
    displayGroupItemsHandler,
    addValueHandler,
    groupList,
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
  // useEffect(() => {}, []);

  useEffect(() => {
    if (currentUserId) {
      getValue();
    }
  }, [currentUserId]);
  console.log(groupList);
  return <ContextAPI.Provider value={vals}> {!loading && children} </ContextAPI.Provider>;
};
export default ContextProvider;
