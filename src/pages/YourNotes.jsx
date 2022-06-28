import { useContext } from "react";
import { NoteContext } from "../context/NoteContext";
import Categories from "../components/YourNotes/Categories";
import NoteDisplay from "../components/YourNotes/NoteDisplay";
import NoteList from "../components/YourNotes/NoteList";

function YourNotes() {
  const { windowWidth } = useContext(NoteContext);

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
        <div className="flex flex-row bg-white flex-grow overflow">
          <div className={` w-[54%]`}>
            <NoteList />
          </div>
          <div className={`w-[46%]`}>
            <NoteDisplay />
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourNotes;
