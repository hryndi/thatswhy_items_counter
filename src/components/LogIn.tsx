import { Button, TextField, Typography, Alert, Box, Stack } from "@mui/material";
import { useContextSelector } from "use-context-selector";
import { ContextAPI } from "../store/ContextProvider";
import { Link } from "react-router-dom";
import { styled as styledMui } from "@mui/material";

const SBox = styledMui(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  padding: "1.5rem",
}));
const ContentWrapp = styledMui(Box)(() => ({
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderRadius: "1rem",
  gap: "1.2rem",
  padding: "1.8rem",
  boxShadow: "rgba(0, 0, 0, 0.3) 3px 5px 15px",

  // height: "100%",
  width: "100%",
  maxWidth: "500px",
}));
const STextField = styledMui(TextField)(() => ({
  width: "100%",
}));
const SForm = styledMui("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.8rem",
  width: "100%",
}));
const LogIn = () => {
  // const navigate = useNavigate();
  const SignInInputConstructor = useContextSelector(ContextAPI, (v) => v?.SignInInputConstructor);
  const loading = useContextSelector(ContextAPI, (v) => v?.loading);
  const currentUser = useContextSelector(ContextAPI, (v) => v?.currentUser);
  const handleLogIn = useContextSelector(ContextAPI, (v) => v?.handleLogIn);
  const logInError = useContextSelector(ContextAPI, (v) => v?.logInError);
  return (
    <>
      <SBox>
        <ContentWrapp>
          <Typography variant="h4" fontWeight={700} color={"#092526ee"}>
            Log In
          </Typography>

          <SForm
            onSubmit={(e) => {
              handleLogIn?.(e);
            }}
          >
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
                    </Typography>
                    <Link to={"/"}> Homepage</Link>
                  </div>
                </Alert>
              </>
            )}
            {logInError && <Alert severity="error">{logInError}</Alert>}

            {SignInInputConstructor?.map((item) => (
              <Box>
                <Typography color={"#092526ee"} fontWeight={600} variant="h6">
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
              Log In
            </Button>
          </SForm>
          <Stack direction={"row"} justifyContent={"flex-start"} marginBlock={"0.5rem"} width={"100%"}>
            <Typography color={"#092526ee"}>
              Doesn't have an account yet? <Link to={"/sign-up"}>Register</Link>
            </Typography>
          </Stack>
        </ContentWrapp>
      </SBox>
    </>
  );
};
export default LogIn;
