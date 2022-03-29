import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import { Link } from "react-router-dom";

// import { ReactComponent as ProfileIcon } from "../assets/profile-icon.svg";
// import { ReactComponent as NotificationIcon } from "../assets/notification-icon.svg";
function Navbar() {
  const { setIsCreatingNote, setAccountStatus, accountStatus } =
    useContext(NoteContext);

  const handleSignIn = () => {
    setAccountStatus((prev) => ({
      ...prev,
      signingIn: true,
      creatingAccount: false,
    }));
  };
  const handleCreateAccount = () => {
    setAccountStatus((prev) => ({
      ...prev,
      signingIn: false,
      creatingAccount: true,
    }));
  };
  const handleCreateNote = () => {
    setIsCreatingNote(true);
  };

  return (
    <nav className="bg-primary-dark w-screen overflow-hidden fixed z-10">
      <div className=" m-auto justify-between flex h-14 text-white items-center">
        <div>
          <h1 className="p-4 mx-6 font-Poppins font-medium text-xl">
            <Link to="/">MusicNote</Link>
          </h1>
        </div>

        <ul className="flex justify-end flex-grow font-Poppins ">
          <div className=" flex w-[500px] justify-evenly px-7">
            <li className="px-4  bg-primary-turqoise-500  flex align-middle h-14">
              <button
                onClick={handleCreateNote}
                className="opacity-95 font-medium "
              >
                Make a Note
              </button>
            </li>

            <li className="p-4  flex align-middle text-sm">
              <button onClick={handleCreateAccount}>Create Account</button>
            </li>

            <li className="p-4 flex align-middle text-sm hover:cursor-pointer">
              <button onClick={handleSignIn}>Sign In</button>
            </li>
            {/* <li className="p-4 flex align-middle text-sm">
              <Link to="profile">Profile</Link>
            </li> */}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
