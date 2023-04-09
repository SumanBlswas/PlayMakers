import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useChannelStateContext } from "stream-chat-react";
import { EventTypes } from "stream-chat";
import { GET_WORDS } from "../../redux/boardRedux/boardTypes";

interface GameMoveEventData {
  selectedWord: string;
  index: number;
}

const WordBox = () => {
  const { channel } = useChannelStateContext();
  // const { client } = useChatContext();
  const [selectedWord, setSelectedWord] = useState<string>("");
  const dispatch = useAppDispatch();
  const controls = useAnimation();
  let arr = useAppSelector((state) => state.boardReducer.words);
  const [words, setWords] = useState(arr);
  console.log("members", channel?.data?.member_count);
  console.log(arr);
  const [hideClue, setHideClue] = useState(false);
  // const [def, setDef] = useState("")
  const [current, setCurrent] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<"player1" | "player2">(
    "player1"
  );
  const [currentClue, setCurrentClue] = useState<string>("");

  const ChooseSquare = async (
    word: string,
    index: number,
    definition: string
  ) => {
    if (currentTurn === "player1") {
      await channel.sendEvent({
        type: "game-move" as EventTypes,
        data: { selectedWord: word, index },
      });
      setCurrentTurn("player2");
    }
  };

  useEffect(() => {
    controls.start("animate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const gridItems = arr?.map(
    (item: { word: string; definition: string }, index: number) => (
      <motion.div
        key={index}
        initial={{ y: -1000 }}
        animate={{ y: 0, transition: { delay: index * 0.1 } }}
        className={`h-24 w-36 rounded-md place-items-center bg-[#f4d8b5] grid-row-${
          Math.floor(index / 4) + 1
        } grid-column-${(index % 4) + 1} flex justify-center`}
      >
        <div
          className={`border-2 rounded-md p-2 border-[#b19578] w-[90%] h-[90%] flex flex-col justify-center text-center ${
            index === current ? "bg-red-500" : "none"
          }`}
          onClick={() => {
            // setDef(item.definition)
            ChooseSquare(item.word, index, item.definition);
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
          {/* {hideClue ? <button onClick={() => {
          setHideClue(!hideClue)
        }}>Clue</button> : <p className="bg-white w-[100%]">{item.definition}</p>} */}
        </div>
      </motion.div>
    )
  );

  // channel.on((event) => {
  //   console.log(event.user?.id, client.userID);
  //   if (event.type === ("game-move" as EventTypes)) {
  //     let x = arr.map((item: { word: string }) => {
  //       return item.word === selectedWord ? (item.word = "Varun") : item;
  //     });
  //     dispatch({ type: GET_WORDS, payload: x });
  //   }
  // });

  // channel.on((event) => {
  //   if (event.type === ("game-move" as EventTypes)) {
  //     let x = arr.map((item: { word: string }, index: number) => {
  //       if (index === event.data.index) {
  //         item.word = "Varun";
  //       }
  //       return item;
  //     });
  //     dispatch({ type: GET_WORDS, payload: x });
  //   }
  // });

  // channel.on((event) => {
  //   if (event.type === ("game-move" as EventTypes)) {
  //     let x = arr.map((item: { word: string }, index: number) => {
  //       if (index === event.data.index) {
  //         item.word = "Varun";
  //       }
  //       return item;
  //     });
  //     dispatch({ type: GET_WORDS, payload: x });
  //   }
  // });

  // channel.on((event) => {
  //   if (event.type === ("game-move" as EventTypes)) {
  //     const eventData = event.data as GameMoveEventData;
  //     const { selectedWord, index } = eventData;
  //     let x = arr.map((item: { word: string }) => {
  //       return item.word === selectedWord ? { word: "Varun" } : item;
  //     });
  //     dispatch({ type: GET_WORDS, payload: x });
  //   }
  // });

  channel.on(
    (event: {
      type: string;
      data?: { selectedWord: string; index: number };
    }) => {
      if (event.type === ("game-move" as EventTypes)) {
        if (event.data) {
          // let count = 0;
          const { selectedWord, index } = event?.data;
          const updatedWords = [...words];
          // setDef(def)
          if (hideClue) {
            console.log(event.data);
            console.log(hideClue);
            setHideClue(false);
          }
          setWords(updatedWords);

          setCurrentTurn("player1");
        }
      }
    }
  );

  return (
    <div className="fixed left-[30%] top-[12%] ">
      <div className="grid  grid-cols-4 gap-x-5 gap-y-5 left-[30%] top-[12%] ">
        {gridItems}
      </div>
      {currentTurn === "player1" ? (
        <div>
          <input
            placeholder="Enter a clue..."
            onChange={(e) => setCurrentClue(e.target.value)}
          />
          {/* <select name="options" id="">
            {arr.map((item: { definition: string, word: string }) => {
              return <option value="">{item.definition}</option>
            })}

          </select> */}
          <button onClick={() => setCurrentTurn("player2")}>Submit Clue</button>
        </div>
      ) : (
        <div>
          <p>Opponent is guessing</p>
          {currentClue && <p>Clue: {currentClue}</p>}
        </div>
      )}
    </div>
  );
};

export default WordBox;
