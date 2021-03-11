import React from "react";
import { DisplayImages, FileUpload } from "./components/";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <FileUpload />
      <DisplayImages />
    </div>
  );
};

export default App;
