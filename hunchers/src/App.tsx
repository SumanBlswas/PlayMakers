// import AllRoutes from "./AllRoutes/AllRoutes";
// import Footer from "./components/Footer";

// export default function App() {
//   return (
//     <>
//       <div className="bg-gradient-to-b from-[#0f0c29] via-[#6060d5] to-[#0f0c29] h-screen">
//         <AllRoutes />;
//       </div>
//       <Footer />
//     </>
//   );
// }

import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

function App() {
  const api_key = "dnkx7pvtvsqg";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState<Boolean>(false);

  const AuthToggle = (value: Boolean) => {
    setIsAuth(value);
  };

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then(() => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}> Log Out</button>
        </Chat>
      ) : (
        <>
          <SignUp AuthToggle={AuthToggle} />
          <Login AuthToggle={AuthToggle} />
        </>
      )}
    </div>
  );
}

export default App;
