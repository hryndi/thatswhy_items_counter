import { useState, useMemo } from "react";
import { TLogInValues, TUseLogInReturn, TSignInInputConstructor } from "../types";
import { auth } from "../firebase/fbconfig";
import { ContextAPI } from "../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useNavigate } from "react-router-dom";

export const useLogIn = (): TUseLogInReturn => {
  const navigate = useNavigate();
  const setLoading = useContextSelector(ContextAPI, (v) => v?.setLoading);
  const currentUser = useContextSelector(ContextAPI, (v) => v?.currentUser);
  const [logInValues, setLogInValues] = useState<TLogInValues>({ email: "", password: "" });

  const SignInInputConstructor: TSignInInputConstructor = useMemo(
    () => [
      {
        typography: "Email",
        id: "outlined-basic",
        placeholder: "e.g. youremail@gmail.com",
        variant: "outlined",
        value: logInValues.email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setLogInValues((prevVal) => {
            return { ...prevVal, email: e.target.value };
          }),
      },
      {
        typography: "Password",
        id: "outlined-basic",
        placeholder: "e.g. qwerty123",
        variant: "outlined",
        value: logInValues.password,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setLogInValues((prevVal) => {
            return { ...prevVal, password: e.target.value };
          }),
      },
    ],
    [logInValues]
  );

  return { logInValues, SignInInputConstructor };
};
