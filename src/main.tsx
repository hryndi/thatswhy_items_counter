import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// components
import LogIn from "./views/LogIn";
import GroupMenu from "./views/GroupMenu";
import GroupContent from "./views/GroupContent";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Dashboard from "./views/Dashboard.tsx";
// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./views/Register.tsx";

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

const Main = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <App />,
        children: [
          // {
          //   path: "/",
          //   element: <PrivateRoute />,
          //   children: [
          {
            path: "/",
            element: <GroupMenu />,
          },
          {
            path: "/group-content",
            element: <GroupContent />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          // ],
          // },

          {
            path: "/sign-in",
            element: <LogIn />,
          },
          {
            path: "/sign-up",
            element: <Register />,
          },
        ],
      },
    ],
    { basename: "/thatswhy_items_counter/" }
  );

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
