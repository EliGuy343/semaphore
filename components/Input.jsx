import { useState } from 'react';

const Input = () => {

  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile ] = useState(null);

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3
      overflow-y-scroll scrollbar-hide`}
    >
      <img
        src='https://i.imgur.com/dAdnl2y.png'
        alt='profile pic'
        className="h-11 w-11 rounded-full cursor-pointer"
      />

      <div className='w-full divide-y-2 divide-gray-700'>
        <div className={``}>
          <textarea
            value={input}
            rows='2'
            className='bg-transparent outline-none text-[#d9d9d9]
              text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
            onChange={(e) => setInput(e.target.value)}
          />
          <div className='relative'>
            <div>
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
                  bg-opacity-75 rounded-full flex items-center justify-center
                  top-1 left-1 cursor-pointer'
              >
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input;