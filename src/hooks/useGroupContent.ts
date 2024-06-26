import { DocumentData, collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/fbconfig";
import { useContextSelector } from "use-context-selector";
import { ContextAPI } from "../store/ContextProvider";
import { useParams } from "react-router-dom";

export const useGroupContent = () => {
  const [groupItemsData, setGroupItemsData] = useState<DocumentData | null>(null);

  const displayGroupItemsHandler = (groupId: string, currentUserId: string | null | undefined) => {
    if (currentUserId && groupId) {
      const groupsRef = collection(doc(db, "user_groups", currentUserId), "groups");

      onSnapshot(groupsRef, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (doc.id === groupId) {
            console.log(doc);
            // Only update state if data has changed
            if (!groupItemsData || JSON.stringify(doc.data()) !== JSON.stringify(groupItemsData)) {
              setGroupItemsData(doc.data());
            }
          }
        });
      });
    }
  };

  // addNewFieldModal
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);
  //   const { groupId } = useParams();

  return { groupItemsData, displayGroupItemsHandler };
};
