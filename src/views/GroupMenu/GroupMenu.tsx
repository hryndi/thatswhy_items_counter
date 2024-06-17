import { Button } from "@mui/material";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useEffect } from "react";
import AddGroupModal from "./AddGroupModal";
import { Outlet, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/fbconfig";

const GroupMenu = () => {
  // const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);

  // const groupRef = doc(db, `/user_groups/KtfasWCr8sUUzkf1gE7P1ET0koZ2`);

  const navigate = useNavigate();
  return (
    <>
      <h1>GroupMenu Page</h1>
      <Button variant="contained" onClick={() => navigate("/add-group")}>
        Create Group
      </Button>
      <Outlet />
    </>
  );
};

export default GroupMenu;
