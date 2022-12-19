import { Dialog, Transition } from "@headlessui/react";
import { Fragment} from "react";
import {
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {closePhoto} from "../store";

const  PhotoModal = () => {
  const dispatch = useDispatch();
  const {isOpen, photoUrl} = useSelector((state) => state.photoModalState);
  const closeModal = () => {
    dispatch(closePhoto());
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-49 inset-0 pt-8" onClose={closeModal}>
        <div className="flex items-start justify-center min-h-[800px]
          m:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
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
                sm:my-8 sm:align-middle sm:max-w-xl "
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
                  Photo View
                </h2>
              </div>
              <div className="flex px-4 pb-2.5">
                <div className="w-full max-w-[500px] max-h-[500px] l:max-w-[750px] l:max-h[750px] overflow-scroll">
                  <div className="text-[#6e767d] flex gap-x-3 relative ">
                    <img
                      src={photoUrl}
                      alt=""
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PhotoModal;