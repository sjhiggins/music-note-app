import { useState, useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import Categories from "../components/YourNotes/Categories";
import NoteDisplay from "../components/YourNotes/NoteDisplay";
import NoteList from "../components/YourNotes/NoteList";
import Split from "react-split";

function YourNotes() {
  const { windowHeight, windowWidth } = useContext(NoteContext);

  return (
    <div className=" mx-auto pt-14">
      <div className="flex   ">
        {windowWidth > 1150 && (
          <div className="w-48">
            <div className="fixed ml-2">
              <Categories />
            </div>
          </div>
        )}
        {/* <Split
          className="flex flex-row splitClass bg-white flex-grow"
          sizes={[60, 40]}
          minSize={[400, 350]}
          gutterSize={4}
          snapOffset={0}
          dragInterval={1}
          direction="horizontal"
        >
          <NoteList />
          <NoteDisplay />
        </Split> */}

        <div className="flex flex-row bg-white flex-grow overflow">
          <div className={` w-[55%]`}>
            <NoteList />
          </div>
          <div className={`w-[45%]`}>
            {/* <div className="bg-black w-auto h-10"></div> */}
            <NoteDisplay />

            {/* <div className="fixed pt-3 border-x-2 widthInherit">
           
              <NoteDisplay />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourNotes;
