import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import {
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { setModalState} from "../store";


const Modal = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.modalState);
  const postId = useSelector((state) => state.postIdState);
  const setIsOpen = () => {
    dispatch(setModalState(!isOpen));
  }
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const router = useRouter();

  useEffect(
    () =>{
      return onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      })
    }, [db]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
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
                text-left overflow-hidden shadow-xl transform transition-all
                sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
            >
              <div
                className="flex items-center px-1.5 py-2 border-b
                  border-gray-700"
              >
                <div
                  className="hoverAnimation w-9 h-9 flex items-center
                    justify-center xl:px-0"
                  onClick={setIsOpen}
                >
                  <XMarkIcon className="h-[22px] text-white"/>
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                  <span
                      className="w-0.5 h-full z-[-1] absolute
                        left-5 top-11 bg-gray-600"
                    >
                    </span>
                      <img
                        src={post?.userImg}
                        alt=""
                        className="h-11 w-11 rounded-full"
                      />
                      <div>
                        <div className="inline-block group">
                          <h4
                            className="font-bold text-[15px] sm:text-base
                              text-[#d9d9d9] inline-block group-hover:underline"
                          >
                            {post?.username}
                          </h4>
                          <span
                            className="ml-1.5 text-sm sm:text-[15px]"
                          >
                            @{post?.tag}
                          </span>
                        </div>
                        {' '}⬩{' '}
                        <span
                          className="text-sm sm:text-[15px]"
                        >
                          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        <p
                          className="text-[#d9d9d9] text-[15px] sm:text-base"
                        >
                          {post?.text}
                        </p>
                      </div>
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

export default Modal;