// import { useState } from 'react';
// import Board from '../Board';
// import { EventTypes } from 'stream-chat';

// const Game = () => {
//   const [currentTurn, setCurrentTurn] = useState("player1");
//   const [selectedWord, setSelectedWord] = useState("");
//   const [currentIndex, setCurrentIndex] = useState<number | null>(null);
//   const [definition, setDefinition] = useState("");
//   const [hideClue, setHideClue] = useState(true);
//   const [completedCards, setCompletedCards] = useState<number[]>([]);
//   const [player1Score, setPlayer1Score] = useState(0);
//   const [player2Score, setPlayer2Score] = useState(0);

//   const ChooseSquare = async (
//     word: string,
//     index?: number,
//     definition?: string
//   ) => {
//     if (currentTurn === "player1") {
//       setSelectedWord(word);
//       setCurrentIndex(Number(index));
//       setDefinition(String(definition));
//       setCompletedCards([...completedCards, Number(index)]);
//       await channel.sendEvent({
//         type: "game-move" as EventTypes,
//         data: { word, index, definition },
//       });
//       setCurrentTurn("player2");
//     }
//   };

//   const handleGuess = (index: number) => {
//     if (currentTurn === "player2" && currentIndex === index) {
//       if (selectedWord === "your word") { // Replace with the actual word that player1 selected
//         setPlayer2Score(player2Score + 1);
//       } else if (selectedWord === "opponent's word") { // Replace with the actual word that player2 selected
//         setPlayer1Score(player1Score + 1);
//       }
//     }
//   };

//   channel.on(
//     (event: {
//       type: string;
//       data?: { word: string; index: number; definition: string };
//     }) => {
//       if (event.type === "game-move") {
//         if (event.data) {
//           const { word, index, definition } = event.data;
//           setSelectedWord(word);
//           setCurrentIndex(index);
//           setDefinition(definition);
//           setHideClue(false);
//           setCurrentTurn("player1");
//         }
//       }
//     }
//   );

//   return (
//     <>
//       <div>Player 1 score: {player1Score}</div>
//       <div>Player 2 score: {player2Score}</div>
//       <Board
//         ChooseSquare={ChooseSquare}
//         handleGuess={handleGuess}
//         completedCards={completedCards}
//       />
//     </>
//   );
// };

// export default Game;
import React from 'react'

const Game = () => {
  return (
    <div>Game</div>
  )
}

export default Game