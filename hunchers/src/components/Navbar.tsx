import React from "react";
import { FaUser } from "react-icons/fa";
import { BsStopwatchFill, BsEmojiHeartEyesFill } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="flex justify-between">
      <div className="p-3 pt-2 flex gap-3 place-items-center">
        <button className="bg-yellow-300 rounded-2xl">
          <div className="flex place-items-center gap-4 text-xl p-2 pr-4 pl-4">
            <p>Players</p>
            <FaUser />
          </div>
        </button>
        <button className="p-3 pt-2 bg-yellow-300 rounded-2xl flex place-items-center text-xl">
          <BsStopwatchFill />
        </button>
      </div>
      <div className="flex gap-3 place-items-center p-3 pt-2">
        <button className="bg-yellow-300 rounded-2xl text-xl p-2 pr-4 pl-4">
          Rules
        </button>
        <button className="flex gap-2 place-items-center bg-[#DBD4AF] rounded-2xl text-xl p-2 pr-4 pl-4">
          <div>Hiru</div>
          <BsEmojiHeartEyesFill />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
