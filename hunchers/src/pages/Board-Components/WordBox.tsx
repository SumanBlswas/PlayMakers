import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useChannelStateContext } from "stream-chat-react";
// import { CreateRoom, JoinRoom } from "../../redux/boardRedux/boardAction";
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
  const controls = useAnimation();
  let arr = useAppSelector((state) => state.boardReducer.words);
  const [words, setWords] = useState(arr);

  const [hideClue, setHideClue] = useState(true);
  const [def, setDef] = useState("");
  const [current, setCurrent] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<"player1" | "player2">(
    "player1"
  );
  const [currentClue, setCurrentClue] = useState<string>("");
  const [player1score,setplayer1score]=useState<Number>(0)
  const [player2score,setplayer2score]=useState<Number>(0)

  const [count,setCount]=useState(0)

  const ChooseSquare = async (
    word: string,
    index: number,
    definition: string
  ) => {
    if (currentTurn === "player1") {
      await channel.sendEvent({
        type: "game-move" as EventTypes,
        data: { word, index, definition },
      });
      setCurrentTurn("player2");
    }
    if(count<2){
      setCount(count+1)
    }else{
      setCount(0)
    }
    if(count==2){
      setCurrentTurn("player2");
    }else{
      setCurrentTurn("player1");
    }
  };

  useEffect(() => {
    controls.start("animate");
    words.map((item: { word: string, definition: string, completed: boolean }) => {
      return item["completed"] = false
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gridItems = arr?.map(
    (item: { word: string; definition: string, completed: boolean }, index: number) => (
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
            setSelectedWord(item.word)
            setCurrent(index)
            setDef(item.definition);
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
        </div>
      </motion.div>
    )
  );

  channel.on(
    (event: {
      type: string;
      data?: { Word: string; index: number; definition: string };
    }) => {
      if (event.type === ("game-move" as EventTypes)) {
        if (event.data) {
          // let count = 0;
          const { Word, index, definition } = event?.data;
          // let updatedWords = [...words];
          // if (hideClue) {
          //   console.log("event", event.data);
          //   console.log("hideclue", hideClue);
          //   setHideClue(false);
          // }
          // if (selectedWord === Word) {
          //   updatedWords[index].completed = true
          // }
          setDef(definition);
          // setWords(updatedWords);
          // setCurrent(index)
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
        <div className="text-black bg-white p-6 rounded-md  w-[500px] flex justify-center items-center">
          <h3>{def}</h3>
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
