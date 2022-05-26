import React, { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { ReactComponent as CrossIcon } from "../../assets/cross-transparent-bg.svg";

function Artwork() {
  const { windowWidth } = useContext(NoteContext);
  return (
    <>
      {windowWidth > 1120 && (
        <div className="w-28 h-28 bg-slate-100 flex flex-col my-auto ">
          <div className="m-auto bg-slate-400 ">
            <CrossIcon
              fill="#b1b1b1"
              width="25px"
              height="25px"
              className="m-auto hover:cursor-pointer hover:fill-slate-500"
            />
          </div>
        </div>
      )}
      {windowWidth <= 1120 && windowWidth > 1095 && (
        <div className="w-24 h-24 bg-slate-200 flex flex-col my-auto ">
          <div className="m-auto bg-slate-400 ">
            <CrossIcon
              fill="#b1b1b1"
              width="25px"
              height="25px"
              className="m-auto hover:cursor-pointer hover:fill-slate-500"
            />
          </div>
        </div>
      )}
      {windowWidth <= 1095 && windowWidth > 800 && (
        <div className="w-24 h-24 flex justify-end ">
          <div className=" bg-slate-400 w-8 h-8 flex flex-col">
            <CrossIcon
              fill="#b1b1b1"
              width="20px"
              height="20px"
              className="m-auto hover:cursor-pointer hover:fill-slate-500"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Artwork;
