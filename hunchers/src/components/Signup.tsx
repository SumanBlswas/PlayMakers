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
    <div className="signUp pt-[15%] pb-[18%] ">
      <div className="flex flex-wrap flex-col place-items-center p-4 gap-3">
        <div className="flex flex-wrap flex-col gap-4  p-5 bg-white rounded-xl shadow-xl shadow-red">
          <input
            className="p-2 rounded-md border border-black text-center"
            placeholder="First Name"
            onChange={(event) => {
              setUser({ ...user, firstName: event.target.value });
            }}
          />
          <input
            className="p-2 rounded-md border border-black text-center"
            placeholder="Last Name"
            onChange={(event) => {
              setUser({ ...user, lastName: event.target.value });
            }}
          />
          <input
            className="p-2 rounded-md border border-black text-center"
            placeholder="Username"
            onChange={(event) => {
              setUser({ ...user, username: event.target.value });
            }}
          />
          <input
            className="p-2 rounded-md border border-black text-center"
            placeholder="Password"
            type="password"
            onChange={(event) => {
              setUser({ ...user, password: event.target.value });
            }}
          />
          <button
            className="rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
            onClick={signUp}
          >
            {" "}
            Sign Up
          </button>
        </div>
        <div className="p-4 pt-2 pb-2 bg-white rounded-xl ">
          Already Have An Account !
        </div>
      </div>
    </div>
  );
}

export default SignUp;
