import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// components
import LogIn from "./views/LogIn";
import GroupMenu from "./views/GroupMenu/GroupMenu.tsx";
import GroupContent from "./views/GroupContent/GroupContent.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Dashboard from "./views/Dashboard.tsx";
import AddGroupModal from "./views/GroupMenu/AddGroupModal.tsx";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./views/Register.tsx";
import GroupContentModal from "./views/GroupContent/GroupContentModal.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#053737",
      dark: "#032323",
      light: "#b4c3c3",
    },
    secondary: {
      main: "#4eebde",
      light: "#caf9f5",
      dark: "#35e2d1",
    },
    background: {
      default: "#cfefef",
    },
    warning: {
      main: "#ff4444",
      light: "#ffc7c7",
      dark: "#ff2d2d",
    },
  },
  typography: {
    fontFamily: " Open Sans, sans-serif",
  },
});

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/sign-in",
          element: <LogIn />,
        },
        {
          path: "/sign-up",
          element: <Register />,
        },
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            {
              path: "/",
              element: <GroupMenu />,
              children: [
                {
                  path: "/add-group",
                  element: <AddGroupModal />,
                },
              ],
            },
            {
              path: "/:groupId",
              element: <GroupContent />,
              children: [
                {
                  path: "/:groupId/:groupItemId",
                  element: <GroupContentModal />,
                },
              ],
            },

            {
              path: "/dashboard",
              element: <Dashboard />,
            },
          ],
        },
      ],
    },
  ],
  { basename: "/thatswhy_items_counter/" }
);
const Main = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
