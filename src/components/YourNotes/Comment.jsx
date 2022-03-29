import React from "react";

function Comment({ comment, timeStamp }) {
  function secsToMins(time) {
    // Hours, minutes and seconds
    let hrs = Math.floor(time / 3600);
    let mins = Math.floor((time % 3600) / 60);
    let secs = Math.floor(time % 60);
    // Output like "1:01" or "4:03:59"
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  let finalTimeStamp = secsToMins(timeStamp);

  return (
    <div>
      <div className="font-thin text-sm mb-2">
        {comment} at {finalTimeStamp}
      </div>
    </div>
  );
}

export default Comment;

Comment.defaultProps = {
  comment: "Comment",
};
