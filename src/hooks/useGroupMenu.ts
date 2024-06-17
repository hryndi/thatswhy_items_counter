import { db } from "../firebase/fbconfig";
import { doc, setDoc } from "firebase/firestore";
import { TUseGroupMenuReturn } from "../types";
import { ContextAPI } from "../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGroupMenu = (): TUseGroupMenuReturn => {
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [isShowGroupCreator, setIsShowGroupCreator] = useState<boolean>(false);
  //   const [groups, setGroups] = useState < Array<object>([{}]);

  return { setNewGroupName, newGroupName, isShowGroupCreator, setIsShowGroupCreator };
};
