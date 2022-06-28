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
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import useWindowDimensions from "../components/hooks/useWindowDimensions";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const [tracksData, setTracksData] = useState([]);
  const [trackPlaying, setTrackPlaying] = useState({
    isPlaying: false,
    progress: null,
    duration: 0,
    title: "",
    id: "",
  });
  const [waveformReference, setWaveformReference] = useState(null);
  const [accountStatus, setAccountStatus] = useState({
    signingIn: false,
    creatingAccount: false,
    postingTrack: false,
  });
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

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

  const handlePublishComment = async (
    comment,
    trackRef,
    commentID,
    commentTime
  ) => {
    if (auth.currentUser) {
      try {
        const commentTrackRef = doc(
          db,
          "users",
          auth.currentUser.uid,
          "trackData",
          trackRef
        );
        await updateDoc(commentTrackRef, {
          comments: arrayUnion({
            cTimeStamp: commentTime,
            comment: comment,
            id: commentID,
          }),
        });
        console.log("done");
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
    windowHeight,
    windowWidth,
    handlePublishComment,
    trackPlaying,
    setTrackPlaying,
    waveformReference,
    setWaveformReference,
  };

  return (
    <NoteContext.Provider value={NoteContextObj}>
      {children}
    </NoteContext.Provider>
  );
};
