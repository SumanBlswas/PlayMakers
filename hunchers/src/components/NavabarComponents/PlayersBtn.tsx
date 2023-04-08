import React, { useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { Fragment } from "react";
import { RxDotFilled } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { shallowEqual } from "react-redux";
import { getBoardApi } from "../../redux/boardRedux/boardAction";

const PlayersBtn = () => {
  const [toggle, setToggle] = React.useState(false);

  const { board } = useAppSelector((store) => {
    return {
      board: store.boardReducer.board,
      isLoading: store.boardReducer.isLoading,
    };
  }, shallowEqual);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardApi());
  }, [dispatch]);

  console.log(board);

  return (
    <>
      <Popover as="div">
        <Popover.Button
          className="bg-yellow-300 rounded-2xl hover:bg-yellow-500 shadow-md shadow-black"
          onClick={() => setToggle(!toggle)}
        >
          <div className="flex place-items-center gap-4 text-xl p-1 pr-4 pl-4">
            <p>Players</p>
            <div className="flex place-items-center gap-1">
              <FaUser />
              <div className="text-[20px]">{board.length}</div>
            </div>
          </div>
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
          <Popover.Panel className="absolute left-4 top-12 z-10 mt-2 max-w-[23%] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1 flex flex-col gap-8 p-4 pb-4">
              <h1 className="text-blue-600 font-bold font-serif">
                Invite Players by sending them this link.
              </h1>

              <div className="border-2 border-gray p-2 rounded-2xl text-center">
                https://hunchers.com/rebel-789-iop
              </div>

              <button className="bg-[#fde047] p-2 rounded-2xl shadow-black shadow-md ">
                Copy link to clipboard
              </button>
            </div>
            <div className="py-1 bg-[#e5e7eb] p-4  flex flex-col place-items-center gap-4 pb-4">
              <div className="font-bold">Players in this room</div>

              <div className="flex gap-2 flex-wrap">
                {board.map((el: any, i: number) => (
                  <button className="bg-white p-0 pt-0 pb-0 pr-2 flex rounded-md place-items-center">
                    <div className=" text-green-500 text-2xl">
                      <RxDotFilled />
                    </div>
                    <h1 key={i} className="font-semibold">
                      {el.name.split(0)}
                    </h1>
                  </button>
                ))}
              </div>
            </div>
            <div className="py-1 rounded-bl-lg rounded-br-lg bg-[#e5e7eb] p-4 flex flex-col place-items-center gap-4 pb-4">
              <div className="font-bold">Players in this room</div>

              <div className="flex gap-5">
                <label
                  htmlFor="toogleTwo"
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input id="toogleTwo" type="checkbox" className="sr-only" />
                    <div className="h-5 w-14 rounded-full bg-[#E5E7EB] shadow-inner"></div>
                    <div className="dot shadow-switch-1 absolute left-0 -top-1 h-7 w-7 rounded-full bg-white transition"></div>
                  </div>
                </label>
                <p>
                  Disallow new players to <br /> join teams during the game.
                </p>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default PlayersBtn;
