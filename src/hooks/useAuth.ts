import { useState, useMemo } from "react";
import { TSignInValues, TUseAuthReturn, TSignUpInputConstructor } from "../types";
import { auth } from "../firebase/fbconfig";
import { ContextAPI } from "../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useNavigate } from "react-router-dom";

export const useAuth = (): TUseAuthReturn => {
  const setLoading = useContextSelector(ContextAPI, (v) => v?.setLoading);
  const navigate = useNavigate();
  const [signUpValues, setSignInValues] = useState<TSignInValues>({ email: "", password: "", passwordConfirm: "" });
  const [signUpError, setSignUpError] = useState<string>("");

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpValues.password !== signUpValues.passwordConfirm) {
      return setSignUpError("passwords do not match");
    }
    if (!/^[a-zA-Z\s].*@.*$/.test(signUpValues.email)) {
      return setSignUpError("email is not correct");
    }
    if (signUpValues.password === "") {
      return setSignUpError("password field can not be empty");
    } else {
      try {
        setSignUpError("");
        setLoading?.(true);
        await signup(signUpValues.email, signUpValues.password).then(() => navigate("/"));
      } catch (errors) {
        setSignUpError("Failed to create an account");
      }
      setLoading?.(false);
    }
  };

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
      },
    ],
    [signUpValues]
  );

  return { signUpValues, SignUpInputConstructor, handleRegister, signUpError };
};
