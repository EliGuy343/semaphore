import {
  EllipsisHorizontalIcon,
  HeartIcon,
  TrashIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";
import { useState } from "react";
import Moment from "react-moment"

//TODO: delete comments
//TODO: like comments

const Comment = ({id, comment}) => {
  const {data: session} = useSession();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
    >
      <img
        src={comment?.userImg}
        alt=""
        className="h-11 w-11 rounded-full mr-4"
      />
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className="font-bold text-[#d9d9d9] text-[15px]
                  sm:text-base inline-block group-hover:underline"
              >
                {comment?.username}
              </h4>
              <span
                className="ml-1.5 text-sm sm:text-[15px]"
              >
                @{comment?.tag}{" "}
              </span>
            </div>
            {' '}⬩{' '}
            <span className="hover:underline text-sm sm:text-[15px]">
                <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9]">
                {comment?.comment}
              </p>
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon
              className="h-5 text-[#6e767d] group-hover:text=[#1d9bf0]"
            />
          </div>
          {/*image for when, the reply img feature will be ready */}
          <img
            src={comment?.image}
            alt=""
            className="rounded-2xl max-h-[700px] object-cover mr-2"
          />
        </div>
        {session.user.uid === comment?.id && (
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {}}
          >
            <div className="icon text-[#565656] group-hover:bg-red-600/10">
              <TrashIcon className="h-5 group-hover:text-red-600" />
            </div>
          </div>
        )}
        <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              setLiked((like) => !like)
            }}
          >
            <div className="icon text-gray-500 group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconSolid className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>
      </div>
    </div>
  )
}

export default Comment