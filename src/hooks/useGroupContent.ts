import { DocumentData, collection, doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/fbconfig";

export const useGroupContent = () => {
  const [groupItemsData, setGroupItemsData] = useState<DocumentData | null>(null);

  const displayGroupItemsHandler = (groupId: string, currentUserId: string | null | undefined) => {
    if (currentUserId && groupId) {
      const groupsRef = collection(doc(db, "user_groups", currentUserId), "groups");

      onSnapshot(groupsRef, (querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          console.log("docId: " + doc.id);
          console.log("groupId: " + groupId);
          console.log(groupItemsData);

          if (doc.id.replace(/ /g, "-") === groupId) {
            console.log(doc);
            // Only update state if data has changed
            if (!groupItemsData || JSON.stringify(doc.data()) !== JSON.stringify(groupItemsData)) {
              setGroupItemsData({ ...doc.data() });
            }
          }
        });
      });
    }
  };

  return { groupItemsData, displayGroupItemsHandler };
};
