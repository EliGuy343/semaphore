import Image from "next/image";
import SidebarLink from './SidebarLink';
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'
const Sidebar = () => {
  return (
    <div
      className="hidden sm:flex flex-col items-center xl:items-start
        xl:w-[340px] p-2 fixed h-full"
    >
      <div
        className="flex items-center justify-center w-14 h-14 hoverAnimation
          p-0 xl:ml-24"
      >
        <Image src='https://i.imgur.com/6jy6tPw.png' width={30} height={30} color='white' priority={1}/>
      </div>
      <div className="space-y-3 mt-4 mb-2.5 ml-6 xl:ml-24">
        <SidebarLink text='home' Icon={HomeIcon} />
        <SidebarLink text='explore' Icon={HashtagIcon} />
        <SidebarLink text='Notifications' Icon={BellIcon} />
        <SidebarLink text='Inbox' Icon={InboxIcon} />
        <SidebarLink text='Bookmarks' Icon={BookmarkIcon} />
        <SidebarLink text='User Settings' Icon={UserIcon} />
        <SidebarLink text='More' Icon={EllipsisHorizontalIcon} />
      </div>
    </div>
  )
}

export default Sidebar;