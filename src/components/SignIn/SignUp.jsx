import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
function SignUp() {
  const { setAccountStatus } = useContext(NoteContext);

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleCancel = () => {
    setAccountStatus((prev) => ({
      ...prev,
      signingIn: false,
      creatingAccount: false,
    }));
  };
  const handleSignIn = () => {
    setAccountStatus((prev) => ({
      ...prev,
      signingIn: true,
      creatingAccount: false,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center ">
      <div
        onClick={handleCancel}
        className="bg-black h-screen w-screen opacity-40 absolute z-20"
      ></div>
      <div className="flex h-screen absolute z-20  ">
        <div className="flex flex-col  mt-10 h-[500px] w-[350px] p-4 rounded-sm bg-gray-50">
          <h1 className="text-lg text-center py-4 opacity-70">Sign Up</h1>
          <div className="flex flex-col my-4">
            <input
              className="m-3 px-7 border-b-2 p-1 username-SVG bg-gray-50"
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              className="m-3 px-7 border-b-2 p-1 email-SVG bg-gray-50"
              type="text"
              placeholder="Email"
              value={Email}
              onChange={handleEmailChange}
            />
            <input
              className="m-3 px-7 border-b-2 p-1 password-SVG bg-gray-50"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <button className="bg-primary-turqoise text-lg text-white py-1 my-3 rounded-sm w-72 mx-auto shadow-md">
            Sign Up
          </button>
          <div className="flex justify-center py-1 my-3 rounded-sm w-72 mx-auto  text-sm">
            <p className="opacity-80">Have a account?</p>
            <button
              className="text-primary-turqoise mx-1"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUp;
