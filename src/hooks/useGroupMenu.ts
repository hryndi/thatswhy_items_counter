import { TUseGroupMenuReturn } from "../types";

import { useState } from "react";

export const useGroupMenu = (): TUseGroupMenuReturn => {
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [isShowGroupCreator, setIsShowGroupCreator] = useState<boolean>(false);

  //   const [groups, setGroups] = useState < Array<object>([{}]);
  // const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);

  return {
    setNewGroupName,
    newGroupName,
    isShowGroupCreator,
    setIsShowGroupCreator,
  };
};
