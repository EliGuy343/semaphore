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
      <label
        className="flex justify-center items-center py-2 text-gray-300
          font-bold text-[16px]"
      >
       Post Content
      </label>
      <div className="flex items-center text-gray-400 border rounded-md w-[100%]">
        <input
          name="word"
          type="text"
          placeholder="Post content"
          id="displayname"
          className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
          onChange={(e) => {
            setParameters((parameters) => {
              parameters[e.target.name] = e.target.value
              console.log(parameters)
              return parameters;
            })
          }}
        />
      </div>
      <label
        className="flex justify-center items-center py-2 text-gray-300
          font-bold text-[16px]"
      >
        Username
      </label>
      <div className="flex items-center text-gray-400 border rounded-md w-[100%]">
        <div className="px-2 py-2.5 rounded-l-md bg-gray-800 border-r">
          @
        </div>
        <input
          type="text"
          name="user"
          placeholder="username..."
          id="user"
          className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
          onChange={(e) => {
            setParameters((parameters) => {
              parameters[e.target.name] = e.target.value
              return parameters;
            })
          }}
        />
      </div>
      <div className='flex justify-center items-center space-x-4'>
        <div className='flex flex-col justify-center items-center'>
          <label
            className="flex justify-center items-center py-2 text-gray-300
              font-bold text-[16px]"
          >
            Start Date
          </label>
          <div className="flex items-center text-gray-400 border rounded-md w-[100%]">
            <input
              type="date"
              name="startDate"
              placeholder="Start Date..."
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
              onChange={(e) => {
                setParameters((parameters) => {
                  parameters[e.target.name] = e.target.value
                  return parameters;
                })
              }}
              style={{
                colorScheme:'dark'
              }}
            />
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <label
            className="flex justify-center items-center py-2 text-gray-300
              font-bold text-[16px]"
          >
            End Date
          </label>
          <div className="flex items-center text-gray-400 border rounded-md w-[100%]">
            <input
              type="date"
              name="endDate"
              placeholder="Start Date..."
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
              onChange={(e) => {
                setParameters((parameters) => {
                  parameters[e.target.name] = e.target.value
                  return parameters;
                })
              }}
              style={{
                colorScheme:'dark'
              }}
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