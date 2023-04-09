import React from "react";
import Red from "./Board-Components/Red";
import Blue from "./Board-Components/Blue";
import WordBox from "./Board-Components/WordBox";
import Navbar from "../components/Navbar";
const Board = () => {
  return (
    <div >
      <Navbar />
      <div className="fixed top-[10%] bg-gradient-to-b from-indigo-700 via-purple-600 to-purple-900">
        <Red />
        <Blue />
      </div>
      <WordBox />
    </div>
  );
};

export default Board;
