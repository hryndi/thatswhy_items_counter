import { Box, Button, Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useRef } from "react";
const AddGroupModal = () => {
  const newGroupName = useContextSelector(ContextAPI, (v) => v?.newGroupName);
  const handleUserGroups = useContextSelector(ContextAPI, (v) => v?.handleUserGroups);
  const setNewGroupName = useContextSelector(ContextAPI, (v) => v?.setNewGroupName);
  const addValueHandler = useContextSelector(ContextAPI, (v) => v?.addValueHandler);
  return (
    <Box component={"div"} padding={3}>
      <div>
        <Typography variant="h5">Group name</Typography>
        <TextField
          onChange={(e) => setNewGroupName?.(e.target.value)}
          value={newGroupName}
          placeholder="e.g. Test Group"
          variant="filled"
        ></TextField>
      </div>
      <Stack width={"100%"} display={"flex"} justifyContent={"end"}>
        <Button onClick={handleUserGroups} variant="contained">
          Create new group
        </Button>
      </Stack>
    </Box>
  );
};

export default AddGroupModal;
