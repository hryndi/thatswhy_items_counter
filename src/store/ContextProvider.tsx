import { createContext } from "use-context-selector";
import { TContextAPI, TGroupList } from "../types";

import React, { useCallback, useEffect, useState } from "react";

// import { useGroupMenu } from "../hooks/useGroupMenu";
// import { useGroupContent } from "../hooks/useGroupContent";

import { db } from "../firebase/fbconfig";
import { DocumentData, collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

export const ContextAPI = createContext<null | TContextAPI>(null);

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [currentUserId, setCurrentUserId] = useState<string | undefined | null>(undefined);
  const [groupItemsData, setGroupItemsData] = useState<DocumentData | null>(null);

  const [groupList, setGroupList] = useState<TGroupList[] | null>(null);
  const [currentGroup, setCurrentGroup] = useState<string>("");
  const [currentPageName, setCurrentPageName] = useState<string>("Menu");
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [isShowGroupCreator, setIsShowGroupCreator] = useState<boolean>(false);

  // const { newGroupName, isShowGroupCreator, setIsShowGroupCreator, setNewGroupName } = useGroupMenu();
  // const { displayGroupItemsHandler, groupItemsData } = useGroupContent();

  const addValueHandler = () => {
    if (currentUserId) {
      const groupRef = doc(db, "user_groups", currentUserId, "groups", newGroupName);

      setDoc(groupRef, {});
    }
    alert("added...");
  };

  const handleUserGroups = () => {
    if (newGroupName === "" || newGroupName.length > 20) {
      console.log("group name is incorrect");
    } else {
      addValueHandler();
      navigate("/");
    }
  };

  const getValue = () => {
    if (currentUserId) {
      const userGroupRef = doc(db, "user_groups", currentUserId);
      const collectionVal = query(collection(userGroupRef, "groups"));
      onSnapshot(collectionVal, (doc) => {
        setGroupList(doc.docs.map((doc) => ({ id: doc.id.replace(/ /g, "-"), name: doc.id })));
      });
    }
  };

  const displayGroupItemsHandler = useCallback(
    (groupId: string, currentUserId: string | null | undefined) => {
      const groupsRef = doc(db, `user_groups/${currentUserId}/groups/${currentGroup}`);

      console.log("docId: ");
      console.log("groupId: " + groupId);
      console.log(groupItemsData);
      onSnapshot(groupsRef, (querySnapshot) => {
        if (querySnapshot.id.replace(/ /g, "-") === groupId) {
          // Only update state if data has changed
          if (!groupItemsData || JSON.stringify(querySnapshot.data()) !== JSON.stringify(groupItemsData)) {
            setGroupItemsData({ ...querySnapshot.data() });
          }
        }
      });
    },
    [currentGroup, groupItemsData]
  );

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
    handleUserGroups,

    currentUserId,
    setCurrentUserId,
  };

  // useEffect(() => {}, []);

  useEffect(() => {
    if (currentUserId) {
      getValue();
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentUserId && groupId && currentGroup) {
      displayGroupItemsHandler?.(groupId, currentUserId);
    }
  }, [currentUserId, groupId, currentGroup, displayGroupItemsHandler]);

  return <ContextAPI.Provider value={vals}> {children} </ContextAPI.Provider>;
};
export default ContextProvider;
