import { Button } from "@mui/material";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ContextProvider from "./store/ContextProvider";
function App() {
  return (
    <ContextProvider>
      <h1>Hello World!</h1>
      <Button variant="contained">Something</Button>
      <PrivateRoute>
        <Outlet />
      </PrivateRoute>
    </ContextProvider>
  );
}

export default App;
