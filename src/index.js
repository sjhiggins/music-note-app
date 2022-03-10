import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { NoteProvider } from "./context/NoteContext";

ReactDOM.render(
  <NoteProvider>
    <App />
  </NoteProvider>,
  document.getElementById("root")
);
