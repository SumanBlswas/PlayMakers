import React from "react";
import logo from "../Media/hunchers_logo.png";

const Footer = () => {
  return (
    <div className="bg-black text-gray-400 h-28 flex justify-around items-center">
      <img className="h-32" src={logo} alt="" />
      <p>Copyright © 2023 PlayMakers Games</p>
      <p>Hunchers</p>
    </div>
  );
};

export default Footer;
