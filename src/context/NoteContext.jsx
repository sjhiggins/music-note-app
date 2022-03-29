import { createContext, useState } from "react";
import dummyData from "../dummyData/dummyData";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [notes, setNotes] = useState([...dummyData]);
  const [selectedID, setSelectedID] = useState("");
  const [accountStatus, setAccountStatus] = useState({
    signingIn: false,
    creatingAccount: false,
  });

  const NoteContextObj = {
    isCreatingNote,
    setIsCreatingNote,
    notes,
    setNotes,
    setSelectedID,
    selectedID,
    accountStatus,
    setAccountStatus,
  };

  return (
    <NoteContext.Provider value={NoteContextObj}>
      {children}
    </NoteContext.Provider>
  );
};
