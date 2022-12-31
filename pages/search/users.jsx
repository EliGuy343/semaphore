import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import PhotoModal from "../../components/PhotoModal";
import Sidebar from "../../components/Sidebar";
import User from "../../components/User";
import Widgets from "../../components/Widgets";
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where
} from "@firebase/firestore";
import { db } from "../../firebase";

const SearchUsersPage = ({trendingResults, providers}) => {

  const router = useRouter();

  const { isOpen } = useSelector((state) => {
    return state.modalState
  });
  const isPhotoModalOpen = useSelector((state => {
    return state.photoModalState.isOpen
  }));

  const { tag, user } = router.query;
  const {data: session} = useSession();
  const [userBuffer, setUserBuffer] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let searchQuery = query(
      collection(db, 'users'),
    )

    getDocs(searchQuery).then(result => {
      console.log(result.docs)
      setUserBuffer(result.docs)
    });
  }, [])

  useEffect(() => {
    const newPosts = [];
    for(let i = 0; i < userBuffer.length; i++) {
      if(user) {
        if(!userBuffer[i].data()?.name?.includes(user))
          continue;
      }
      if(tag) {
        if(!userBuffer[i].data()?.tag?.includes(tag))
        continue;
      }
      newPosts.push(userBuffer[i]);
    }
    setUsers(newPosts);
  }, [userBuffer])

  if(!session) return <Login providers={providers}/>

  return (<div>
    <Head>
      <title>Semaphore</title>
      <link rel="icon" href="/signal.ico" />
    </Head>
    <main
        className='bg-black min-h-screen flex justify-start max-w-[1500px]
          mx-auto'
      >
        <div
          className="flex-grow border-l border-r border-gray-700
            max-w-2xl sm:ml-[73px] xl:ml-[370px]"
        >
          <div
            className="flex items-center px-1.5 py-2 border-b
              border-gray-700 text-[#d9d9d9] font-semibold text-xl
              gap-x-4 sticky top-0 z-50 bg-black"
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
          <div className="flex flex-col">
            {users.map((user) => {
              return <User key={user.id} user={user.data()}/>
            })}
          </div>
        </div>
        <Sidebar/>
        <Widgets
          trendingResults={trendingResults}
          searchPage={true}
        />
        {isPhotoModalOpen && <PhotoModal/>}
        {isOpen && <Modal/>}
    </main>
  </div>)
}

export async function getServerSideProps(context) {

  const trendingResults = [
    {
      "heading":"World Cup 2022 · LIVE",
      "description":"NZvAUS: New Zealand and Australia clash in the T20 World Cup final",
      "img":"https://rb.gy/d9yjtu",
      "tags":["#WorldCupFinal, ","Kane Williamson"]
    },
    {
      "heading":"Trending in UK","description":"#earthquake",
      "img":"https://rb.gy/jvuy4v",
      "tags":["#Airshow, ","#earthquake"]
    },
    {
      "heading":"Trending in Digital Creators",
      "description":"tubbo and quackity","img":"",
      "tags":["QUACKITY AND TUBBO,"]
    }
  ];
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props:{
      trendingResults,
      providers,
      session
    }
  }
}
export default SearchUsersPage;