import { Button } from "@mui/material";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { setDefaultEventParameters } from "firebase/analytics";
import { TGroupList } from "../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/fbconfig";

const GroupMenu = () => {
  const navigate = useNavigate();

  const groupList = useContextSelector(ContextAPI, (v) => v?.groupList);
  const setCurrentGroup = useContextSelector(ContextAPI, (v) => v?.setCurrentGroup);
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);

  const deleteGroupHandler = async (docId: string) => {
    currentUserId && (await deleteDoc(doc(db, "user_groups", currentUserId, "groups", docId)));
  };
  return (
    <>
      <h1>GroupMenu Page</h1>
      <ul>
        {groupList?.map((item) => (
          <li id={item.id} style={{ display: "flex", gap: "1rem", marginBlock: "0.5rem" }}>
            <Link to={item.id} onClick={() => setCurrentGroup?.(item.name)}>
              {item.name}
            </Link>
            <Button variant={"contained"} onClick={() => deleteGroupHandler(item.name)}>
              Delete Group
            </Button>
          </li>
        ))}
      </ul>

      <Button variant="contained" onClick={() => navigate("/add-group")}>
        Create Group
      </Button>
      <Outlet />
    </>
  );
};

export default GroupMenu;
