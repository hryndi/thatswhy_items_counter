import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ContextProvider from "./store/ContextProvider";
function App() {
  return (
    <ContextProvider>
      <Outlet />
    </ContextProvider>
  );
}

export default App;
