import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {db, storage} from '../firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';

const inputLimit = 1000;

const Input = () => {
  const {data: session} = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef();

  const sendPost = async () => {
    if(loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp()
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef,selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL
        });
      });
    }

    setLoading(false);
    setInput('');
    setSelectedFile(null);
    setShowEmojis(false);
  }

  const addEmoji = (emojiObject, event) => {
    let emoji = String.fromCodePoint(`0x${emojiObject.unified}`);
    setInput(input+emoji);
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  return (
    <div
      className={`border-b border-gray-700 p-5 flex space-x-3 ${loading &&
        'opacity-60'}`}
    >
      <img
        src={session.user.image}
        alt='profile pic'
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      <div className='w-full  divide-y-2 divide-gray-700'>
        <div className={`${selectedFile && "pb-7"} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            placeholder='signal your status...'
            rows='2'
            className='bg-transparent outline-none text-[#d9d9d9]
              text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
            onChange={(e) => setInput(e.target.value)}
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
        </div>
        {!loading &&
          <div>
           {input.trim() &&
              <h2
                className={`m-[2px] ${input.length > inputLimit
                  ? 'text-[#f20808]'
                  :'text-[#5a5858]'
                }`}
              >
                {inputLimit - input.length}  Characters Remaining
              </h2>
            }
            <div className='flex items-center justify-between pt-2.5'>
              <div className='flex items-center'>
                <div
                  className='icon'
                  onClick={() => filePickerRef.current.click()}
                >
                  <PhotoIcon className='h-[22px] text-[#1d9bf0]'/>
                  <input
                    type='file'
                    hidden
                    onChange={addImageToPost}
                    ref={filePickerRef}
                  />
                </div>
                <div className='icon'>
                  <ChartBarIcon className='h-[22px] text-[#1d9bf0]'/>
                </div>
                <div
                  className='icon'
                  onClick={() => setShowEmojis(!showEmojis)}
                >
                  <FaceSmileIcon className='h-[22px] text-[#1d9bf0]'/>
                </div>
                <div className='icon'>
                  <CalendarIcon className='h-[22px] text-[#1d9bf0]'/>
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
              </div>
              <button
                className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5
                  font-bold shadow-md hover:bg-[#1a8cd8]
                  disabled:hover:bg-[#1d9bf0] disabled:opacity-40
                  disabled:cursor-deafult'
                disabled={
                  (!input.trim() && !selectedFile)
                  || input.length > inputLimit
                }
                onClick={sendPost}
              >
                Signal
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Input;