import { useMemo, useState } from "react";

import { TSignInValues, TSignUpInputConstructor, TUseAuthReturn } from "../types";

export const useAuth = (): TUseAuthReturn => {
  const [signUpValues, setSignInValues] = useState<TSignInValues>({ email: "", password: "", passwordConfirm: "" });
  const [signUpError, setSignUpError] = useState<string>("");

  const SignUpInputConstructor: TSignUpInputConstructor = useMemo(
    () => [
      {
        typography: "Email",
        id: "outlined-basic",
        placeholder: "e.g. youremail@gmail.com",
        variant: "outlined",
        value: signUpValues.email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setSignInValues((prevVal) => {
            return { ...prevVal, email: e.target.value };
          }),
        type: "email",
      },
      {
        typography: "Password",
        id: "outlined-basic",
        placeholder: "e.g. qwerty123",
        variant: "outlined",
        value: signUpValues.password,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setSignInValues((prevVal) => {
            return { ...prevVal, password: e.target.value };
          }),
        type: "password",
      },
      {
        typography: "Confirm Password",
        id: "outlined-basic",
        placeholder: "e.g. qwerty123",
        variant: "outlined",
        value: signUpValues.passwordConfirm,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          setSignInValues((prevVal) => {
            return { ...prevVal, passwordConfirm: e.target.value };
          }),
        type: "password",
      },
    ],
    [signUpValues]
  );

  return { signUpValues, SignUpInputConstructor, signUpError, setSignUpError };
};
