import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import YourNotes from "./pages/YourNotes";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-primary-light overflow-x-clip">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<YourNotes />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
