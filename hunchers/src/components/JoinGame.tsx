import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import CustomInput from "./CustomInput";
import Board from "../pages/Board";
import { useAppDispatch } from "../redux/store";
import { CreateRoom, JoinRoom } from "../redux/boardRedux/boardAction";
import "./Joingame.css"

export default function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState<string>("");
  const [userID, SetUserID] = useState<string>("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState<any>(null);
  const dispatch = useAppDispatch();

  const joinChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }
    console.log("join", response)
    const newChannel = await client.channel("messaging", {
      members: [client.userID as string, response.users[0].id as string],
    });

    await newChannel.watch();
    setChannel(newChannel);
    dispatch(JoinRoom(userID));
  };

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    dispatch(CreateRoom(String(client.userID)));

    const newChannel = await client.channel("messaging", {
      members: [client.userID as string, response.users[0].id as string],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Board />
        </Channel>
      ) : (
        <>
          <div className="img_div">         
            
            <img width="12%" src="hunchers_logo.png" alt=""  />
          </div>

          <div className="joinGame">

            <h4 className="creatGame_heading">Create Game</h4>
            <input
              placeholder="Username of rival..."
              onChange={(event) => {
                setRivalUsername(event.target.value);
              }}
            />
            <input
              placeholder="RoomId of Rival.."
              onChange={(event) => {
                SetUserID(event.target.value);
              }}
            />
            <div className="button_div">
            <button className="joinGame_Button" onClick={createChannel}> Create Game</button>
            <button className="joinGame_Button"  onClick={joinChannel} >{" "}Join Game</button>
            </div>           
          </div>
          <div className="bottom_imgdiv">
          <img width="15%" src="https://media-public.canva.com/MADoheTQTsg/1/thumbnail.png" alt="" />
          </div>
        </>
      )}
    </>
  );
}
