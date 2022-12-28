import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UserSettings = ({}) => {
  const router = useRouter();
  const {data: session} = useSession();

  return (
    <div
      className="text-white flex-grow border-l border-r border-gray-700
        max-w-2xl sm:ml-[70px] xl:ml-[370px] justify-center items-center"
    >
      <div
        className="flex items-center px-1.5 py-2 border-b
          border-gray-700 text-[#d9d9d9] font-semibold text-xl
          gap-x-4 sticky top-0 z-47 bg-black"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center
            justify-center xl:px-0"
          onClick={() =>  router.push("/")}
        >
          <ArrowLeftIcon className="h-5 text-white" />
        </div>
        Back To Feed
      </div>
      <div className="flex flex-row items-center p-5 pl-[90px] pr-[95px]">
        <img
          src={session?.user.image}
          alt="profile pic"
          className={`h-[150px] w-[150px] rounded-full`}
        />
          <button
            className="hidden xl:inline ml-auto bg-[#2b2c2c] text-white
              rounded-full w-56 h-[32px] text-md font-bold shadow-md hover:bg-[#434343]"
          >
            Upload Photo
          </button>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <label
          for="username"
          className="flex justify-center items-center py-2 text-gray-300
            font-bold text-[16px]"
        >
          Username
        </label>
        <div className="flex items-center text-gray-400 border rounded-md w-[80%]">
          <div className="px-2 py-2.5 rounded-l-md bg-gray-800 border-r">
            @
          </div>
          <input
            type="text"
            placeholder="username..."
            id="username"
            className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
          />
        </div>
        <label
          for="displayname"
          className="flex justify-center items-center py-2 text-gray-300
            font-bold text-[16px]"
        >
          Display Name
        </label>
        <div className="flex items-center text-gray-400 border rounded-md w-[80%]">
            <input
              type="text"
              placeholder="Display Name"
              id="displayname"
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
            />
        </div>
        <label
          for="bio"
          className="flex justify-center items-center py-2 text-gray-300
            font-bold text-[16px]"
        >
          Bio
        </label>
        <div className="flex items-center text-gray-400 border rounded-md w-[80%]">
            <textarea
              type="text"
              placeholder="bio"
              id="bio"
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
            />
        </div>
        <label
          for="location"
          className="flex justify-center items-center py-2 text-gray-300
            font-bold text-[16px]"
        >
          Location
        </label>
        <div className="flex items-center text-gray-400 border rounded-md w-[80%]">
            <input
              type="text"
              placeholder="Location"
              id="location "
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
            />
        </div>
        <button
          className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 !mt-4
            font-bold shadow-md hover:bg-[#1a8cd8]"
        >
          Apply Changes
        </button>
      </div>
    </div>
  )
}

export default UserSettings;