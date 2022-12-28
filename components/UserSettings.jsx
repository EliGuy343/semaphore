import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const UserSettings = ({}) => {
  return (
    <div
      className="text-white flex-grow border-l border-r border-gray-700
        max-w-2xl sm:ml-[70px] xl:ml-[370px]"
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
    </div>
  )
}

export default UserSettings;