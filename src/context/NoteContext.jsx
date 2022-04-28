import { createContext, useState } from "react";
import {
  doc,
  deleteDoc,
  addDoc,
  getDocs,
  collection,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  const [tracksData, setTracksData] = useState([]);
  const [accountStatus, setAccountStatus] = useState({
    signingIn: false,
    creatingAccount: false,
    postingTrack: false,
  });

  //Lift delete function to context to avoid error
  const auth = getAuth();
  let tempListOfTracks = [];

  //Function to fetch tracks
  const fetchTracks = async () => {
    try {
      // get reference
      const tracksRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "trackData"
      );
      // create query
      const q = query(tracksRef, orderBy("timeStamp"), limit(10));
      // execute query
      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        tempListOfTracks.unshift({ ...doc.data(), docRef: doc.id });
      });
      setTracksData(tempListOfTracks);
      console.log(tempListOfTracks);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete track
  const handleTrackDelete = async (docuRef) => {
    if (auth.currentUser) {
      console.log("docRef", docuRef);
      try {
        await deleteDoc(
          doc(db, "users", auth.currentUser.uid, "trackData", docuRef)
        );
        // // get reference
        // const tracksRef = collection(
        //   db,
        //   "users",
        //   auth.currentUser.uid,
        //   "trackData"
        // );
        // // create query
        // const q = query(tracksRef, orderBy("timeStamp"), limit(10));
        // // execute query
        // const querySnap = await getDocs(q);
        // querySnap.forEach((doc) => {
        //   tempListOfTracks.unshift({ ...doc.data(), docRef: doc.id });
        // });
        // console.log(tempListOfTracks);
        // setTracksData(tempListOfTracks);
        fetchTracks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function to add Track
  const handleTrackAdd = async (newNote) => {
    if (auth.currentUser) {
      try {
        // passing new note to firebase
        const docRef = await addDoc(
          collection(db, "users", auth.currentUser.uid, "trackData"),
          newNote
        );
        console.log("Note written with ID: ", docRef.id);
        // passing new note to context
        setTracksData((prev) => {
          return [newNote, ...prev];
        });
        fetchTracks();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const NoteContextObj = {
    isCreatingNote,
    setIsCreatingNote,
    setSelectedID,
    selectedID,
    accountStatus,
    setAccountStatus,
    tracksData,
    setTracksData,
    handleTrackDelete,
    handleTrackAdd,
    fetchTracks,
  };

  return (
    <NoteContext.Provider value={NoteContextObj}>
      {children}
    </NoteContext.Provider>
  );
};
