import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useChannelStateContext } from "stream-chat-react";
import { EventTypes } from "stream-chat";
import { useAppSelector } from "../../redux/store";

const WordBox = () => {
  const { channel } = useChannelStateContext();
  const controls = useAnimation();
  const arr = useAppSelector((state) => state.boardReducer.words);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [words, setWords] = useState(arr);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [hideClue, setHideClue] = useState(true);
  const [def, setDef] = useState("");
  const [current, setCurrent] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<"player1" | "player2">(
    "player1"
  );

  // const [currentClue, setCurrentClue] = useState<string>("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [chosenIndexes, setChosenIndexes] = useState<number[]>([]);


  const ChooseSquare = async (
    word: string,
    index?: number,
    definition?: string
  ) => {
    if (currentTurn === "player1") {
      setSelectedWord(word);
      setCurrent(Number(index));
      setDef(String(definition));
      setChosenIndexes((prevIndexes) => [...prevIndexes, Number(index)]);
      await channel.sendEvent({
        type: "game-move" as EventTypes,
        data: { word, index, definition },
      });
      setCurrentTurn("player2");
    }
    
  };

  channel.on(
    (event: {
      type: string;
      data?: { word: string; index: number; definition: string };
    }) => {
      if (event.type === "game-move") {
        if (event.data) {
          const { word, index, definition } = event.data;
          setSelectedWord(word);
          setCurrent(index);
          setDef(definition);
          setHideClue(false);
          setCurrentTurn("player1");
          setChosenIndexes((prevIndexes) => [...prevIndexes, Number(index)]);
        }
      }
    }
  );

  const handleGuess = (index: number) => {
    if (chosenIndexes.includes(index)) {
      console.log("Correct guess!");
      if (currentTurn === "player1") {
        setPlayer2Score(player2Score + 1);
      } else {
        setPlayer1Score(player1Score + 1);
      }
    } else {
      console.log("Incorrect guess!");
    }
    setSelectedWord("");
    setCurrentTurn("player1");
    setChosenIndexes([]);
  };

  useEffect(() => {
    controls.start("animate");
    words.forEach(
      (item: { word: string; definition: string; completed: boolean }) => {
        item.completed = false;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gridItems = arr?.map(
    (
      item: { word: string; definition: string; completed: boolean },
      index: number
    ) => {
      const isCompleted = completedCards.includes(index);
      const isCurrent = index === current;
      const isSelectable = !isCompleted && currentTurn === "player1";
      const isSelected = item.word === selectedWord;
      const handleClick = () => {
        if (!isSelectable) return;
        setSelectedWord(item.word);
        setCurrent(index);
        setDef(item.definition);
        ChooseSquare(item.word, index, item.definition);
      };
      return (
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
              isCurrent ? "bg-red-500" : ""
            } ${isCompleted ? "opacity-50 cursor-not-allowed" : ""} ${
              isSelectable ? "cursor-pointer hover:bg-blue-300" : ""
            } ${isSelected ? "border-blue-500" : ""}`}
            onClick={handleClick}
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
      );
    }
  );

  return (
    <div className="fixed left-[30%] top-[12%] ">
      <div className="grid  grid-cols-4 gap-x-5 gap-y-5 left-[30%] top-[12%] ">
        {gridItems}
      </div>
      {currentTurn === "player1" ? (
        <div className="text-black bg-white p-6 rounded-md  w-[500px] flex justify-center items-center">
          {hideClue ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setHideClue(false)}
            >
              Show Clue
            </button>
          ) : (
            <div>
              <h3>{def}</h3>
              <div className="flex gap-x-5 mt-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setHideClue(true);
                    ChooseSquare(selectedWord, Number(current), def);
                    handleGuess(Number(current));
                  }}
                >
                  End Turn
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setHideClue(true);
                    ChooseSquare(selectedWord, Number(current), def);
                    setPlayer1Score(player1Score - 1);
                    setCurrentTurn("player2");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            {/* <div>Player 1 score: {player1Score}</div> */}
            <div>Oponent's score: {player2Score}</div>
          </div>
        </div>
      ) : (
        <div className="text-black bg-white p-6 rounded-md  w-[500px] flex justify-center items-center">
          <p>Opponent is choosing a word</p>
        </div>
      )}
    </div>
  );
};

export default WordBox;
