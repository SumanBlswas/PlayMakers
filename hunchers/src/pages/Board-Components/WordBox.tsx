// import { useEffect, useState } from "react";
// import { motion, useAnimation } from "framer-motion";

// const WordBox = () => {
//     const controls = useAnimation();
//     let arr: { word: string, definition: string }[] = [{ "word": "Abundant", "definition": "present in great quantity; more than adequate; oversufficient" }, { "word": "Bellicose", "definition": "inclined or eager to fight; aggressively hostile; belligerent" }, { "word": "Cacophony", "definition": "harsh discordance of sound; dissonance; a harsh, discordant mixture of sounds" }, { "word": "Dichotomy", "definition": "division into two parts, kinds, etc.; subdivision into halves or pairs" }, { "word": "Euphemism", "definition": "an inoffensive or indirect expression that is substituted for one that is considered offensive or too harsh" }, { "word": "Facetious", "definition": "not meant to be taken seriously or literally; humorous" }, { "word": "Galvanize", "definition": "to stimulate or excite as if by an electric shock; to startle into sudden activity or action" }, { "word": "Hegemony", "definition": "leadership or predominant influence exercised by one nation over others, as in a confederation" }, { "word": "Immutable", "definition": "not subject to change; constant; unalterable" }, { "word": "Juxtapose", "definition": "to place close together or side by side, especially for comparison or contrast" }, { "word": "Kudos", "definition": "praise and honor received for an achievement" }, { "word": "Languid", "definition": "lacking energy or vitality; weak or sluggish" }, { "word": "Maelstrom", "definition": "a powerful whirlpool in the sea or a river; a situation or state of confused movement or violent turmoil" }, { "word": "Nadir", "definition": "the lowest point; the point of greatest adversity or despair" }, { "word": "Omnipotent", "definition": "having unlimited power; able to do anything" }, { "word": "Pernicious", "definition": "causing harm or ruin; injurious; hurtful" }];
//     const [current, setCurrent] = useState<number | null>(null);

//     useEffect(() => {
//         controls.start("animate");
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//     const gridItems = arr.map((item, index) => (
//         <motion.div
//             key={index}
//             initial={{ y: -1000 }}
//             animate={{ y: 0, transition: { delay: index * 0.1 } }}
//             className={`h-24 w-36 rounded-md place-items-center bg-[#f4d8b5] grid-row-${Math.floor(index / 4) + 1} grid-column-${(index % 4) + 1} flex justify-center`}
//         >
//             <div className={`border-2 rounded-md p-2 border-[#b19578] w-[90%] h-[90%] flex flex-col justify-center text-center ${index === current ? 'bg-red-500' : "none"}`} onClick={() => {
//                 setCurrent(index)
//             }}>
//                 <div className="flex flex-row-reverse place-items-end mb-2 justify-between">
//                     <img className="w-[40%]" src="https://cdn.codenames.game/v20210210/theme/classic/card/black-back.png" alt="detective" />
//                     <div className="w-[50%] border-b-2 border-[#b19578] ">

//                     </div>
//                 </div>
//                 <p className="bg-white w-[100%]">
//                     {item.word}
//                 </p>
//             </div>
//         </motion.div >
//     ));

//     return <div className="grid fixed grid-cols-4 gap-x-5 gap-y-5 left-[30%] top-[12%] ">{gridItems}</div>;
// };

// export default WordBox;

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
  const dispatch = useAppDispatch();
  const controls = useAnimation();
  let arr = useAppSelector((state) => state.boardReducer.words);

  const [current, setCurrent] = useState<number | null>(null);

  const ChooseSquare = async (word: string, index: number) => {
    setCurrent(index);
    setSelectedWord(word);
    await channel.sendEvent({
      type: "game-move" as EventTypes,
      data: { selectedWord, index },
    });
  };
  useEffect(() => {
    controls.start("animate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const gridItems = arr?.map((item: { word: string }, index: number) => (
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
          ChooseSquare(item.word, index);
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
    if (event.type === ("game-move" as EventTypes)) {
      let x = arr.map((item: { word: string }) => {
        return item.word === selectedWord ? (item.word = "Varun") : item;
      });
      dispatch({ type: GET_WORDS, payload: x });
    }
  });
  return (
    <div className="grid fixed grid-cols-4 gap-x-5 gap-y-5 left-[30%] top-[12%] ">
      {gridItems}
    </div>
  );
};

export default WordBox;
