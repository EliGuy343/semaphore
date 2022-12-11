import Image from "next/image";
import SidebarLink from "./SidebarLink";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  ListBulletIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline"
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {

  const {data: session } = useSession();
  return (
    <div
      className="hidden sm:flex flex-col items-center xl:items-start
        xl:w-[340px] p-2 fixed h-full"
    >
      <div
        className="flex items-center justify-center w-14 h-14 hoverAnimation
          p-0 sm:mr-[15px] xl:mr-0 xl:ml-24"
      >
        <Image
          src="https://i.imgur.com/6jy6tPw.png"
          width={30}
          height={30}
          color="white"
        />
      </div>
      <div className="space-y-3 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="home" Icon={HomeIcon} />
        <SidebarLink text="explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Inbox" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="User Settings" Icon={UserIcon} />
        <SidebarLink text="Lists" Icon={ListBulletIcon} />
        <SidebarLink text="More" Icon={EllipsisHorizontalIcon} />
        <button
          className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white
            rounded-full w-56 h-[52px] text-lg shadow-md hover:bg-[#1a8cd8]"
        >
          Signal
        </button>
        <div
          className="text-[#d9d9d9] flex items-center justify-center ml-3
            mt-auto hoverAnimation xl:ml-auto xl:mr-5"
            onClick={signOut}
        >
          <img
            src={session.user.image}
            alt="profile pic"
            className="h-10 w-10 rounded-full sm:ml-4 xl:mr-2.5"
          />
          <div className="hidden xl:inline leading-5">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-[#6e767d]">{session.user.tag}</p>
          </div>
          <EllipsisHorizontalIcon className="h-5 xl:inline ml-10" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;