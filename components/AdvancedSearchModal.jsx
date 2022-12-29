import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState} from "react";
import {
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {setSearchIsOpen} from "../store";
import SearchInput from "./SearchInput";
import SearchUsersInput from "./SearchUsersInput"

const  advancedSearchModal = () => {
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTabIndex] = useState('posts');
  const searchState = useSelector((state) => {return state.advancedSearchModalState});
  const closeModal = () => {
    dispatch(setSearchIsOpen(false));
  }

  return (
    <Transition.Root show={searchState.isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-59 inset-0 pt-8" onClose={closeModal}>
        <div className="items-start justify-center min-w-[800] min-h-[800px]
         pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-black rounded-2xl
                text-left  shadow-xl transform transition-all
                sm:my-8 sm:align-middle"
            >
              <div
                className="flex items-center px-1.5 py-2"
              >
                <div
                  className="hoverAnimation w-9 h-9 flex items-center
                    justify-center xl:px-0"
                  onClick={closeModal}
                >
                  <XMarkIcon className="h-[22px] text-white"/>
                </div>
                <h2
                  className="text-[#d9d9d9] mt-[1px] ml-2 text-[20px]
                    font-bold"
                >
                  Search
                </h2>
              </div>
              <div className="flex space-x-3 border-b border-gray-700">
                <button
                  className={`p-2 border-b-4 transition-colors duration-300 text-white text-[18px] font-semibold w-[50%] ${
                    'posts' === activeTabIndex
                      ? 'border-white'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                  // Change the active tab on click.
                  onClick={() => setActiveTabIndex('posts')}
                >
                  Posts
                </button>
                <button
                  className={`p-2 border-b-4 transition-colors duration-300 text-white text-[18px] font-semibold w-[50%] ${
                    'users' === activeTabIndex
                      ? 'border-white'
                      : 'border-transparent hover:border-gray-200'
                  }`}
                  // Change the active tab on click.
                  onClick={() => setActiveTabIndex('users')}
                >
                  Users
                </button>
              </div>
              <div className="">
               {activeTabIndex === 'posts' ? <SearchInput/> : <SearchUsersInput/>}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default advancedSearchModal;