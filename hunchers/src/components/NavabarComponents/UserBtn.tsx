import { useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { getBoardApi } from "../../redux/boardRedux/boardAction";

const UserBtn = () => {
  const { board } = useAppSelector((store) => {
    return {
      board: store.boardReducer.board,
    };
  }, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardApi());
  }, [dispatch]);
  console.log("alu", board);

  return (
    <>
      <Popover as="div" className="z-10">
        <Popover.Button className="flex gap-2 place-items-center bg-[#DBD4AF] rounded-2xl text-xl p-1 pr-4 pl-4 hover:bg-[#ac9f61]  shadow-md shadow-black">
          <div>{board[0]?.name}</div>
          <BsEmojiHeartEyesFill />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute top-12 right-4 z-10 mt-2 w-auto origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <h1 className="p-20 pb-8 pt-8 text-center text-lg font-semibold font-mono">
                Join a Team!
              </h1>
            </div>
            <div className="py-1">
              <div className="flex flex-col p-4 pt-2 text-center gap-8">
                <p>Nickname</p>
                <input
                  className="border-2 border-gray p-4 rounded-lg"
                  placeholder={board[0]?.name}
                />
                <button className="bg-yellow-300 p-4 pt-1 pb-1 rounded-xl hover:bg-yellow-500 shadow-md shadow-black">
                  Update Your Nickname
                </button>
              </div>
            </div>
            <div className="py-1 flex justify-center place-items-center">
              <div className="flex p-4 place-items-center">
                <button className="flex place-items-center gap-4 p-4 bg-yellow-300 pt-1 pb-1 rounded-xl hover:bg-yellow-500 shadow-md shadow-black">
                  <ImExit />
                  <p>Leave the Room</p>
                </button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default UserBtn;
