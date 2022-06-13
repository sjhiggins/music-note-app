import React from "react";

function NoteDisplayInput() {
  return (
    <form>
      <div className="border-y-2 ">
        <input
          className="h-10 border-4 w-full rounded-sm"
          type="text"
          placeholder="Write a comment"
        />
        <button></button>
      </div>
    </form>
  );
}

export default NoteDisplayInput;
