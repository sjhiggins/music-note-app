import React, { useContext, useState } from "react";
import { NoteContext } from "../../context/NoteContext";
import { ReactComponent as FacebookIcon } from "../../assets/facebook-f-logo.svg";
import { ReactComponent as GoogleIcon } from "../../assets/google-g-logo.svg";
function SignIn() {
  const { setAccountStatus } = useContext(NoteContext);

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCreateAccount = () => {
    setAccountStatus((prev) => ({
      ...prev,
      signingIn: false,
      creatingAccount: true,
    }));
  };
  const handleCancel = () => {
    setAccountStatus((prev) => ({
      ...prev,
      signingIn: false,
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
        <div className="flex flex-col mt-10 h-[500px] w-[350px] p-4 rounded-sm bg-gray-50">
          <h1 className="text-lg text-center py-4 opacity-70">Sign In</h1>
          <div className="flex flex-col my-4">
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
          <div className="flex justify-end">
            <button className="relative bottom-5 pr-3  text-sm text-primary-turqoise">
              Forgot Password?
            </button>
          </div>
          <button className="bg-primary-turqoise text-lg text-white py-1 my-3 rounded-sm w-72 mx-auto shadow-md">
            Sign In
          </button>
          <button
            className=" py-1 my-3 rounded-sm w-72 mx-auto opacity-80 text-sm"
            onClick={handleCreateAccount}
          >
            Don't have an account?
          </button>
          <div className="flex justify-center my-1">
            <div className="border-b-2 w-11 h-3"></div>
            <div className="mx-2 opacity-70 text-sm">or</div>
            <div className="border-b-2 h-3 w-11"></div>
          </div>
          <div className="flex justify-center m-6">
            <button className="bg-white rounded-full w-12 h-12 flex justify-center mx-3 facebook-shadow">
              <FacebookIcon
                width="20px"
                height="20px"
                fill="rgb(0, 151, 197)"
              />{" "}
            </button>
            <button className="bg-white rounded-full w-12 h-12 flex justify-center mx-3 google-shadow">
              <GoogleIcon width="20px" height="30px" fill="red" />{" "}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
