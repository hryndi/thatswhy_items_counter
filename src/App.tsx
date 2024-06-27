import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ContextProvider from "./store/ContextProvider";
import { styled as styledMui } from "@mui/material";

const SBox = styledMui(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: "100svh",
  overflow: "auto",
}));

function App() {
  return (
    <SBox>
      <ContextProvider>
        <Outlet />
      </ContextProvider>
    </SBox>
  );
}

export default App;
