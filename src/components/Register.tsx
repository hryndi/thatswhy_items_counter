import { FormControl, Button, TextField, Typography, Alert } from "@mui/material";
import { useContextSelector } from "use-context-selector";
import { ContextAPI } from "../store/ContextProvider";
import { Link } from "react-router-dom";
const Register = () => {
  const SignUpInputConstructor = useContextSelector(ContextAPI, (v) => v?.SignUpInputConstructor);
  const handleRegister = useContextSelector(ContextAPI, (v) => v?.handleRegister);
  const loading = useContextSelector(ContextAPI, (v) => v?.loading);
  const signUpError = useContextSelector(ContextAPI, (v) => v?.signUpError);
  const currentUser = useContextSelector(ContextAPI, (v) => v?.currentUser);
  return (
    <>
      <h1>Register page</h1>
      <form onSubmit={(e) => handleRegister?.(e)}>
        {currentUser?.email}
        {signUpError && <Alert severity="error">{signUpError}</Alert>}
        {SignUpInputConstructor?.map((item) => (
          <>
            <Typography>{item.typography}</Typography>
            <TextField
              id={item.id}
              placeholder={item.placeholder}
              variant={item.variant}
              value={item.value}
              onChange={item.onChange}
            />
          </>
        ))}
        <Button variant="contained" type="submit" disabled={loading}>
          Sign up
        </Button>

        <Typography>
          Already have an account? <Link to={"/sign-in"}>Log In</Link>
        </Typography>
      </form>
    </>
  );
};
export default Register;
