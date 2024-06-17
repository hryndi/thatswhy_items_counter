import { FormControl, Button, TextField, Typography, Alert } from "@mui/material";
import { useContextSelector } from "use-context-selector";
import { ContextAPI } from "../store/ContextProvider";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const SignInInputConstructor = useContextSelector(ContextAPI, (v) => v?.SignInInputConstructor);
  const loading = useContextSelector(ContextAPI, (v) => v?.loading);
  const currentUser = useContextSelector(ContextAPI, (v) => v?.currentUser);
  const handleLogIn = useContextSelector(ContextAPI, (v) => v?.handleLogIn);
  const logInError = useContextSelector(ContextAPI, (v) => v?.logInError);
  return (
    <>
      <h1>Log In page</h1>
      <form
        onSubmit={(e) => {
          handleLogIn?.(e);
        }}
      >
        {currentUser?.email}
        {logInError && <Alert severity="error">{logInError}</Alert>}
        {SignInInputConstructor?.map((item) => (
          <>
            <Typography>{item.typography}</Typography>
            <TextField
              id={item.id}
              placeholder={item.placeholder}
              variant={item.variant}
              value={item.value}
              onChange={item.onChange}
              //   helperText={item.helperText}
              //   error={item.error}
            />
          </>
        ))}
        <Button variant="contained" type="submit" disabled={loading}>
          Log In
        </Button>
        <Typography>
          Need an account? <Link to={"/sign-up"}>Sign Up</Link>
        </Typography>

        {/* <Typography>Password</Typography>
        <TextField></TextField>
        <Typography>Confirm The Password</Typography>
        <TextField></TextField> */}
      </form>
    </>
  );
};
export default LogIn;
