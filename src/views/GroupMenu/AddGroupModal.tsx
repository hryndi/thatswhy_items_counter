import { Box, Button, Modal, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useRef, useState } from "react";
import { styled as styledMui } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const SWrapper = styledMui(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: "1rem",
  overflow: "hidden",
}));
const SContentWrapper = styledMui(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 40,
  padding: "4rem",
}));

const AddGroupModal = () => {
  const navigate = useNavigate();
  const newGroupName = useContextSelector(ContextAPI, (v) => v?.newGroupName);
  const handleUserGroups = useContextSelector(ContextAPI, (v) => v?.handleUserGroups);
  const setNewGroupName = useContextSelector(ContextAPI, (v) => v?.setNewGroupName);
  const addValueHandler = useContextSelector(ContextAPI, (v) => v?.addValueHandler);

  const handleClose = () => navigate("/");
  return (
    <Modal
      sx={{ display: "grid", placeContent: "center", padding: 1 }}
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {/* <Box component={"div"} padding={3}> */}
      <SWrapper>
        <Stack
          sx={{
            backgroundColor: "#053737",
            paddingInline: 2,
            paddingBlock: 1,
          }}
        >
          <Typography variant="h4" color={"#e1f7e6"} fontWeight={"bold"} textAlign={"center"}>
            Create a new Group
          </Typography>
        </Stack>
        <SContentWrapper>
          <>
            {/* <TextField
             
              value={newGroupName}
              placeholder="e.g. Test Group"
              variant="filled"
            /> */}
            <TextField
              label={"Group name"}
              placeholder="e.g. Group 1"
              value={newGroupName}
              onChange={(e) => setNewGroupName?.(e.target.value)}
              inputProps={{ min: 0, style: { textAlign: "center", fontSize: "1.5rem" } }}
            />
          </>
        </SContentWrapper>
        <Stack width={"100%"} display={"flex"} justifyContent={"end"} padding={3} paddingTop={0}>
          <Button onClick={handleUserGroups} variant="contained">
            Create new group
          </Button>
        </Stack>

        {/* </Box> */}
      </SWrapper>
    </Modal>
  );
};

export default AddGroupModal;
