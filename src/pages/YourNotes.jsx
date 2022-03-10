import Categories from "../components/YourNotes/Categories";
import NoteDisplay from "../components/YourNotes/NoteDisplay";
import NoteList from "../components/YourNotes/NoteList";

function YourNotes() {
  return (
    <div className=" mx-auto ">
      <div className="flex justify-between">
        <div className="w-56 h-screen bg-primary-light">
          <Categories />
        </div>
        <div className="bg-white flex-grow h-screen">
          <NoteList />
        </div>
        <div className="bg-white  h-screen w-1/3 border-x-2">
          <NoteDisplay />
        </div>
      </div>
    </div>
  );
}

export default YourNotes;
