import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import Button from "../components/UI/Button";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    username: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const username = formData.username;

  const navigate = useNavigate();
  const handleLogOut = () => {
    auth.signOut();
    navigate("/");
  };
  const toggleNameChange = () => {
    setChangeDetails((prev) => !prev);
    handleSubmit();
  };
  const handleUsernameChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleTest = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userRef);

    console.log(docSnap.data());
  };

  // changing and updating info for account
  const handleSubmit = async () => {
    try {
      if (auth.currentUser.username !== username) {
        await updateProfile(auth.currentUser, {
          username: username,
          displayName: username,
        });
        //update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          username: username,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-14 flex justify-between h-screen bg-gray-300">
      <div className="bg-white mx-auto w-[800px]  flex flex-col p-6">
        <div className="flex justify-between m-8">
          <h1>Hello {username}</h1>
          <Button className="h-6" onClick={handleLogOut} type="solid">
            Log Out
          </Button>
          <Button className="h-6" onClick={handleTest} type="solid">
            Test Database
          </Button>
        </div>
        <div className="flex justify-between">
          <form onSubmit={handleSubmit}>
            <input
              className="border-2 w-60 h-8 m-8"
              type="text"
              id="username"
              value={username}
              disabled={!changeDetails}
              onChange={handleUsernameChange}
            ></input>
          </form>
          <p
            className="m-8 bg-slate-200 hover:cursor-pointer"
            onClick={toggleNameChange}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
