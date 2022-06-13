import React, { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import NoteItemForm from "./NoteItemForm";
import { NoteContext } from "../../context/NoteContext";
import { getAuth } from "firebase/auth";

function NoteList() {
  const { isCreatingNote, tracksData, fetchTracks } = useContext(NoteContext);
  const auth = getAuth();

  // Fetch Tracks
  useEffect(() => {
    if (auth.currentUser) {
      fetchTracks();
    }
  }, []);

  // p-4 w-7/12 flex flex-col bg-white flex-grow ml-48 z-0
  return (
    <div className="p-4">
      {isCreatingNote && <NoteItemForm />}
      {tracksData.map((item) => {
        return (
          <NoteItem
            title={item.title}
            key={item.id}
            id={item.id}
            trackData={item}
            audioURL={item.audioURL}
          />
        );
      })}
    </div>
  );
}

export default NoteList;
