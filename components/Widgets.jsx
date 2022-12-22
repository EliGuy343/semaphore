import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import Trending from "./Trending";
import { setSearchIsOpen } from "../store";
import { useDispatch } from "react-redux";

const Widgets = ({trendingResults, searchPage}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState();

  const goToSearch = () => {
    if(searchInput?.length > 0) router.push(`/search/${searchInput}`);
  }

  return (
    <div
      className="hidden lg:inline ml-8 xl:w-[450px]
       space-y-5"
    >
      <div
        className="sticky top-0 py-1.5 bg-black z-47
          w-11/12 xl:w-9/12 text-white"
      >
        {!searchPage &&
          <div>
            <div
              className="flex items-center bg-[#202327] p-3 rounded-full relative"
            >
              <MagnifyingGlassIcon
                className="text-gray-500 h-5 z-47 cursor-pointer"
                onClick={() => goToSearch()}
              />
              <input
                className="bg-transparent placeholder-gray-500 outline-none
                  text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent
                  w-full focus:border-[#1d9bf0] rounded-full focus:bg-black
                  focus:shadow-lg"
                placeholder="Search for what you need"
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={ (e) => {
                  if(e.key == 'Enter') goToSearch();
                }}
              />
            </div>
            <button
            className="bg-[#2b2c2c] text-white rounded-full ml-[15%] mt-2
              font-xl shadow-md hover:bg-[#434343] w-[70%]
              disabled:hover:bg-[#4d4d4e] disabled:opacity-40
              disabled:cursor-deafult"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setSearchIsOpen(true));
            }}
          >
            Advanced Search
          </button>
          </div>
        }
      </div>
      <div
        className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl
          w-11/12 xl:w-9/12"
      >
        <h4 className="font-bold text-xl px-4">What's Happening:</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result}/>
        ))}
        <button
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3
            cursor-pointer transition duration-200 ease-out flex items-center
            justify-between w-full text-[#1d9bf0] font-light"
        >
          show more
        </button>
      </div>
    </div>
  )
}

export default Widgets;