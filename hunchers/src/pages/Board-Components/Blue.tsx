import React from "react";

const Blue = () => {
  return (
    <div className="bg-[#3284a3]  fixed right-0 p-5 rounded-2xl m-4">
      <div className="flex justify-between place-items-center gap-8">
        <img
          src="https://user-images.githubusercontent.com/112753516/230549426-edff759b-78cf-4ea2-b87d-2de5300d55f0.png"
          alt="red"
        />
        <p className="text-white text-4xl font-bold">8</p>
      </div>
      <div className="text-white flex gap-5 flex-col pt-2">
        <div className="flex flex-col max-w-[65%] gap-3">
          <p>Operative(s)</p>
          <button className="bg-yellow-300 text-black p-1 pl-2 pr-2 rounded-xl hover:bg-yellow-400">
            Join as Operative
          </button>
        </div>
        <div className="flex flex-col max-w-[65%] gap-3 ">
          <p>Spymaster(s)</p>
          <button className="bg-yellow-300 text-black p-1 pl-2 pr-2 rounded-xl hover:bg-yellow-400">
            Join as Spymaster
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blue;
