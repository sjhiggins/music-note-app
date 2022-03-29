import React, { useContext } from "react";
import SignUp from "../components/SignIn/SignUp";
import SignIn from "../components/SignIn/SignIn";
import { NoteContext } from "../context/NoteContext";

function LogIn() {
  const { accountStatus } = useContext(NoteContext);
  const { signingIn, creatingAccount } = accountStatus;

  return (
    <div>
      {signingIn && <SignIn />}
      {creatingAccount && <SignUp />}
    </div>
  );
}

export default LogIn;
