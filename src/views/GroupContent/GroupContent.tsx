import { Outlet, useNavigate, useParams } from "react-router-dom";
import { ContextAPI } from "../../store/ContextProvider";
import { useContextSelector } from "use-context-selector";

import { Box, Button, Card, CardActionArea, Grid, Stack, Typography } from "@mui/material";
import GroupContentProvider from "../../store/GroupContentProvider";
import { styled as styledMui } from "@mui/material/styles";

const SBox = styledMui(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: "1.5rem",
}));

const GroupContent = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const groupItemsData = useContextSelector(ContextAPI, (v) => v?.groupItemsData);
  const displayGroupItemsHandler = useContextSelector(ContextAPI, (v) => v?.displayGroupItemsHandler);
  const groupList = useContextSelector(ContextAPI, (v) => v?.groupList);
  const isGroupContentUrlCorrect = groupList?.find((group) => group.id === groupId);
  const currentUserId = useContextSelector(ContextAPI, (v) => v?.currentUserId);
  groupId && currentUserId && displayGroupItemsHandler?.(groupId, currentUserId);
  console.log(groupItemsData);

  const setCurrentPageName = useContextSelector(ContextAPI, (v) => v?.setCurrentPageName);

  return (
    <>
      <SBox>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          marginBottom={3}
          flexWrap={"wrap"}
          alignItems="center"
          gap={2}
        >
          <Button
            sx={{ width: "170px" }}
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate(`/`);
              setCurrentPageName?.("Menu");
            }}
          >
            Go back
          </Button>
          <Box
            display="flex"
            gap={2}
            sx={{
              "@media(max-width:530px)": {
                flexDirection: "column",
                alignItems: "flex-end",
              },
              "@media(max-width:403px)": {
                flexDirection: "column",
                alignItems: "baseline",
              },
            }}
          >
            <Button sx={{ width: "170px" }} variant="contained" onClick={() => navigate(`/${groupId}/new-field`)}>
              Add New Field
            </Button>
            <Button sx={{ width: "100px" }} variant="contained" onClick={() => navigate(`/${groupId}/print-content`)}>
              Print
            </Button>
          </Box>
        </Stack>
        <GroupContentProvider>
          {isGroupContentUrlCorrect ? (
            <>
              <Grid container spacing={2} overflow={"auto"}>
                {groupItemsData &&
                  Object.entries(groupItemsData).map(([label, value]) => (
                    //   <Link to={}>{`${label}: ${value}`}</Link>

                    <Grid item xs={12} id={label}>
                      <Card sx={{ display: "flex", width: "100%", height: 60 }}>
                        <CardActionArea
                          sx={{ display: "flex", justifyContent: "flex-start", gap: "0.8rem" }}
                          onClick={() => {
                            navigate(`/${groupId}/${label.toLowerCase().replace(/ /g, "-")}`);
                            // navigate(item.id);
                            // setCurrentGroup?.(item.name);
                          }}
                        >
                          <Box
                            height="100%"
                            width={60}
                            sx={{ backgroundColor: "#e5fdfc", display: "grid", placeContent: "center" }}
                          >
                            <Typography fontSize={28}>✅</Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              paddingInline: "1rem",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography sx={{ wordBreak: "break-all" }} variant="h6" component="div">
                              {label}
                            </Typography>
                            <Typography sx={{ width: "3rem" }} fontWeight={600} variant="h5" component="div">
                              {value}
                            </Typography>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
              <Outlet />
            </>
          ) : (
            <h2>Page not found</h2>
          )}
        </GroupContentProvider>
      </SBox>
    </>
  );
};
export default GroupContent;
