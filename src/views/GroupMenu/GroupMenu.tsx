import { Box, Button, Card, CardActionArea, Grid, Stack, Typography } from "@mui/material";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Fab from "@mui/material/Fab";
import { setDefaultEventParameters } from "firebase/analytics";
import { TGroupList } from "../../types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/fbconfig";
import { styled as styledMui } from "@mui/material/styles";

const SBox = styledMui(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: "1.5rem",
}));
const GroupMenu = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const groupList = useContextSelector(ContextAPI, (v) => v?.groupList);
  const setCurrentGroup = useContextSelector(ContextAPI, (v) => v?.setCurrentGroup);
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);
  // const setCurrentPageName = useContextSelector(ContextAPI, (v) => v?.setCurrentPageName);

  const deleteGroupHandler = async (docId: string) => {
    currentUserId && (await deleteDoc(doc(db, "user_groups", currentUserId, "groups", docId)));
  };
  // groupId && setCurrentPageName?.(groupId);

  return (
    <>
      <SBox>
        <Stack direction={"row"} justifyContent={"flex-start"} marginBottom={3}>
          <Button sx={{ width: "150px" }} variant="contained" onClick={() => navigate("/add-group")}>
            Create Group
          </Button>
        </Stack>
        <Grid container spacing={2} overflow={"auto"}>
          {groupList?.map((item) => {
            return (
              <Grid item xs={12} id={item.id}>
                <Card sx={{ display: "flex", width: "100%" }}>
                  <CardActionArea
                    sx={{ display: "flex", justifyContent: "flex-start", gap: "0.8rem" }}
                    onClick={() => {
                      navigate(item.id);
                      setCurrentGroup?.(item.name);
                    }}
                  >
                    <Box
                      height="100%"
                      width={60}
                      sx={{ backgroundColor: "#e5fdfc", display: "grid", placeContent: "center" }}
                    >
                      <Typography fontSize={28}>✅</Typography>
                    </Box>
                    <Typography sx={{ wordBreak: "break-all" }} gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                  </CardActionArea>

                  <Button
                    onClick={() => deleteGroupHandler(item.name)}
                    size="small"
                    variant="contained"
                    sx={{
                      padding: "1rem",
                      backgroundColor: "#fc3b3bc6",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    Delete
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Outlet />
      </SBox>
    </>
  );
};

export default GroupMenu;
