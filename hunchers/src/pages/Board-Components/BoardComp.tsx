import React from "react";
import { useAppSelector } from "../../redux/store";
import { motion, useAnimation } from "framer-motion";

type BoardProps = {
    ChooseSquare: (word: string, index: number, definition: string) => void;
};

const Board: React.FC<BoardProps> = ({ ChooseSquare }) => {
    let squares = useAppSelector((state) => state.boardReducer.words);

    const gridItems = squares?.map(
        (
            item: { word: string; definition: string; completed: boolean },
            index: number
        ) => (
            <motion.div
                key={index}
                initial={{ y: -1000 }}
                animate={{ y: 0, transition: { delay: index * 0.1 } }}
                className={`h-24 w-36 rounded-md place-items-center bg-[#f4d8b5] grid-row-${Math.floor(index / 4) + 1
                    } grid-column-${(index % 4) + 1} flex justify-center`}
            >
                <div
                    className={`border-2 rounded-md p-2 border-[#b19578] w-[90%] h-[90%] flex flex-col justify-center text-center`}
                    onClick={() => {
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

    return (
        <div className="fixed left-[30%] top-[12%] ">
            <div className="grid  grid-cols-4 gap-x-5 gap-y-5 left-[30%] top-[12%] ">
                {gridItems}
            </div>
        </div>
    );
};

export default Board;
