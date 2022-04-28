import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { NoteProvider } from "./context/NoteContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <NoteProvider>
      <App />
    </NoteProvider>
  </AuthProvider>,
  document.getElementById("root")
);
