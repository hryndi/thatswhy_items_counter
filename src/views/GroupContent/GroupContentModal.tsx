import { GroupContentAPI } from "../../store/GroupContentProvider";
import { useContextSelector } from "use-context-selector";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { styled as styledMui } from "@mui/material/styles";

const SWrapper = styledMui(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: "1rem",
  overflow: "hidden",
}));
const SContentWrapper = styledMui(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 40,
  padding: "4rem",
  "@media(max-width:400px)": {
    padding: "3rem",
  },
}));
const GroupContentModal = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const deleteItemHandler = useContextSelector(GroupContentAPI, (v) => v?.deleteItemHandler);
  const addValueHandler = useContextSelector(GroupContentAPI, (v) => v?.addValueHandler);
  const removeValueHandler = useContextSelector(GroupContentAPI, (v) => v?.removeValueHandler);
  const addCustomValueHandler = useContextSelector(GroupContentAPI, (v) => v?.addCustomValueHandler);
  const customValue = useContextSelector(GroupContentAPI, (v) => v?.customValue);
  const setCustomValue = useContextSelector(GroupContentAPI, (v) => v?.setCustomValue);
  const isItemUrlCorrect = useContextSelector(GroupContentAPI, (v) => v?.isItemUrlCorrect);
  const itemName = useContextSelector(GroupContentAPI, (v) => v?.itemName);
  const itemValue = useContextSelector(GroupContentAPI, (v) => v?.itemValue);

  const handleClose = () => navigate(`/${groupId}`);
  return (
    <>
      {" "}
      {isItemUrlCorrect ? (
        <>
          <Modal
            sx={{ display: "grid", placeContent: "center", padding: 1 }}
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <SWrapper>
                <Stack
                  sx={{
                    backgroundColor: "#053737",
                    paddingInline: 2,
                    paddingBlock: 1,
                  }}
                >
                  <Typography variant="h4" color={"#e1f7e6"} fontWeight={"bold"} textAlign={"center"}>
                    {itemName}
                  </Typography>
                </Stack>
                <SContentWrapper>
                  <Box sx={{ display: "flex" }}>
                    <Button variant="contained" sx={{ fontWeight: 600 }} onClick={addValueHandler} color="secondary">
                      add
                    </Button>
                    <Typography variant="h4" fontWeight={500} marginInline={2}>
                      {itemValue}
                    </Typography>
                    <Button onClick={removeValueHandler} variant="contained" color="error">
                      remove
                    </Button>
                  </Box>

                  <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant="h5" fontWeight={600}></Typography>
                    <Box display={"grid"} gap={1}>
                      <TextField
                        label={"Add a custom value"}
                        placeholder="type in value to add"
                        value={customValue}
                        onChange={(e) => setCustomValue?.(+e.target.value)}
                        inputProps={{ min: 0, style: { textAlign: "center", fontSize: "1.5rem" } }}
                      />

                      <Button
                        sx={{ width: "100%", fontWeight: 600 }}
                        variant={"contained"}
                        color="secondary"
                        onClick={addCustomValueHandler}
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </SContentWrapper>
                <Button
                  sx={{ width: "-webkit-fill-available", margin: "1.5rem" }}
                  variant="contained"
                  onClick={deleteItemHandler}
                  color="error"
                >
                  Delete Item
                </Button>
              </SWrapper>
            </>
          </Modal>
        </>
      ) : (
        <h2>Page not found</h2>
      )}{" "}
    </>
  );
};

export default GroupContentModal;
