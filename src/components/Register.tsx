import { Button, TextField, Typography, Alert, Box } from "@mui/material";
import { useContextSelector } from "use-context-selector";

import { AuthAPI } from "../store/AuthProvider";
import { Link } from "react-router-dom";
import { styled as styledMui } from "@mui/material/styles";

const SBox = styledMui(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: "1.5rem",
  "@media(max-height:700px)": {
    justifyContent: "space-evenly",
    overflow: "auto",
  },
}));
const ContentWrapp = styledMui(Box)(() => ({
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "1rem",
  gap: "1rem",
  padding: "1.8rem",
  boxShadow: "rgba(0, 0, 0, 0.3) 3px 5px 15px",

  // height: "100%",
  width: "100%",
  maxWidth: "500px",
}));

const SForm = styledMui("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  width: "100%",
}));
const STextField = styledMui(TextField)(() => ({
  width: "100%",
}));

const Register = () => {
  const SignUpInputConstructor = useContextSelector(AuthAPI, (v) => v?.SignUpInputConstructor);
  const handleRegister = useContextSelector(AuthAPI, (v) => v?.handleRegister);
  const loading = useContextSelector(AuthAPI, (v) => v?.loading);
  const signUpError = useContextSelector(AuthAPI, (v) => v?.signUpError);
  const currentUser = useContextSelector(AuthAPI, (v) => v?.currentUser);
  return (
    <>
      <SBox>
        <ContentWrapp>
          <Typography variant="h4" color={"#092526ee"} fontWeight={700}>
            Register
          </Typography>
          <SForm onSubmit={(e) => handleRegister?.(e)}>
            {currentUser && (
              <>
                <Alert>
                  <Typography variant="body1" fontWeight={500} display={"inline-block"}>
                    You are logged-in as:
                  </Typography>{" "}
                  {currentUser.email}
                  <br />
                  <div style={{ marginTop: "0.3rem" }}>
                    <Typography variant="body1" fontWeight={500} display={"inline-block"}>
                      Go to:
                    </Typography>{" "}
                    <Link to={"/"}> Homepage</Link>
                  </div>
                </Alert>
              </>
            )}
            {signUpError && <Alert severity="error">{signUpError}</Alert>}

            {SignUpInputConstructor?.map((item) => (
              <Box>
                <Typography variant="h6" color={"#092526ee"} fontWeight={600}>
                  {item.typography}
                </Typography>
                <STextField
                  id={item.id}
                  placeholder={item.placeholder}
                  variant={item.variant}
                  value={item.value}
                  onChange={item.onChange}
                  type={item.type}
                />
              </Box>
            ))}
            <Button variant="contained" type="submit" disabled={loading} style={{ marginTop: "0.5rem" }}>
              Sign up
            </Button>

            <Typography>
              Already have an account? <Link to={"/sign-in"}>Log In</Link>
            </Typography>
          </SForm>
        </ContentWrapp>
      </SBox>
    </>
  );
};
export default Register;
