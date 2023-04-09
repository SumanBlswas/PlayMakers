import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

interface UserDetails {
  firstName?: string;
  lastName?: string;
  username?: string;
  password?: string;
}

function SignUp({ AuthToggle }: { AuthToggle: (value: Boolean) => void }) {
  const cookies = new Cookies();
  const [user, setUser] = useState<UserDetails | null>(null);

  const signUp = () => {
    Axios.post("https://ivory-donkey-suit.cyclic.app/signup", user).then(
      (res) => {
        const { token, userId, firstName, lastName, username, hashedPassword } =
          res.data;
        cookies.set("token", token);
        cookies.set("userId", userId);
        cookies.set("username", username);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("hashedPassword", hashedPassword);
        AuthToggle(true);
      }
    );
  };
  return (
    <div className="flex justify-end items-center">
      <div className="signUp grid w-[350px] bg-[#DBD4AF] gap-5 py-4 px-7 rounded-2xl mr-[390px]">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <input
          placeholder="First Name"
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value });
          }}
          className="rounded-lg p-3"
        />
        <input
          placeholder="Last Name"
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value });
          }}
          className="rounded-lg p-3"
        />
        <input
          placeholder="Username"
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
          className="rounded-lg p-3"
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
          className="rounded-lg p-3"
        />
        <button
          onClick={signUp}
          className="rounded-full text-xl p-2 w-[200px] tracking-wider bg-yellow-300 text-black font-semibold hover:bg-yellow-400  shadow-md shadow-black ml-[50px]"
        >
          Register
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

export default SignUp;
