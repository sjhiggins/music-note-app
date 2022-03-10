import React, { useContext } from "react";
import NoteItem from "./NoteItem";
import NoteItemForm from "./NoteItemForm";
import { NoteContext } from "../../context/NoteContext";

function NoteList() {
  const { isCreatingNote, notes } = useContext(NoteContext);

  return (
    <div className="p-4">
      {isCreatingNote && <NoteItemForm />}
      {notes.map((item) => {
        return <NoteItem title={item.title} key={item.id} id={item.id} />;
      })}
    </div>
  );
}

export default NoteList;
