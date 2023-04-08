import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
// import Game from "./Game";
import CustomInput from "./CustomInput";
import Board from "../pages/Board";
export default function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });
    /*{ name: { $eq: rivalUsername } }*/
    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    console.log(response);

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          {/* <h1 channel={channel} setChannel={setChannel} /> */}
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
          <button onClick={createChannel}> Join/Start Game</button>
        </div>
      )}
          
    </>
  );
}
