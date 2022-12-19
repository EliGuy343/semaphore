import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../store";
import EmojiPicker from "emoji-picker-react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const commentLimit = 1000;

const Modal = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  const {isOpen, postId} = useSelector((state) => state.modalState);

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef();

  const closeModal = () => {
    dispatch(setIsOpen(!isOpen));
  }

  const addEmoji = (emojiObject, event) => {
    let emoji = String.fromCodePoint(`0x${emojiObject.unified}`);
    setComment((comment) => comment+emoji);
  }

  const addImageToComment = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }
  const sendComment = async (e) => {
    e.preventDefault();
    if(comment.length > commentLimit) return;

    const docRef = await addDoc(collection(db, 'posts', postId,"comments"), {
      id:session.user.uid,
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp()
    })

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef,selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts',postId, "comments", docRef.id), {
          image: downloadURL
        });
      });
    }
    closeModal();
    setComment("");

    router.push(`/${postId}`);
  }

  useEffect(
    () =>{
      return onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      })
    }, [db, postId]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={closeModal}>
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
                sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
            >
              <div
                className="flex items-center px-1.5 py-2 border-b
                  border-gray-700"
              >
                <div
                  className="hoverAnimation w-9 h-9 flex items-center
                    justify-center xl:px-0"
                  onClick={closeModal}
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
                      {" "}⬩{" "}
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
                  <div
                    className="mt-7 flex space-x-3 w-full"
                  >
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="flex-grow mt-2">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="signal your reply"
                        rows="2"
                        className="bg-transparent outline-none text-[#d9d9d9]
                          text-lg placeholder-gray-500 tracking-wide w-full
                          min-h-[80px]"
                      />
                      {selectedFile && (
                        <div className='relative'>
                          <div
                            className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
                            bg-opacity-75 rounded-full flex items-center justify-center
                            top-1 left-1 cursor-pointer'
                            onClick={() => setSelectedFile(null)}
                          >
                            <XMarkIcon className='text-white h-5'/>
                          </div>
                          <img
                            src={selectedFile}
                            alt=''
                            className='rounded-2xl max-h-80 object-contain'
                          />
                        </div>
                      )}
                      <div>
                        {comment.trim() &&
                          <h2
                            className={`${commentLimit < comment.length ?
                              'text-[#f20808]':
                              'text-[#5a5858]'} ml-2`
                            }
                          >
                            {commentLimit - comment.length} characters remaining
                          </h2>
                        }
                        <div className="flex items-center justify-between pt-2.5">
                          <div
                            className="flex items-center"
                          >
                            <div
                              className="icon"
                              onClick={() => filePickerRef.current.click()}
                            >
                              <PhotoIcon
                                className="text-[#1d9bf0] h-[22px]"
                              />
                              <input
                                type='file'
                                hidden
                                onChange={addImageToComment}
                                ref={filePickerRef}
                              />
                            </div>
                            <div className="icon rotate-90">
                              <ChartBarIcon
                                className="text-[#1d9bf0] h-[22px]"
                              />
                            </div>
                            <div
                              className="icon"
                              onClick={() => setShowEmojis((state) => !state)}
                            >
                            <FaceSmileIcon
                              className='text-[#1d9bf0] h-[22px]'
                            />
                            </div>
                            {showEmojis && (
                              <div
                                className='absolute mt-[320px] ml-[40px] max-w-[220px]
                                  border-r-8'
                              >
                                <EmojiPicker
                                  onEmojiClick={addEmoji}
                                  theme='dark'
                                  height={320}
                                  width={320}
                                />
                              </div>
                            )}
                            <div className="icon">
                              <CalendarIcon
                                className="text-[#1d9bf0] h-[22px]"
                              />
                            </div>
                          </div>
                          <button
                            className="bg-[#1d9bf0] text-white  rounded-full
                              px-4 py-1.5 font-bold shadow-md
                              hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0]
                              disabled:opacity-50"
                              type="submit"
                              onClick={sendComment}
                              disabled={!comment.trim() || commentLimit < comment.length}
                          >
                            Signal
                          </button>
                        </div>
                      </div>
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