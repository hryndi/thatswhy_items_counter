import { Button } from "@mui/material";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { setDefaultEventParameters } from "firebase/analytics";
import { TGroupList } from "../../types";

const GroupMenu = () => {
  const navigate = useNavigate();

  const groupList = useContextSelector(ContextAPI, (v) => v?.groupList);
  const setCurrentGroup = useContextSelector(ContextAPI, (v) => v?.setCurrentGroup);

  return (
    <>
      <h1>GroupMenu Page</h1>
      <ul>
        {groupList?.map((item) => (
          <li id={item.id}>
            <Link to={item.id} onClick={() => setCurrentGroup?.(item.name)}>
              {item.name}
            </Link>
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
