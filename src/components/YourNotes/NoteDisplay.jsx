import React, { useContext, useState, useEffect } from "react";
import Comment from "./Comment";
import { NoteContext } from "../../context/NoteContext";

function NoteDisplay() {
  const [noteTitle, setNoteTitle] = useState("Write a note to get started!");
  const [noteComments, setNoteComments] = useState([]);
  const { selectedID, tracksData } = useContext(NoteContext);

  // if selected id then title and comments are displayed
  useEffect(() => {
    if (selectedID) {
      setNoteTitle(
        tracksData.map((track) => {
          if (track.id === selectedID) {
            return track.title;
          } else {
            return null;
          }
        })
      );

      let currentComments = tracksData
        .map((track) => {
          if (track.id === selectedID) {
            return track.comments;
          } else {
            return null;
          }
        })
        .find((x) => x !== null);
      setNoteComments(currentComments);
    }
  }, [selectedID, tracksData]);

  return (
    <div className="py-3  border-l-2 ">
      <div className="p-4 bg-slate-200">
        <div className="font-medium tracking-wide opacity-90">{noteTitle}</div>
      </div>
      <div className="h-96 w-auto bg-slate-50 p-4">
        {/* <input type="text" width="max" height="max" /> */}
        {noteComments.map((comment) => (
          <Comment
            comment={comment.comment}
            timeStamp={comment.cTimeStamp}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteDisplay;
