import React, { useState, useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import noteTemplate from "./noteTemplate";
import { ReactComponent as TriangleIcon } from "../../assets/triangle-transparent-bg.svg";
import { ReactComponent as CrossIcon } from "../../assets/cross-transparent-bg.svg";

function NoteItemForm() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const { setNotes, setIsCreatingNote } = useContext(NoteContext);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // error handling
    if (e.target.value.length > 1) {
      setError("");
    }
  };

  const handleCreateNote = (event) => {
    event.preventDefault();
    //using enetered title with note data template
    let newNote = new noteTemplate(title);

    //error handling
    if (title.trim().length < 1) {
      setError("bg-red-200 placeholder-white");
      return;
    }
    // passing new note to context
    setNotes((prev) => {
      return [newNote, ...prev];
    });
    //unshowing note form
    setIsCreatingNote(false);
  };
  return (
    <>
      <div className="w-20 h-6 bg-primary-turqoise-500 rounded-t-lg text-white text-sm pt-0.5 text-center relative top-0.5">
        New Note
      </div>
      <div className="border-t-2 border-primary-turqoise z-10 px-2 py-4">
        <form className="h-32 flex ">
          <div className="flex flex-col flex-grow justify-between">
            <div className=" mr-1 flex justify-between">
              <TriangleIcon
                fill="#b1b1b1"
                width="22px"
                height="22px"
                className="mr-2 my-auto"
              />
              <input
                type="text"
                placeholder="Enter Song Title"
                className={`w-full h-7 rounded-sm p-1  ${error}`}
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="p-6 opacity-20 flex flex-grow ">
              <CrossIcon
                fill="#g1g1g1"
                width="25px"
                height="25px"
                className="m-auto hover:cursor-pointer hover:fill-slate-500"
              />
            </div>
            <div className="text-sm">
              <button
                className="text-primary-turqoise font-medium border-2 py-0.25 px-1 border-primary-turqoise rounded-md hover:text-white hover:bg-primary-turqoise"
                onClick={handleCreateNote}
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-28 h-28 bg-slate-100 flex flex-col my-auto">
            <div className="m-auto">
              <CrossIcon
                fill="#b1b1b1"
                width="25px"
                height="25px"
                className="m-auto hover:cursor-pointer hover:fill-slate-500"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NoteItemForm;
