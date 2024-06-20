import { Outlet, useParams } from "react-router-dom";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { db } from "../../firebase/fbconfig";
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

const GroupContent = () => {
  const displayGroupItemsHandler = useContextSelector(ContextAPI, (v) => v?.displayGroupItemsHandler);
  const groupItemsData = useContextSelector(ContextAPI, (v) => v?.groupItemsData);
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);
  const groupList = useContextSelector(ContextAPI, (v) => v?.groupList);
  const { groupId } = useParams();
  const isUrlCorrect = groupList?.find((group) => group.id === groupId);

  groupId && currentUserId && displayGroupItemsHandler?.(groupId, currentUserId);
  console.log(groupItemsData);
  {
    dfdfd: 32;
  }
  return (
    <>
      {isUrlCorrect ? (
        <>
          <h1> GroupContent page</h1>
          <ul>
            {groupItemsData && Object.entries(groupItemsData).map(([label, value]) => <li>{`${label}: ${value}`}</li>)}
          </ul>
          <Outlet />
        </>
      ) : (
        <h2>Page not found</h2>
      )}
    </>
  );
};
export default GroupContent;
