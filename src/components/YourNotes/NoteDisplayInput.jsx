import React, { useState, useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { v4 as uuidv4 } from "uuid";

function NoteDisplayInput({ noteRef, setNoteComments, selectedID }) {
  const { handlePublishComment, waveformReference, tracksData, setTracksData } =
    useContext(NoteContext);

  // const cTimeStamp = 0;
  console.log(tracksData);
  const date = new Date();
  const [comment, setComment] = useState("");
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cTimeStamp = Math.round(waveformReference.current.getCurrentTime());
    const commentID = uuidv4();
    handlePublishComment(comment, noteRef, commentID, cTimeStamp, date);

    setComment("");
    setNoteComments((prev) => [
      ...prev,
      { cTimeStamp: cTimeStamp, comment: comment, id: commentID },
    ]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-y-2 ">
        <input
          className="h-10 border-4 w-full rounded-sm"
          type="text"
          placeholder="Write a comment"
          value={comment}
          onChange={handleCommentChange}
        />
        <button></button>
      </div>
    </form>
  );
}

export default NoteDisplayInput;
