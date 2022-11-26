import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Input = () => {

  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile ] = useState(null);

  //TODO: fix scrollbar

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3`}
    >
      <img
        src='https://i.imgur.com/dAdnl2y.png'
        alt='profile pic'
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      <div className='w-full divide-y-2 divide-gray-700'>
        {/* Message Input */}
        <div className={``}>
          <textarea
            value={input}
            placeholder='signal your status...'
            rows='2'
            className='bg-transparent outline-none text-[#d9d9d9]
              text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
            onChange={(e) => setInput(e.target.value)}
          />
          {/* uploaded Image display */}
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
        {/*Image Input*/}
        <div className='flex items-center justify-between pt-2.5'>
          <div className='flex items-center'>
            <div className='icon'>
              <PhotoIcon className='h-[22px] text-[#1d9bf0]'/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Input;