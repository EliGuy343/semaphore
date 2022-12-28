import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";

const UserSettings = ({}) => {

  const router = useRouter();
  const {data: session} = useSession();
  const [userData, setUserData] = useState({
    name: session?.user?.name,
    tag:  session?.user?.tag,
    location:  session?.user?.location,
    bio:  session?.user?.bio,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const filePickerRef = useRef();

  const applyChanges = async () => {
    if(loading) return;
    setLoading(true);

    setDoc(doc(db, 'users', session.user.uid), {
      name: userData.name,
      tag: userData.tag,
      location: userData.location ? userData.location : null,
      bio: userData.bio ? userData.bio : null,
      email:session.user.email,
      image:session.user.image ? session.user.image : null
    });

    const imageRef = ref(storage, `users/${session.user.uid}/image`);
    if(selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then( async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'users', session.user.uid), {
          image: downloadURL
        })
      });
    }

    setLoading(false);
    setUserData({
      name: session?.user?.name,
      tag: session?.user?.tag,
      location: session?.user?.location,
      bio: session?.user?.bio,
    });
    setSelectedFile(null);
    router.push(`/user/${session.user.uid}`)
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  if(!session) return <Login providers={providers}/>

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
      <div className="flex flex-row items-center p-5 space-x-[20px] sm:space-x-[100px] sm:pl-[90px] sm:pr-[95px]">
        <img
          src={selectedFile ? selectedFile : session?.user?.image}
          alt="profile pic"
          className={`h-[150px] w-[150px] rounded-full`}
        />
          <button
            className="xl:inline ml-auto bg-[#2b2c2c] text-white
              rounded-full w-56 h-[32px] text-md font-bold shadow-md hover:bg-[#434343]"
            onClick={() => filePickerRef.current.click()}
          >
            Upload Photo
          </button>
          <input
            type="file"
            hidden
            onChange={addImageToPost}
            ref={filePickerRef}
          />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <label
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
            defaultValue={userData.tag}
            type="text"
            name="tag"
            placeholder="username..."
            id="username"
            className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
            onChange={(e) => {
              setUserData((userData) => {
                userData[e.target.name] = e.target.value
                return userData;
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
        <div className="flex items-center text-gray-400 border rounded-md w-[80%]">
            <input
              name="name"
              defaultValue={userData.name}
              type="text"
              placeholder="Display Name"
              id="displayname"
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
              onChange={(e) => {
                setUserData((userData) => {
                  userData[e.target.name] = e.target.value;
                  return userData;
                })
              }}
            />
        </div>
        <label
          className="flex justify-center items-center py-2 text-gray-300
            font-bold text-[16px]"
        >
          Bio
        </label>
        <div className="flex items-center text-gray-400 border rounded-md w-[80%]">
            <textarea
              name="bio"
              defaultValue={userData.bio}
              type="text"
              placeholder="bio"
              id="bio"
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
              onChange={(e) => {
                setUserData((userData) => {
                  userData[e.target.name] = e.target.value;
                  return userData;
                })
              }}
            />
        </div>
        <label
          className="flex justify-center items-center py-2 text-gray-300
            font-bold text-[16px]"
        >
          Location
        </label>
        <div className="flex items-center text-gray-400 border rounded-md w-[80%]">
            <input
              name="location"
              defaultValue={userData.location}
              type="text"
              placeholder="Location"
              id="location "
              className="w-full p-2.5 ml-2 bg-transparent outline-none text-white"
              onChange={(e) => {
                setUserData((userData) => {
                  userData[e.target.name] = e.target.value;
                  return userData;
                })
              }}
            />
        </div>
        <button
          className="bg-[#1d9bf0] text-white rounded-full px-4 py-2.5 !mt-4
            font-bold shadow-md hover:bg-[#1a8cd8]"
          onClick={applyChanges}
          disabled={loading}
        >
          Apply Changes
        </button>
      </div>
    </div>
  )
}

export default UserSettings;