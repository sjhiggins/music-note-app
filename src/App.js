import { useContext } from "react";
import Profile from "./pages/Profile";
import NotesPlaceholder from "./pages/NotesPlaceholder";
import LogIn from "./pages/LogIn";
import YourNotes from "./pages/YourNotes";
import PlaybackBar from "./pages/PlaybackBar";
import { NoteContext } from "./context/NoteContext";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { accountStatus, displayNotes } = useContext(NoteContext);
  const { signingIn, creatingAccount } = accountStatus;
  const { isCheckingLogStatus } = useContext(AuthContext);
  console.log(displayNotes);

  // yournotes page ontop so play can transfer between pages. hiding using css when displaynotes is false

  const hideYourNotes = !displayNotes ? { display: "none" } : {};

  return (
    <div className="bg-primary-light overflow-x-clip">
      <Router>
        <Navbar />
        {(signingIn || creatingAccount) && <LogIn />}
        {isCheckingLogStatus ? (
          <p>Checking Log Status</p>
        ) : (
          <>
            <div style={hideYourNotes}>
              <YourNotes />
            </div>
            <Routes>
              <Route path="notes" element={<NotesPlaceholder />}></Route>
              <Route path="profile" element={<Profile />}></Route>
            </Routes>
            <PlaybackBar />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
