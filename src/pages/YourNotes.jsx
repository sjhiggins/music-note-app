import Categories from "../components/YourNotes/Categories";
import NoteDisplay from "../components/YourNotes/NoteDisplay";
import NoteList from "../components/YourNotes/NoteList";
import Split from "react-split";

function YourNotes() {
  return (
    <div className=" mx-auto pt-14">
      <div className="flex   ">
        <Categories />

        <Split
          className="flex flex-row splitClass bg-white flex-grow"
          sizes={[55, 45]}
          minSize={[400, 400]}
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
