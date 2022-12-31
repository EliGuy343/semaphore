import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const User = ({userPage, user, id}) => {
  const router = useRouter();
  return (
    <div
      className={`border-b border-gray-700 p-5 flex space-x-3 ${!userPage && "hover:cursor-pointer"}`}
      onClick={()=>{
        if(!userPage) {
          router.push(`/user/${id}`);
        }
      }}
    >
      <div className="flex items-center space-x-4">
        <img
          src={user.image}
          alt="profile pic"
          className={`${userPage ? 'h-[150px] w-[150px]' : 'h-[50px] w-[50px]'}
            rounded-full object-cover`
          }
        />
        <div className="flex flex-col space-x-2 space-y-2 items-start justify-between p-3">
          <div>
            <h2 className="text-white font-bold">{user.name}</h2>
            <h3 className="text-gray-500">@{user.tag}</h3>
          </div>
          <h3 className="text-white">
            {user.bio}
          </h3>
          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center justify-center">
              < MapPinIcon className="text-gray-500 h-[22px]"/>
              <h2 className="text-gray-500">
                {user.location ? (`${user.location}`)
                  :"Location not provided"
                }
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;