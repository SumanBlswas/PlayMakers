import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { ImExit } from "react-icons/im";

const UserBtn = () => {
  return (
    <>
      <Menu as="div">
        <Menu.Button className="flex gap-2 place-items-center bg-[#DBD4AF] rounded-2xl text-xl p-1 pr-4 pl-4 hover:bg-[#ac9f61]  shadow-md shadow-black">
          <div>Hiru</div>
          <BsEmojiHeartEyesFill />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-12 right-4 z-10 mt-2 w-auto origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <h1 className="p-20 pb-8 pt-8 text-center text-lg font-semibold font-mono">
                    Join a Team!
                  </h1>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <div className="flex flex-col p-4 pt-2 text-center gap-8">
                    <p>Nickname</p>
                    <input className="border-2 border-gray p-4 rounded-lg" placeholder="Hiru" />
                    <button className="bg-yellow-300 p-4 pt-1 pb-1 rounded-xl hover:bg-yellow-500 shadow-md shadow-black">
                      Update Your Nickname
                    </button>
                  </div>
                )}
              </Menu.Item>
            </div>
            <div className="py-1 flex justify-center place-items-center">
              <Menu.Item>
                {({ active }) => (
                  <div className="flex p-4 place-items-center">
                    <button className="flex place-items-center gap-4 p-4 bg-yellow-300 pt-1 pb-1 rounded-xl hover:bg-yellow-500 shadow-md shadow-black">
                      <ImExit />
                      <p>Leave the Room</p>
                    </button>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default UserBtn;
