import React, { useContext } from "react";
import SignUp from "../components/LogIn/SignUp";
import SignIn from "../components/LogIn/SignIn";
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
