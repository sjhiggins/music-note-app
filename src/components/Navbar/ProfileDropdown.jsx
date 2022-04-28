import React from "react";
import { getAuth } from "firebase/auth";
import { ReactComponent as ProfileIcon } from "../../assets/profile-icon.svg";
import { ReactComponent as ProfilePointer } from "../../assets/profile-pointer-icon.svg";

function ProfileDropdown() {
  const auth = getAuth();

  return (
    <div className="text-center flex w-fit">
      <div className=" m-auto text-center">{auth.currentUser.displayName}</div>{" "}
      <div className=" ml-2 rounded-full bg-gray-300 w-7 h-7 flex justify-center ">
        <ProfileIcon fill="white" width="13px" />
      </div>
      <div className="ml-2 flex text-center">
        <ProfilePointer width="10px" fill="white" />
      </div>
    </div>
  );
}

export default ProfileDropdown;
