import { ContextAPI } from "../../store/ContextProvider";
import { GroupContentAPI } from "../../store/GroupContentProvider";
import { useContextSelector } from "use-context-selector";
import { useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/fbconfig";
import { useEffect, useState } from "react";

const GroupContentModal = () => {
  const { groupItemId } = useParams();

  const deleteItemHandler = useContextSelector(GroupContentAPI, (v) => v?.deleteItemHandler);
  const addValueHandler = useContextSelector(GroupContentAPI, (v) => v?.addValueHandler);
  const removeValueHandler = useContextSelector(GroupContentAPI, (v) => v?.removeValueHandler);
  const addCustomValueHandler = useContextSelector(GroupContentAPI, (v) => v?.addCustomValueHandler);
  const customValue = useContextSelector(GroupContentAPI, (v) => v?.customValue);
  const setCustomValue = useContextSelector(GroupContentAPI, (v) => v?.setCustomValue);
  const isItemUrlCorrect = useContextSelector(GroupContentAPI, (v) => v?.isItemUrlCorrect);
  const itemName = useContextSelector(GroupContentAPI, (v) => v?.itemName);
  const itemValue = useContextSelector(GroupContentAPI, (v) => v?.itemValue);

  return (
    <>
      {" "}
      {isItemUrlCorrect ? (
        <>
          <h1>GroupContentModal page is correct</h1>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "1.5rem" }}>
            <h3>Edit {itemName}</h3>
            <h3>Value: {itemValue}</h3>
            <br />
            <div style={{ display: "flex" }}>
              <h4>Delete Item:</h4>
              <Button variant="contained" onClick={deleteItemHandler}>
                Del
              </Button>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <h4>add 1: </h4>
              <Button variant="contained" onClick={addValueHandler}>
                add
              </Button>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <h4>remove 1</h4>
              <Button onClick={removeValueHandler} variant="contained">
                remove
              </Button>
            </div>
            <br />
            <TextField
              placeholder="type in value to add"
              value={customValue}
              onChange={(e) => setCustomValue?.(+e.target.value)}
            />
            <Button variant={"contained"} onClick={addCustomValueHandler}>
              Add
            </Button>
          </div>
        </>
      ) : (
        <h2>Page not found</h2>
      )}{" "}
    </>
  );
};

export default GroupContentModal;
