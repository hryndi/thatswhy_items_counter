import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { ContextAPI } from "../store/ContextProvider";
const Dashboard = () => {
  const navigate = useNavigate();
  const currentUser = useContextSelector(ContextAPI, (v) => v?.currentUser);
  const logout = useContextSelector(ContextAPI, (v) => v?.handleLogout);
  return (
    <>
      <Typography variant="h2" marginTop={5}>
        Profile
      </Typography>
      <Typography variant="h5" marginTop={3}>
        {" "}
        Email: {currentUser?.email}{" "}
      </Typography>

      <Button variant="contained" onClick={logout} sx={{ marginTop: 1.5 }}>
        Log Out
      </Button>
    </>
  );
};

export default Dashboard;
