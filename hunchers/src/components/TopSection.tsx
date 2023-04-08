import React from "react";
import logo from "../Media/hunchers_logo.png";
import { useNavigate } from "react-router-dom";

const TopSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end ">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="h-72 mr-[380px] cursor-pointer"
        src={logo}
        alt=""
      />
      <div>
        <h1 className="text-white text-2xl top-0 p-8">Streamers online</h1>
        <div className="flex justify-around">
          <img
            src="https://c8.alamy.com/comp/2E53T4N/illustration-of-a-female-avatar-a-girl-in-yellow-clothes-a-brunette-with-brown-eyes-3d-render-2E53T4N.jpg"
            alt=""
            className="h-[30px] rounded-full"
          />
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
            alt=""
            className="h-[30px] rounded-full"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNI3kQLeYMnpy05PhEiuzS1rtRmNVL7VKvwcE4ACmQSQT1rRmUO5mHLyjH-mGHq0ueUQY&usqp=CAU"
            alt=""
            className="h-[30px] rounded-full"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj6bWgNIwJN0dvsgnYIsGuExDL9FLUDIw0xuORZARex7NgC7SLacOgmEp8vp5ECNQzu2o&usqp=CAU"
            alt=""
            className="h-[30px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopSection;
