import { TextFieldVariants } from "@mui/material";
import firebase from "firebase/compat/app";
import { InputHTMLAttributes } from "react";

export type TContextAPI = TUseAuthReturn &
  TUseLogInReturn &
  TUseLogOutReturn &
  TUseGroupMenuReturn & {
    currentUser: firebase.User | null | undefined;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    currentUserId: string | null | undefined;
    handleUserGroups: () => void;
    handleLogIn: (e: React.FormEvent<HTMLFormElement>) => void;
    logInError: string;
  };

export type TSignInValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};
export type TLogInValues = {
  email: string;
  password: string;
};

export type TUseAuthReturn = {
  //   signup: (email: string, password: string) => void;
  //   currentUser: firebase.User | null;
  signUpValues: TSignInValues;
  SignUpInputConstructor: TSignUpInputConstructor;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  signUpError: string;
};

export type TUseLogInReturn = {
  //   signup: (email: string, password: string) => void;
  //   currentUser: firebase.User | null;
  SignInInputConstructor: TSignInInputConstructor;
  // handleLogIn: (e: React.FormEvent<HTMLFormElement>) => void;
  // logInError: string;
  logInValues: TLogInValues;
};

export type TUseGroupMenuReturn = {
  //   handlerNewGroupInput: () => void;
  newGroupName: string;
  setNewGroupName: React.Dispatch<React.SetStateAction<string>>;
  setIsShowGroupCreator: React.Dispatch<React.SetStateAction<boolean>>;
  isShowGroupCreator: boolean;
};

export type TUseLogOutReturn = {
  handleLogout: () => void;
  logOutError: string;
};

export type TSignUpInputConstructor = Array<
  InputHTMLAttributes<HTMLInputElement> & {
    typography: string;
    variant: TextFieldVariants;
    // error: boolean;
    // helperText: string | undefined;
  }
>;
export type TSignInInputConstructor = TSignUpInputConstructor;
