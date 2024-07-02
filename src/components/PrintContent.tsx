import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ContextAPI } from "../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

const PrintContent = () => {
  const printComponentRef = useRef(null);
  const print = useReactToPrint({
    content: () => printComponentRef.current,
  });
  useEffect(() => print());

  const navigate = useNavigate();
  const { groupId } = useParams();

  const groupItemsData = useContextSelector(ContextAPI, (v) => v?.groupItemsData);

  return (
    <>
      <Box display={"none"}>
        <Box ref={printComponentRef}>
          <Grid container spacing={2} padding={2} overflow={"auto"}>
            {groupItemsData &&
              Object.entries(groupItemsData).map(([label, value]) => (
                <Grid item xs={12} id={label}>
                  <Card sx={{ display: "flex", width: "100%", height: 60 }}>
                    <CardActionArea
                      sx={{ display: "flex", justifyContent: "flex-start", gap: "0.8rem" }}
                      onClick={() => {
                        navigate(`/${groupId}/${label.toLowerCase().replace(/ /g, "-")}`);
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
        </Box>
      </Box>
    </>
  );
};

export default PrintContent;
