import React from "react";

const Red = () => {
  return (
    <div className="bg-red-800 fixed p-5 rounded-2xl m-4">
      <div className="flex justify-between place-items-center gap-8">
        <img
          src="https://user-images.githubusercontent.com/112753516/230548196-3d76f2fe-9a15-43b7-8570-6484b3f11d18.png"
          alt="red"
        />
        <p className="text-white text-4xl font-bold">9</p>
      </div>
      <div className="text-white flex gap-5 flex-col pt-2">
        <div className="flex flex-col max-w-[65%] gap-3">
          <p>Operative(s)</p>
          <button className="bg-yellow-300 text-black p-1 pl-2 pr-2 rounded-xl hover:bg-yellow-400  shadow-md shadow-black">
            Join as Operative
          </button>
        </div>
        <div className="flex flex-col max-w-[65%] gap-3 ">
          <p>Spymaster(s)</p>
          <button className="bg-yellow-300 text-black p-1 pl-2 pr-2 rounded-xl hover:bg-yellow-400  shadow-md shadow-black">
            Join as Spymaster
          </button>
        </div>
      </div>
    </div>
  );
};

export default Red;
