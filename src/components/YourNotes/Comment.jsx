import React from "react";
import useSecsToMins from "../hooks/useSecsToMins";

function Comment({ comment, timeStamp }) {
  let finalTimeStamp = useSecsToMins(timeStamp);

  return (
    <div>
      <div className="font-thin text-sm mb-2 ">
        {comment} at {finalTimeStamp}
      </div>
    </div>
  );
}

export default Comment;

Comment.defaultProps = {
  comment: "Comment",
};
