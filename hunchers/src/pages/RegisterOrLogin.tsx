// import "./App.css";
import Login from "../components/Login";
import SignUp from "../components/Signup";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import JoinGame from "../components/JoinGame";
import TopSection from "../components/TopSection";
import Footer from "../components/Footer";

function Register() {
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

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#0f0c29] via-[#6060d5] to-[#0f0c29] h-screen">
        <TopSection />
        {isAuth ? (
          <Chat client={client}>
            <JoinGame />
            <button onClick={logOut}>Log Out</button>
          </Chat>
        ) : (
          <div className="grid justify-end items-center">
            <div className="tabs py-2 ml-[80px]">
              <button
                className={activeTab === 0 ? "active" : ""}
                onClick={() => handleTabClick(0)}
              >
                <h1 className="text-2xl font-bold text-center text-white">
                  Register/
                </h1>
              </button>
              <button
                className={activeTab === 1 ? "active" : ""}
                onClick={() => handleTabClick(1)}
              >
                <h1 className="text-2xl font-bold text-center text-white">
                  {" "}
                  Login
                </h1>
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 0 && <SignUp AuthToggle={AuthToggle} />}
              {activeTab === 1 && <Login AuthToggle={AuthToggle} />}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Register;
