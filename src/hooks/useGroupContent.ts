import { DocumentData, collection, doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/fbconfig";

export const useGroupContent = () => {
  const [groupItemsData, setGroupItemsData] = useState<DocumentData | null>(null);

  const displayGroupItemsHandler = (groupId: string, currentUserId: string | null | undefined) => {
    if (currentUserId && groupId) {
      const groupsRef = collection(doc(db, "user_groups", "KtfasWCr8sUUzkf1gE7P1ET0koZ2"), "groups");

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
  return { groupItemsData, displayGroupItemsHandler };
};
