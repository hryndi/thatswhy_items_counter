import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { db } from "../../firebase/fbconfig";
import { DocumentData, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";
import GroupContentProvider from "../../store/GroupContentProvider";
const GroupContent = () => {
  const { groupId } = useParams();

  const navigate = useNavigate();
  const groupItemsData = useContextSelector(ContextAPI, (v) => v?.groupItemsData);
  const displayGroupItemsHandler = useContextSelector(ContextAPI, (v) => v?.displayGroupItemsHandler);
  const groupList = useContextSelector(ContextAPI, (v) => v?.groupList);
  const isGroupContentUrlCorrect = groupList?.find((group) => group.id === groupId);
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);
  groupId && currentUserId && displayGroupItemsHandler?.(groupId, currentUserId);
  console.log(groupItemsData);

  return (
    <>
      <GroupContentProvider>
        {isGroupContentUrlCorrect ? (
          <>
            <h1> GroupContent page</h1>
            <ul>
              {groupItemsData &&
                Object.entries(groupItemsData).map(([label, value]) => (
                  <li id={label}>
                    <Link to={`/${groupId}/${label.toLowerCase().replace(/ /g, "-")}`}>{`${label}: ${value}`}</Link>
                  </li>
                ))}
            </ul>
            <Outlet />
            <h3>Create new Field:</h3>
            <Button variant={"contained"} onClick={() => navigate(`/${groupId}/new-field`)}>
              Create new field
            </Button>
          </>
        ) : (
          <h2>Page not found</h2>
        )}
      </GroupContentProvider>
    </>
  );
};
export default GroupContent;
