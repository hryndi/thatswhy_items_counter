import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/fbconfig";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { GroupContentAPI } from "../../store/GroupContentProvider";

const AddNewFieldModal = () => {
  const { groupId } = useParams();
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldValue, setNewFieldValue] = useState<null | number>(null);
  const newFieldHandler = useContextSelector(GroupContentAPI, (v) => v?.newFieldHandler);
  return (
    <>
      <h1>AddNewFieldModal component</h1>
      <TextField placeholder="field name" value={newFieldName} onChange={(e) => setNewFieldName(e.target.value)} />
      <TextField value={newFieldValue ? newFieldValue : 0} onChange={(e) => setNewFieldValue(+e.target.value)} />
      <Button variant={"contained"} onClick={() => newFieldValue && newFieldHandler?.(newFieldName, newFieldValue)}>
        Submit
      </Button>
    </>
  );
};
export default AddNewFieldModal;
