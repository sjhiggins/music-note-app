import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import NoteDisplayInput from "./NoteDisplayInput";
import Comment from "./Comment";
import "../../CSS/NoteDisplay.css";

function NoteDisplay() {
  const [noteTitle, setNoteTitle] = useState("Write a note to get started!");
  const [noteComments, setNoteComments] = useState([]);
  const [noteRef, setNoteRef] = useState("");
  const { selectedID, tracksData, windowWidth } = useContext(NoteContext);
  const [paddingFix, setPaddingFix] = useState({ paddingRight: "86.4px" });

  // if selected id then title and comments are displayed
  useEffect(() => {
    if (selectedID) {
      setNoteTitle(
        tracksData.map((track) => {
          if (track.id === selectedID) {
            setNoteRef(track.docRef);
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

  // funciton to fix css depending on width of screen
  useEffect(() => {
    if (windowWidth <= 1150) {
      setPaddingFix({});
    }
    if (windowWidth > 1150) {
      setPaddingFix({ paddingRight: "86.4px" });
    }
  }, [windowWidth]);
  console.log(noteComments);
  return (
    <div
      // key={paddingFix}
      className="flex flex-col displayHeight fixed pt-3 border-l-2"
      style={paddingFix}
    >
      <div className="p-4 bg-slate-200 w-full">
        <div className=" font-medium opacity-90 h-6">{noteTitle}</div>
      </div>
      <div className=" bg-slate-50 p-4 h-full mb-10 overflow-auto scrollbar-hide ">
        {noteComments
          ? noteComments.map((comment) => (
              <Comment
                comment={comment.comment}
                timeStamp={comment.cTimeStamp}
                key={comment.id}
                id={comment.id}
                noteRef={noteRef}
                selectedID={selectedID}
                noteComments={noteComments}
                setNoteComments={setNoteComments}
              />
            ))
          : ""}
      </div>
      <div className="bg-gray-200 absolute bottom-0 w-full" style={paddingFix}>
        <NoteDisplayInput noteRef={noteRef} setNoteComments={setNoteComments} />
      </div>
    </div>
  );
}

export default NoteDisplay;
