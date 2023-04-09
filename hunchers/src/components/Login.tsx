import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({ AuthToggle }: { AuthToggle: (value: Boolean) => void }) {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");

  const cookies = new Cookies();
  const login = () => {
    Axios.post("https://ivory-donkey-suit.cyclic.app/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      AuthToggle(true);
    });
  };
  return (
    <div className="flex justify-end items-center">
      <div className="login grid w-[350px] bg-[#DBD4AF] gap-5 p-7 rounded-2xl mr-[390px]">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          className="rounded-lg p-3"
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          className="rounded-lg p-3"
        />
        <button
          onClick={login}
          className="rounded-full text-xl p-2 w-[200px] tracking-wider bg-yellow-300 text-black font-semibold hover:bg-yellow-400  shadow-md shadow-black ml-[50px]"
        >
          Login
        </button>
      </div>
      <img
        src="https://media-public.canva.com/MADoheTQTsg/1/thumbnail.png"
        alt=""
        className="pt-40"
      />
    </div>
  );
}

export default Login;
