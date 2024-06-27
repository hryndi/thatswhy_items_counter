import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// components
import LogIn from "./components/LogIn.tsx";
import GroupMenu from "./views/GroupMenu/GroupMenu.tsx";
import GroupContent from "./views/GroupContent/GroupContent.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Dashboard from "./components/Dashboard.tsx";
import AddGroupModal from "./views/GroupMenu/AddGroupModal.tsx";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register.tsx";
import GroupContentModal from "./views/GroupContent/GroupContentModal.tsx";
import AddNewFieldModal from "./views/GroupContent/AddNewFieldModal.tsx";
import PrintContent from "./components/PrintContent.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#053737",
      dark: "#032323",
      light: "#b4c3c3",
    },
    secondary: {
      main: "#3becdd",
      // main: "#4eebde",
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
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "0.95rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h4: {
      fontSize: "1.9rem",
    },
  },

  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: { xs: "1.1rem", sm: "1.25rem" },
        },
      },
    },

    MuiOutlinedInput: {
      defaultProps: {
        sx: {
          fontSize: { xs: "1.1rem", sm: "1.25rem" },
        },
      },
    },
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
                {
                  path: "/:groupId/new-field",
                  element: <AddNewFieldModal />,
                },
                {
                  path: "/:groupId/print-content",
                  element: <PrintContent />,
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
