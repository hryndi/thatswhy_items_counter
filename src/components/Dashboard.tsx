import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { AuthAPI } from "../store/AuthProvider";
import { ContextAPI } from "../store/ContextProvider";
const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = useContextSelector(AuthAPI, (v) => v?.currentUser);
  const logout = useContextSelector(AuthAPI, (v) => v?.handleLogout);
  const setCurrentPageName = useContextSelector(ContextAPI, (v) => v?.setCurrentPageName);
  setCurrentPageName?.("Dashboard");
  return (
    <>
      <Typography variant="h2" marginTop={5}>
        Profile
      </Typography>
      <Typography variant="h5" marginTop={3}>
        {" "}
        Email: {currentUser?.email}{" "}
      </Typography>
      <Box display={"flex"} gap={2}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
            setCurrentPageName?.("Menu");
          }}
          sx={{ marginTop: 1.5 }}
        >
          go to menu
        </Button>

        <Button onClick={logout} sx={{ marginTop: 1.5, fontWeight: 600, fontSize: "1.2rem" }}>
          Log Out
        </Button>
      </Box>
    </>
  );
};

export default Dashboard;
