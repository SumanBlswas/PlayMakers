import React from "react";
import Red from "./Board-Components/Red";
import Blue from "./Board-Components/Blue";

const Board = () => {
  return (
    <div className="fixed top-[10%]">
      <Red />
      <Blue />
    </div>
  );
};

export default Board;
