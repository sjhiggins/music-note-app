import React, { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { AuthContext } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { ReactComponent as MessageIcon } from "../../assets/message-icon.svg";
import { ReactComponent as NotificationIcon } from "../../assets/notification-icon.svg";
import { Link } from "react-router-dom";
function Navbar() {
  const { setIsCreatingNote, setAccountStatus } = useContext(NoteContext);
  const { isLoggedIn, isCheckingLogStatus } = useContext(AuthContext);
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
        {isCheckingLogStatus && "checking log status"}
        <ul className="flex justify-end flex-grow font-Poppins ">
          <div className=" flex w-[500px] justify-evenly px-7">
            <Link to="/">
              <li className="px-4  bg-primary-turqoise-500  flex align-middle h-14">
                <button
                  onClick={handleCreateNote}
                  className="opacity-95 font-medium "
                >
                  Make a Note
                </button>
              </li>
            </Link>
            {!isLoggedIn ? (
              <div className="w-[250px] h-14 flex justify-around">
                <li className="p-4  flex align-middle text-sm">
                  <button onClick={handleCreateAccount}>Create Account</button>
                </li>

                <li className="p-4 flex align-middle text-sm hover:cursor-pointer">
                  <button onClick={handleSignIn}>Sign In</button>
                </li>
              </div>
            ) : (
              <div className="w-[275px] h-14 flex justify-center">
                {/* <li className="p-4 flex align-middle  hover:cursor-pointer">
                  <MessageIcon fill="rgb(230, 230, 230)" width="18px" />
                </li> */}

                <li className="pl-4 m-auto flex ">
                  <Link to="/profile">
                    <ProfileDropdown />
                  </Link>
                </li>
                <li className=" m-auto flex align-middle  hover:cursor-pointer">
                  <NotificationIcon fill="rgb(230, 230, 230)" width="17px" />
                </li>
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
