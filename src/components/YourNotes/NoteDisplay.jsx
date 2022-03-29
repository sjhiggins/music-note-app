import React, { useContext, useState, useEffect } from "react";
import Comment from "./Comment";
import { NoteContext } from "../../context/NoteContext";

function NoteDisplay() {
  const [noteTitle, setNoteTitle] = useState("Write a note to get started!");
  const [noteComments, setNoteComments] = useState([]);
  const { selectedID, notes } = useContext(NoteContext);

  // if selected id then title and comments are displayed
  useEffect(() => {
    if (selectedID) {
      setNoteTitle(
        notes.map((note) => {
          if (note.id === selectedID) {
            return note.title;
          } else {
            return null;
          }
        })
      );

      let currentComments = notes
        .map((note) => {
          if (note.id === selectedID) {
            return note.comments;
          } else {
            return null;
          }
        })
        .find((x) => x !== null);
      setNoteComments(currentComments);
    }
  }, [selectedID, notes]);

  return (
    <div className="py-3  border-l-2 ">
      <div className="p-4 bg-slate-200">
        <div className="font-medium tracking-wide opacity-90">{noteTitle}</div>
      </div>
      <div className="h-96 w-auto bg-slate-50 p-4">
        {noteComments.map((comment) => (
          <Comment
            comment={comment.comment}
            timeStamp={comment.timeStamp}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteDisplay;
