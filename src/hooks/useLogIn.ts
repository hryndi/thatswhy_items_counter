import { useState, useMemo } from "react";
import { TLogInValues, TUseLogInReturn, TSignInInputConstructor } from "../types";

export const useLogIn = (): TUseLogInReturn => {
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
        type: "email",
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
        type: "password",
      },
    ],
    [logInValues]
  );

  return { logInValues, SignInInputConstructor };
};
