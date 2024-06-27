import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/fbconfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { GroupContentAPI } from "../../store/GroupContentProvider";
import { styled as styledMui } from "@mui/material/styles";

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

const AddNewFieldModal = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldValue, setNewFieldValue] = useState<null | number>(null);
  const newFieldHandler = useContextSelector(GroupContentAPI, (v) => v?.newFieldHandler);

  const handleClose = () => navigate(`/${groupId}`);
  return (
    <Modal
      sx={{ display: "grid", placeContent: "center", padding: 1 }}
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <SWrapper>
        <Stack
          sx={{
            backgroundColor: "#053737",
            paddingInline: 2,
            paddingBlock: 1,
          }}
        >
          <Typography variant="h4" color={"#e1f7e6"} fontWeight={"bold"} textAlign={"center"}>
            Add a new field
          </Typography>
        </Stack>
        <SContentWrapper>
          <TextField
            label={"New Field"}
            placeholder="e.g. Field 1"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            inputProps={{ min: 0, style: { textAlign: "center", fontSize: "1.5rem" } }}
          />
          {/* <TextField   /> */}
          <TextField
            label={"default value"}
            placeholder="e.g. Field 1"
            value={newFieldValue ? newFieldValue : 0}
            onChange={(e) => setNewFieldValue(+e.target.value)}
            inputProps={{ min: 0, style: { textAlign: "center", fontSize: "1.5rem" } }}
          />
        </SContentWrapper>

        <Stack width={"100%"} display={"flex"} justifyContent={"end"} padding={3} paddingTop={0}>
          <Button
            onClick={() => {
              newFieldValue && newFieldHandler?.(newFieldName, newFieldValue);
              navigate(`/${groupId}`);
            }}
            variant="contained"
          >
            Submit
          </Button>
        </Stack>
      </SWrapper>
    </Modal>
  );
};
export default AddNewFieldModal;
