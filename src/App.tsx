import { Box, Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ContextProvider from "./store/ContextProvider";
import { styled as styledMui } from "@mui/material";

const SBox = styledMui(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  height: "100svh",
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
