import { useContext } from "react";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import YourNotes from "./pages/YourNotes";
import { NoteContext } from "./context/NoteContext";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { accountStatus } = useContext(NoteContext);
  const { signingIn, creatingAccount } = accountStatus;

  console.log([signingIn, creatingAccount]);
  return (
    <div className="bg-primary-light overflow-x-clip">
      <Router>
        <Navbar />
        {(signingIn || creatingAccount) && <LogIn />}
        <Routes>
          <Route path="/" element={<YourNotes />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
