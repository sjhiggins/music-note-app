import { useContext } from "react";
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
        {/* {windowWidth > 1150 &&  */}
        <Categories />
        {/* } */}

        <Split
          className="flex flex-row splitClass bg-white flex-grow"
          sizes={[55, 45]}
          minSize={[400, 350]}
          gutterSize={4}
          snapOffset={0}
          dragInterval={1}
          direction="horizontal"
        >
          <NoteList />
          <NoteDisplay />
        </Split>
      </div>
    </div>
  );
}

export default YourNotes;
