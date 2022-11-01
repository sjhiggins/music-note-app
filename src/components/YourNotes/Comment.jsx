import React from "react";
import { useState, useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import useSecsToMins from "../hooks/useSecsToMins";

function Comment({
  comment,
  timeStamp,
  id,
  noteRef,
  selectedID,
  noteComments,
  setNoteComments,
}) {
  let finalTimeStamp = useSecsToMins(timeStamp);
  const { handleCommentDelete } = useContext(NoteContext);
  const [deleteShow, setDeleteShow] = useState(false);

  const showDelete = () => {
    setDeleteShow(true);
  };
  const hideDelete = () => {
    setDeleteShow(false);
  };

  // selectredID included to force reload of comments/set selectedID = selectedID at end of function
  const deleteC = () => {
    handleCommentDelete(
      comment,
      id,
      noteRef,
      selectedID,
      { noteComments },
      setNoteComments
    );
  };

  return (
    <div
      className="flex justify-between"
      onMouseOver={showDelete}
      onMouseLeave={hideDelete}
    >
      <div className="font-thin text-sm mb-2 ">
        {comment} at {finalTimeStamp}
      </div>
      {deleteShow && (
        <button onClick={deleteC} className="text-gray-400">
          x
        </button>
      )}
    </div>
  );
}

export default Comment;

Comment.defaultProps = {
  comment: "Comment",
};
