import { TGroupList, TUseGroupMenuReturn } from "../types";
import { ContextAPI } from "../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs, addDoc, query, setDoc } from "firebase/firestore";
import { db } from "../firebase/fbconfig";

export const useGroupMenu = (): TUseGroupMenuReturn => {
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [isShowGroupCreator, setIsShowGroupCreator] = useState<boolean>(false);

  //   const [groups, setGroups] = useState < Array<object>([{}]);
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);

  return {
    setNewGroupName,
    newGroupName,
    isShowGroupCreator,
    setIsShowGroupCreator,
  };
};
