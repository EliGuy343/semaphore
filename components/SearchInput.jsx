import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSearchIsOpen } from '../store';

const SearchInput = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [parameters, setParameters] = useState({
    word:"",
    startDate:"",
    endDate:"",
    user:""
  });

  return (
    <div
      className={`border-b border-gray-700 p-5 flex-col space-x-1`}
    >
      <div className="w-[300px] sm:w-[400px] divide-y-2 divide-gray-700">
        <div
          className="flex items-center bg-[#202327] p-6  rounded-full relative border"
        >
          <input
            className="bg-transparent placeholder-gray-500 outline-none
              text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
              w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
              focus:shadow-lg"
            placeholder="Search for..."
            onChange={(e) => setParameters(parameters => {
              parameters.word = e.target.value
              return parameters;
            })}
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
              onChange={(e) => setParameters(parameters => {
                parameters.user = e.target.value
                return parameters;
              })}
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
              onChange={(e) => setParameters(parameters => {
                parameters.startDate = e.target.value
                return parameters;
              })}
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
              onChange={(e) => setParameters(parameters => {
                parameters.endDate = e.target.value
                return parameters;
              })}
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
          onClick={(e) => {
            e.preventDefault();
            if(parameters.word || parameters.user) {
              router.push({
              pathname:`/search/posts`,
              query:{
                word: parameters.word,
                user: parameters.user,
                startDate: parameters.startDate,
                endDate: parameters.endDate
                }
              });
            }
            dispatch(setSearchIsOpen(false));
          }}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchInput;