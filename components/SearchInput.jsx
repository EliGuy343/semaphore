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
            placeholder="Search for..."
            // onChange={(e) => setSearchInput(e.target.value)}
            // onKeyDown={ (e) => {
            //   if(e.key == 'Enter') goToSearch();
            // }}
          />
        </div>
      </div>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='pl-2 text-white text-[15px] font-bold'>From Username:</h1>
        <div className="w-[50%] divide-y-2 divide-gray-700">
          <div
            className="flex items-center bg-[#202327] p-4 rounded-full relative mt-5 border"
          >
            <input
              className="bg-transparent placeholder-gray-500 outline-none
                text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
                w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
                focus:shadow-lg"
              placeholder="@username"
              style={{
                colorScheme:'dark'
              }}
              // onChange={(e) => setSearchInput(e.target.value)}
              // onKeyDown={ (e) => {
              //   if(e.key == 'Enter') goToSearch();
              // }}
            />
          </div>
        </div>
      </div>
      <div className='mt-5 flex flex-col justify-center items-center'>
        <h1 className='pl-2 text-white text-[15px] font-bold'>From Date:</h1>
        <div className="w-[50%] divide-y-2 divide-gray-700">
          <div
            className="flex items-center bg-[#202327] p-4 rounded-full relative mt-5 border"
          >
            <input
              className="bg-transparent placeholder-gray-500 outline-none
                text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
                w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
                focus:shadow-lg"
              placeholder="from"
              type="date"
              style={{
                colorScheme:'dark'
              }}
              // onChange={(e) => setSearchInput(e.target.value)}
              // onKeyDown={ (e) => {
              //   if(e.key == 'Enter') goToSearch();
              // }}
            />
          </div>
        </div>
      </div>
      <div className='mt-3 flex flex-col justify-center items-center'>
        <h1 className='pl-2 text-white text-[15px] font-bold'>To Date:</h1>
        <div className="w-[50%] divide-y-2 divide-gray-700">
          <div
            className="flex items-center bg-[#202327] p-4 rounded-full relative mt-5 border"
          >
            <input
              className="bg-transparent placeholder-gray-500 outline-none
                text-[#d9d9d9] absolute inset-0 pl-8 border border-transparent
                w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
                focus:shadow-lg"
              placeholder="To"
              type="date"
              style={{
                colorScheme:'dark'
              }}
              // onChange={(e) => setSearchInput(e.target.value)}
              // onKeyDown={ (e) => {
              //   if(e.key == 'Enter') goToSearch();
              // }}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <button
          className="bg-[#1d9bf0] text-white rounded-full px-2 py-1 mt-7
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