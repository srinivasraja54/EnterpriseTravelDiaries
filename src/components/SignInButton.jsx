import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";


export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <div>
    <Button onClick={() => handleLogin("popup")}>
    Sign In
  </Button>
  </div>
  );
};