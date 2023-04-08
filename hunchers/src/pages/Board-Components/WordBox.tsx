import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { CreateRoom, JoinRoom } from "../../redux/boardRedux/boardAction";
import { EventTypes } from "stream-chat";
import { GET_WORDS } from "../../redux/boardRedux/boardTypes";
const WordBox = () => {
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();
  const [selectedWord, setSelectedWord] = useState<string>("");
  const dispatch = useAppDispatch()
  const controls = useAnimation();
  let arr = useAppSelector((state) => state.boardReducer.words);

  const [current, setCurrent] = useState<number | null>(null);

  const ChooseSquare = async (word: string, index: number) => {
    setCurrent(index);
    setSelectedWord(word);
    await channel.sendEvent({
      type: "game-move" as EventTypes,
      data: { selectedWord, index },
    })
  }
  useEffect(() => {
    controls.start("animate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const gridItems = arr?.map((item: { word: string }, index: number) => (
    <motion.div
      key={index}
      initial={{ y: -1000 }}
      animate={{ y: 0, transition: { delay: index * 0.1 } }}
      className={`h-24 w-36 rounded-md place-items-center bg-[#f4d8b5] grid-row-${Math.floor(index / 4) + 1
        } grid-column-${(index % 4) + 1} flex justify-center`}
    >
      <div
        className={`border-2 rounded-md p-2 border-[#b19578] w-[90%] h-[90%] flex flex-col justify-center text-center ${index === current ? "bg-red-500" : "none"
          }`}
        onClick={() => {
          ChooseSquare(item.word, index)
        }}
      >
        <div className="flex flex-row-reverse place-items-end mb-2 justify-between">
          <img
            className="w-[40%]"
            src="https://cdn.codenames.game/v20210210/theme/classic/card/black-back.png"
            alt="detective"
          />
          <div className="w-[50%] border-b-2 border-[#b19578] "></div>
        </div>
        <p className="bg-white w-[100%]">{item.word}</p>
      </div>
    </motion.div>
  ));

  channel.on((event) => {
    console.log(event.user?.id, client.userID);
    if (event.type === "game-move" as EventTypes) {
      let x = arr.map((item: { word: string }) => {
        return (item.word === selectedWord) ? item.word = "Varun" : item
      })
      dispatch({ type: GET_WORDS, payload: x })
    }
  });
  return (
    <div className="grid fixed grid-cols-4 gap-x-5 gap-y-5 left-[30%] top-[12%] ">
      {gridItems}
    </div>
  );
};

export default WordBox;

// channel.on((event) => {
//     if (event.type == "game-move" && event.user.id !== client.userID) {
//       const currentPlayer = event.data.player === "X" ? "O" : "X";
//       setPlayer(currentPlayer);
//       setTurn(currentPlayer);
//       setBoard(
//         board.map((val, idx) => {
//           if (idx === event.data.square && val === "") {
//             return event.data.player;
//           }
//           return val;
//         })
//       );
//     }
//   });