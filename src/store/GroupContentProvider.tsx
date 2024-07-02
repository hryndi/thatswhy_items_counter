import { createContext } from "use-context-selector";
import { TGroupContentAPI } from "../types";
import { useParams, useNavigate } from "react-router-dom";
import { ContextAPI } from "../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { db } from "../firebase/fbconfig";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const GroupContentAPI = createContext<null | TGroupContentAPI>(null);

const GroupContentProvider = ({ children }: { children: React.ReactNode }) => {
  // addNewField
  const { groupId } = useParams();
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);
  const currentGroup = useContextSelector(ContextAPI, (v) => v?.currentGroup);

  const newFieldHandler = async (newFieldName: string, newFieldValue: number) => {
    const itemRef = currentGroup && currentUserId && doc(db, "user_groups", currentUserId, "groups", currentGroup);
    console.log(itemRef);
    try {
      itemRef &&
        (await setDoc(
          itemRef,
          {
            [newFieldName]: newFieldValue,
          },
          { merge: true }
        ).then(() => console.log("success")));
    } catch (error) {
      console.log(error, "Delete action was not successful");
    }
  };

  // itemSettingsModal
  const navigate = useNavigate();
  const { groupItemId } = useParams();
  const [itemValue, setItemValue] = useState<number>(0);
  const [customValue, setCustomValue] = useState<number>(0);
  const groupItemsData = useContextSelector(ContextAPI, (v) => v?.groupItemsData);
  const itemName =
    groupItemsData && Object.keys(groupItemsData).find((item) => item.toLowerCase().replace(/ /g, "-") === groupItemId);
  const itemsUrls =
    groupItemsData &&
    Object.keys(groupItemsData).map((item) => typeof item === "string" && item.toLowerCase().replace(/ /g, "-"));
  const isItemUrlCorrect = itemsUrls?.find((url) => url === groupItemId);

  useEffect(() => {
    groupItemsData &&
      groupItemId &&
      Object.entries(groupItemsData).map(([label, value]) => {
        label.toLowerCase().replace(/ /g, "-") === groupItemId && setItemValue(value);
      });
  });

  const deleteItemHandler = async () => {
    const itemRef =
      groupId && currentUserId && currentGroup && doc(db, "user_groups", currentUserId, "groups", currentGroup);

    itemRef && console.log("currGroup: ", groupId, "itemName: ", itemName);
    try {
      itemRef &&
        itemName &&
        (await updateDoc(itemRef, {
          [itemName]: deleteField(),
        }).then(() => navigate(`/${groupId}`)));
    } catch (error) {
      console.log(error, "Delete action was not successful");
    }
  };
  const addValueHandler = async () => {
    const tempVal = itemValue;
    const itemRef =
      groupId && currentUserId && currentGroup && doc(db, "user_groups", currentUserId, "groups", currentGroup);

    itemRef && console.log("groupId: ", groupId, "itemName: ", itemName);
    try {
      itemRef &&
        itemName &&
        (await setDoc(
          itemRef,
          {
            [itemName]: tempVal + 1,
          },
          { merge: true }
        ).then(() => console.log("success")));
    } catch (error) {
      console.log(error, "Delete action was not successful");
    }
  };

  const removeValueHandler = async () => {
    const tempVal = itemValue;
    const itemRef =
      groupId && currentUserId && currentGroup && doc(db, "user_groups", currentUserId, "groups", currentGroup);

    itemRef && console.log("groupId: ", groupId, "itemName: ", itemName);
    try {
      itemRef &&
        itemName &&
        (await setDoc(
          itemRef,
          {
            [itemName]: tempVal - 1,
          },
          { merge: true }
        ).then(() => console.log("success")));
    } catch (error) {
      console.log(error, "Delete action was not successful");
    }
  };
  console.log(groupId);

  const addCustomValueHandler = async () => {
    const tempVal = itemValue;
    const itemRef =
      groupId && currentUserId && currentGroup && doc(db, "user_groups", currentUserId, "groups", currentGroup);

    itemRef && console.log("groupId: ", groupId, "itemName: ", itemName);
    try {
      itemRef &&
        itemName &&
        (await setDoc(
          itemRef,
          {
            [itemName]: tempVal + customValue,
          },
          { merge: true }
        ).then(() => console.log("success")));
    } catch (error) {
      console.log(error, "Delete action was not successful");
    }
  };

  const vals: TGroupContentAPI = {
    newFieldHandler,
    deleteItemHandler,
    isItemUrlCorrect,
    itemName,
    itemValue,
    addValueHandler,
    removeValueHandler,
    customValue,
    setCustomValue,
    addCustomValueHandler,
  };

  return <GroupContentAPI.Provider value={vals}> {children} </GroupContentAPI.Provider>;
};
export default GroupContentProvider;
