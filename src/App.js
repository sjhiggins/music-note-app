import { useContext } from "react";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import YourNotes from "./pages/YourNotes";
import PlaybackBar from "./pages/PlaybackBar";
import { NoteContext } from "./context/NoteContext";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { accountStatus } = useContext(NoteContext);
  const { signingIn, creatingAccount } = accountStatus;
  const { isCheckingLogStatus } = useContext(AuthContext);
  return (
    <div className="bg-primary-light overflow-x-clip">
      <Router>
        <Navbar />
        {(signingIn || creatingAccount) && <LogIn />}
        {isCheckingLogStatus ? (
          <p>Checking Log Status</p>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<YourNotes />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Routes>
            <PlaybackBar />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
