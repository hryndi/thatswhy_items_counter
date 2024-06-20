import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/fbconfig";
import { useEffect, useState } from "react";

const GroupContentModal = () => {
  const { groupId, groupItemId } = useParams();
  const [itemValue, setItemValue] = useState<number>(0);
  const groupItemsData = useContextSelector(ContextAPI, (v) => v?.groupItemsData);
  const groupList = useContextSelector(ContextAPI, (v) => v?.groupList);
  const currentGroup = useContextSelector(ContextAPI, (v) => v?.currentGroup);
  const itemName =
    groupItemsData && Object.keys(groupItemsData).find((item) => item.toLowerCase().replace(/ /g, "-") === groupItemId);

  //   groupItemsData &&
  //     groupItemId &&
  //     Object.entries(groupItemsData)?.map(
  //       ([label, value]: [label: string, value: number]) =>
  //         label.toLowerCase().replace(/ /g, "-") === groupItemId && setItemValue(value)
  //     );

  useEffect(() => {
    groupItemsData &&
      groupItemId &&
      Object.entries(groupItemsData).map(([label, value]) => {
        label.toLowerCase().replace(/ /g, "-") === groupItemId && setItemValue(value);
      });
  });

  const itemsUrls =
    groupItemsData &&
    Object.keys(groupItemsData).map((item) => typeof item === "string" && item.toLowerCase().replace(/ /g, "-"));
  const isItemUrlCorrect = itemsUrls?.find((url) => url === groupItemId);
  console.log(itemsUrls);

  const deleteItemHandler = async (currentGroup: string, document: string) => {
    const itemRef = groupId && doc(db, "user_groups", "KtfasWCr8sUUzkf1gE7P1ET0koZ2", "groups", currentGroup);

    itemRef && console.log("currGroup: ", currentGroup, "doc: ", document);
    try {
      itemRef &&
        (await updateDoc(itemRef, {
          [document]: deleteField(),
        }).then(() => console.log("success")));
    } catch (error) {
      console.log(error, "Delete action was not successful");
    }
  };
  const addValueHandler = async (currentGroup: string, document: string) => {
    let tempVal = itemValue;
    const itemRef = groupId && doc(db, "user_groups", "KtfasWCr8sUUzkf1gE7P1ET0koZ2", "groups", currentGroup);

    itemRef && console.log("currGroup: ", currentGroup, "doc: ", document);
    try {
      itemRef &&
        (await setDoc(
          itemRef,
          {
            [document]: tempVal + 1,
          },
          { merge: true }
        ).then(() => console.log("success")));
    } catch (error) {
      console.log(error, "Delete action was not successful");
    }
  };
  console.log(groupId);
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
              <h4>Delete</h4>
              <Button variant="contained" onClick={() => groupId && itemName && deleteItemHandler(groupId, itemName)}>
                Del
              </Button>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <h4>add 1: </h4>
              <Button variant="contained" onClick={() => groupId && itemName && addValueHandler(groupId, itemName)}>
                add
              </Button>
            </div>
            <br />
            <div style={{ display: "flex" }}>
              <h4>remove 1</h4>
              <Button variant="contained">remove</Button>
            </div>
          </div>
        </>
      ) : (
        <h2>Page not found</h2>
      )}{" "}
    </>
  );
};

export default GroupContentModal;
