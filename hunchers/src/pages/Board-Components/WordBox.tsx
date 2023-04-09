// import { useEffect, useState } from "react";
// import { motion, useAnimation } from "framer-motion";
// import { useAppDispatch, useAppSelector } from "../../redux/store";
// import { useChannelStateContext } from "stream-chat-react";
// // import { CreateRoom, JoinRoom } from "../../redux/boardRedux/boardAction";
// import { EventTypes } from "stream-chat";
// import { GET_WORDS } from "../../redux/boardRedux/boardTypes";
// import Board from "./BoardComp";

// interface GameMoveEventData {
//   selectedWord: string;
//   index: number;
// }

// const WordBox = () => {
//   const { channel } = useChannelStateContext();
//   const [selectedWord, setSelectedWord] = useState<string>("");
//   const [player1Score, setPlayer1Score] = useState<number>(0);
//   const [player2Score, setPlayer2Score] = useState<number>(0);
//   const [currentTurn, setCurrentTurn] = useState<"player1" | "player2">("player1");
//   const [winningScore, setWinningScore] = useState<number>(5);
//   const [def, setDef] = useState<string>("")
//   const ChooseSquare = async (word: string, index: number, definition: string) => {
//     if (currentTurn === "player1") {
//       await channel.sendEvent({
//         type: "game-move" as EventTypes,
//         data: { word, index, definition },
//       });
//       setSelectedWord(word);
//       setCurrentTurn("player2");
//     }
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const handleOpponentMove = (event: {
//     type: string;
//     data?: { word: string; index: number; definition: string };
//   }) => {
//     if (event.type === "game-move" && event.data) {
//       const { word, index, definition } = event.data;
//       if (currentTurn === "player2") {
//         if (word === selectedWord) {
//           setPlayer2Score((score) => score + 1);
//           alert("Congratulations, you guessed correctly!");
//         } else {
//           alert("Wrong Guess!");
//           setPlayer2Score((score) => Math.max(0, score - 1));
//         }
//         setSelectedWord(word);
//         setCurrentTurn("player1");
//       }
//       setDef(definition)
//     }
//   };



//   useEffect(() => {
//     if (player1Score >= winningScore || player2Score >= winningScore) {
//       // End the game and declare the winner
//       let winner = "";
//       if (player1Score > player2Score) {
//         winner = "Player 1";
//       } else if (player2Score > player1Score) {
//         winner = "Player 2";
//       } else {
//         winner = "Tie";
//       }
//       alert(`${winner} wins!`);
//       setPlayer1Score(0);
//       setPlayer2Score(0);
//     }
//   }, [player1Score, player2Score, winningScore]);

//   const handleWinningScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setWinningScore(parseInt(event.target.value));
//   };

//   return (
//     <div>
//       <div className="fixed left-[45%] top-[90%] bg-white rounded-md p-6">
//         <h3>{def}</h3>
//       </div>
//       <div className="fixed left-[5%] top-[70%] bg-white rounded-md p-6">
//         <h3>Current Turn: {currentTurn === "player1" ? "Player 1" : "Player 2"}</h3>
//         <h3>Player 1 score: {player1Score}</h3>
//         <h3>Player 2 score: {player2Score}</h3>
//         {selectedWord && <h3>Selected word: {selectedWord}</h3>}
//         <label htmlFor="winning-score">Winning score:</label>
//         <input type="number" id="winning-score" value={winningScore} onChange={handleWinningScoreChange} />
//         <div>
//         </div>
//       </div>
//       <Board ChooseSquare={ChooseSquare} />
//     </div>
//   );
// };


// export default WordBox;



import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useChannelStateContext } from "stream-chat-react";
import { EventTypes } from "stream-chat";
import { useAppSelector } from "../../redux/store";
import { GET_WORDS } from "../../redux/boardRedux/boardTypes";



const WordBox = () => {
  const { channel } = useChannelStateContext();
  const controls = useAnimation();
  const arr = useAppSelector((state) => state.boardReducer.words);
  const [selectedWord, setSelectedWord] = useState<string>("");
  const [words, setWords] = useState(arr);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [winningScore, setWinningScore] = useState<number>(5);
  const [completedCards, setCompletedCards] = useState<number[]>([]);
  const [hideClue, setHideClue] = useState(true);
  const [def, setDef] = useState("");
  const [current, setCurrent] = useState<number | null>(null);
  const [currentTurn, setCurrentTurn] = useState<"player1" | "player2">(
    "player1"
  );
  const [currentClue, setCurrentClue] = useState<string>("");

  const ChooseSquare = async (
    word: string,
    index?: number,
    definition?: string
  ) => {
    if (currentTurn === "player1") {
      setSelectedWord(word);
      setCurrent(Number(index));
      setDef(String(definition));
      setCompletedCards([...completedCards, Number(index)]);
      await channel.sendEvent({
        type: "game-move" as EventTypes,
        data: { word, index, definition },
      });
      setCurrentTurn("player2");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleOpponentMove = (event: {
    type: string;
    data?: { word: string; index: number; definition: string };
  }) => {
    if (event.type === "game-move" && event.data) {
      const { word, index, definition } = event.data;
      if (currentTurn === "player2") {
        if (word === selectedWord) {
          setPlayer2Score((score) => score + 1);
          alert("Congratulations, you guessed correctly!");
        } else {
          alert("Wrong Guess!");
          setPlayer2Score((score) => Math.max(0, score - 1));
        }
        setSelectedWord("");
        setCurrentTurn("player1");
      }

      setSelectedWord(word);
      setCurrent(index);
      setDef(definition);
      setHideClue(false);
      setDef(definition)
    }
  };

  useEffect(() => {
    channel.on(handleOpponentMove);
    return () => channel.off(handleOpponentMove);
  }, [channel, handleOpponentMove]);


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
          className={`h-24 w-36 rounded-md place-items-center bg-[#f4d8b5] grid-row-${Math.floor(index / 4) + 1
            } grid-column-${(index % 4) + 1} flex justify-center`}
        >
          <div
            className={`border-2 rounded-md p-2 border-[#b19578] w-[90%] h-[90%] flex flex-col justify-center text-center ${isCurrent ? "bg-red-500" : ""
              } ${isCompleted ? "opacity-50 cursor-not-allowed" : ""} ${isSelectable ? "cursor-pointer hover:bg-blue-300" : ""
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
      <div className="fixed left-[5%] top-[70%] bg-white rounded-md p-6">
        <h3>Current Turn: {currentTurn === "player1" ? "Player 1" : "Player 2"}</h3>
        <h3>Player 1 score: {player1Score}</h3>
        <h3>Player 2 score: {player2Score}</h3>
        {selectedWord && <h3>Selected word: {selectedWord}</h3>}
        <label htmlFor="winning-score">Winning score:</label>
        <div>
        </div>
      </div>
      {currentTurn === "player1" ? (
        <div className="text-black bg-white p-6 rounded-md  w-[500px] flex justify-center items-center fixed top-[79%]">
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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                onClick={() => {
                  setHideClue(true);
                  ChooseSquare(selectedWord);
                }}
              >
                End Turn
              </button>
            </div>
          )}
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
