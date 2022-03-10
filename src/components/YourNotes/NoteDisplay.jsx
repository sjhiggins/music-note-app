import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";

function NoteDisplay() {
  const [noteTitle, setNoteTitle] = useState("Write a note to get started!");
  const { selectedID, notes } = useContext(NoteContext);

  useEffect(() => {
    if (selectedID) {
      setNoteTitle(
        notes.map((note) => {
          if (note.id === selectedID) {
            return note.title;
          } else {
            return;
          }
        })
      );
    }
  }, [selectedID, notes]);

  return (
    <div className="py-3">
      <div className="p-4 bg-slate-200">
        <div className="font-medium tracking-wide opacity-90">{noteTitle}</div>
      </div>
      <div className="h-10 w-auto bg-slate-500"></div>
    </div>
  );
}

export default NoteDisplay;
