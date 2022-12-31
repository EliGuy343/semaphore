import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchUsersInput = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [parameters, setParameters] = useState({
    tag:"",
    user:""
  });

  return (
    <div
      className={`flex border-b border-gray-700 p-5 flex-col justify-center items-center`}
    >
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
            name="tag"
            placeholder="username..."
            id="username"
            className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
            onChange={(e) => {
              setParameters((parameters) => {
                parameters[e.target.name] = e.target.value
                return parameters;
              })
            }}
          />
      </div>
      <label
        className="flex justify-center items-center py-2 text-gray-300
          font-bold text-[16px]"
      >
        Display Name
      </label>
      <div className="flex items-center text-gray-400 border rounded-md w-[100%]">
        <input
          name="user"
          type="text"
          placeholder="Display Name"
          id="displayname"
          className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
          onChange={(e) => {
            setParameters((parameters) => {
              parameters[e.target.name] = e.target.value
              return parameters;
            })
          }}
        />
      </div>
      <button
        className="bg-[#1d9bf0] text-white rounded-full px-3 py-2 !mt-4
          font-bold shadow-md hover:bg-[#1a8cd8]"
      >
        Search Users
      </button>
    </div>
  )
}

export default SearchUsersInput;