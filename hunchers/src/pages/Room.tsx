import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopSection from "../components/TopSection";

const Room = () => {
  const navigate = useNavigate();
  const [inputVal, setInputval] = useState("");

  return (
    <>
      <TopSection />

      <div className="flex justify-end items-center">
        <div className="w-[400px] bg-[#DBD4AF] grid gap-10 p-10 rounded-2xl justify-center items-center mr-[360px]">
          <h1 className="text-2xl font-bold">Welcome to Hunchers</h1>
          <p className="font-medium text-lg">
            To enter the room, choose a nickname.
          </p>
          <input
            required
            type="text"
            name=""
            id=""
            value={inputVal}
            className="rounded-lg py-3"
            onChange={(e) => setInputval(e.target.value)}
          />
          <div className="justify-center items-center">
            <button
              onClick={() => {
                if (inputVal) {
                  navigate("/board");
                } else {
                  alert("Please fill your nickname.");
                }
              }}
              className="rounded-full text-xl p-2 w-[200px] tracking-wider bg-yellow-300 text-black font-semibold hover:bg-yellow-400  shadow-md shadow-black"
            >
              Create Room
            </button>
          </div>
        </div>
        <img
          src="https://media-public.canva.com/MADoheTQTsg/1/thumbnail.png"
          alt=""
          className="pt-40"
        />
      </div>
    </>
  );
};

export default Room;
