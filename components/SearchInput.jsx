import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react'

const SearchInput = () => {
  return (
    <div
      className={`border-b border-gray-700 p-5 flex-col space-x-1`}
    >
      <div className="w-full divide-y-2 divide-gray-700">
        <div
          className="flex items-center bg-[#202327] p-6  rounded-full relative border"
        >
          <input
            className="bg-transparent placeholder-gray-500 outline-none
              text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
              w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
              focus:shadow-lg"
            placeholder="Search for what you need"
            // onChange={(e) => setSearchInput(e.target.value)}
            // onKeyDown={ (e) => {
            //   if(e.key == 'Enter') goToSearch();
            // }}
          />
        </div>
      </div>
      <div className='mt-5'>
        <h1 className='pl-2 text-white text-[15px] font-bold'>Username:</h1>
        <div className="w-[50%] divide-y-2 divide-gray-700">
          <div
            className="flex items-center bg-[#202327] p-6 rounded-full relative mt-5 border"
          >
            <input
              className="bg-transparent placeholder-gray-500 outline-none
                text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
                w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
                focus:shadow-lg"
              placeholder="@username"
              // onChange={(e) => setSearchInput(e.target.value)}
              // onKeyDown={ (e) => {
              //   if(e.key == 'Enter') goToSearch();
              // }}
            />
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <h1 className='pl-2 text-white text-[15px] font-bold'>Date:</h1>
        <div className='flex flex-row space-x-4'>
          <div className="w-[50%] divide-y-2 divide-gray-700">
            <div
              className="flex items-center bg-[#202327] p-6 rounded-full relative mt-5 border"
            >
              <input
                className="bg-transparent placeholder-gray-500 outline-none
                  text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
                  w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
                  focus:shadow-lg"
                style={{
                  colorScheme:'dark'
                }}
                placeholder="from"
                type='date'
                // onChange={(e) => setSearchInput(e.target.value)}
                // onKeyDown={ (e) => {
                //   if(e.key == 'Enter') goToSearch();
                // }}
              />
            </div>
          </div>
          <div className="w-[50%] divide-y-2 divide-gray-700">
            <div
              className="flex items-center bg-[#202327] p-6 rounded-full relative mt-5 border"
            >
              <input
                className="bg-transparent placeholder-gray-500 outline-none
                  text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
                  w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
                  focus:shadow-lg"
                style={{
                  colorScheme:'dark'
                }}
                type='date'
                placeholder="To"
                // onChange={(e) => setSearchInput(e.target.value)}
                // onKeyDown={ (e) => {
                //   if(e.key == 'Enter') goToSearch();
                // }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className='flex flex-row items-center justify-center'>
        <button
          className="bg-[#1d9bf0] text-white rounded-full px-4 py-2 mt-5
            font-bold shadow-md hover:bg-[#1a8cd8] w-[40%]
            disabled:hover:bg-[#1d9bf0] disabled:opacity-40
            disabled:cursor-deafult"
          // disabled={
          //   (!input.trim() && !selectedFile)
          //   || input.length > inputLimit
          // }
          // onClick={sendPost}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchInput;