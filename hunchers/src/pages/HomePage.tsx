import { useNavigate } from "react-router-dom";
import TopSection from "../components/TopSection";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  useEffect(() => {
    controls.start("animate");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TopSection />

      <motion.div
        className="flex justify-around items-center"
        initial={{ y: -1000 }}
        animate={{ y: 0, transition: { delay: 2 * 0.1 } }}
      >
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="rounded-full text-2xl p-5 w-[250px] tracking-wider bg-yellow-300 text-black font-semibold hover:bg-yellow-400  shadow-md shadow-black"
        >
          START GAME
        </button>
      </motion.div>

      <div className="flex justify-between items-center ">
        <div className="p-10">
          <button className="flex gap-2 place-items-center bg-[#DBD4AF] rounded-2xl text-xl p-2 pr-4 pl-4 shadow-md shadow-black cursor-default">
            How to play
          </button>
          <div className="py-5 text-white tracking-wider leading-loose w-[400px]">
            <ol>
              <li>1. Click on the CREATE ROOM button.</li>
              <li>2. Select the preferred game settings and start the game.</li>
              <li>
                3. Connect with your friends using your favorite audio or video
                chat.
              </li>
              <li>4. Share the room URL with your friends.</li>
              <li>5. Enjoy the game!</li>
            </ol>
          </div>
        </div>
        <img
          src="https://media-public.canva.com/MADoheTQTsg/1/thumbnail.png"
          alt=""
        />
      </div>
    </>
  );
};

export default HomePage;
