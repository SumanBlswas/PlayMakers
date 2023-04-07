import { BsStopwatchFill } from "react-icons/bs";
import PlayersBtn from "./NavabarComponents/PlayersBtn";
import UserBtn from "./NavabarComponents/UserBtn";

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="p-3 pt-2 flex gap-3 place-itemes-center">
          <PlayersBtn />
          <button className="p-2 bg-yellow-300 rounded-2xl flex place-items-center text-xl hover:bg-yellow-500  shadow-md shadow-black">
            <BsStopwatchFill />
          </button>
        </div>
        <div className="flex gap-3 place-items-center p-3 pt-2">
          <button className="bg-yellow-300 rounded-2xl text-xl p-1 pr-4 pl-4 hover:bg-yellow-500  shadow-md shadow-black">
            Rules
          </button>
          <UserBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
