import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const WordBox = () => {
    const controls = useAnimation();
    let arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    useEffect(() => {
        controls.start("animate");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const gridItems = arr.map((_, index) => (
        <motion.div
            key={index}
            initial={{ y: -1000 }}
            animate={{ y: 0, transition: { delay: index * 0.1 } }}
            className={`h-24 w-36 rounded-md bg-[#f4d8b5] grid-row-${Math.floor(index / 4) + 1
                } grid-column-${(index % 4) + 1}`}
        ></motion.div>
    ));

    return <div className="grid fixed grid-cols-4 gap-x-5 gap-y-5 left-[30%] top-[12%] ">{gridItems}</div>;
};

export default WordBox;
