import React, { useContext, useState, useEffect } from "react";
import { NoteContext } from "../../context/NoteContext";
import UtilityBar from "./UtilityBar";
import { ReactComponent as TriangleIcon } from "../../assets/triangle-transparent-bg.svg";
import { ReactComponent as CrossIcon } from "../../assets/cross-transparent-bg.svg";
function NoteItem({ title, id }) {
  const { setSelectedID, selectedID } = useContext(NoteContext);
  const [textHighlight, setTextHighlight] = useState("");

  const handleNoteSelection = () => {
    setSelectedID(id);
  };

  useEffect(() => {
    if (selectedID === id) {
      // selected title color
      setTextHighlight("text-black");
    } else if (selectedID !== id) {
      // non selected title color
      setTextHighlight("text-gray-800");
    }
  }, [selectedID, id]);

  return (
    <div className="border-t-2 z-10 px-2 py-4 my-4 ">
      <div className="h-32 flex">
        <div className="flex flex-col flex-grow justify-between">
          <div className="mr-1 flex justify-between">
            <TriangleIcon
              fill="#00ADB5"
              width="22px"
              height="22px"
              className="mr-2 my-auto hover:cursor-pointer hover:fill-teal-600"
            />
            <div
              className={`w-full rounded-sm p-1 hover:cursor-pointer font-medium ${textHighlight}`}
              onClick={handleNoteSelection}
            >
              {title}
            </div>
          </div>
          <div className="p-6 opacity-20 flex flex-grow ">
            <CrossIcon
              fill="#g1g1g1"
              width="25px"
              height="25px"
              className="m-auto hover:cursor-pointer hover:fill-slate-500"
            />
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
      </div>
      <UtilityBar id={id} />
    </div>
  );
}

NoteItem.defaultProps = {
  title: "Title",
};

export default NoteItem;
