import { useState, useMemo } from "react";
import { TLogInValues, TUseLogInReturn, TSignInInputConstructor } from "../types";
import { auth } from "../firebase/fbconfig";
import { ContextAPI } from "../store/ContextProvider";
import { useContextSelector } from "use-context-selector";
import { useNavigate } from "react-router-dom";

export const useLogIn = (): TUseLogInReturn => {
  const navigate = useNavigate();
  const setLoading = useContextSelector(ContextAPI, (v) => v?.setLoading);
  const [logInValues, setLogInValues] = useState<TLogInValues>({ email: "", password: "" });
  const [logInError, setLogInError] = useState<string>("");

  const logIn = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password);
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^[a-zA-Z\s].*@.*$/.test(logInValues.email)) {
      return setLogInError("email is not correct");
    }
    if (logInValues.password === "") {
      return setLogInError("password field can not be empty");
    } else {
      try {
        setLogInError("");
        setLoading?.(true);
        await logIn(logInValues.email, logInValues.password);
        navigate("/");
      } catch (errors) {
        setLogInError("Failed to log-in in account");
      }
      setLoading?.(false);
    }
  };

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

  //   useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((user) => {
  //       setCurrentUser(user);
  //       setLoading(false);
  //     });

  //     return unsubscribe;
  //   }, []);

  return { logInValues, SignInInputConstructor, handleLogIn, logInError };
};
