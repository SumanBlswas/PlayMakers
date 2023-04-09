import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
// import Game from "./Game";
import CustomInput from "./CustomInput";
import Board from "../pages/Board";
import { useAppDispatch } from "../redux/store";
import { CreateRoom, JoinRoom } from "../redux/boardRedux/boardAction";

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
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <input
            placeholder="roomId of Room"
            onChange={(event) => {
              SetUserID(event.target.value);
            }}
          />
          <button onClick={createChannel}> Create Game</button>
          <button onClick={joinChannel} className="ml-10">
            {" "}
            Join Game
          </button>
        </div>
      )}
    </>
  );
}
