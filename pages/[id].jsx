import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query
} from "@firebase/firestore";
import {getProviders, getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import {db } from '../firebase';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Login from "../components/Login";

const PostPage = ({trendingResults, followResults, providers}) => {
  const router = useRouter();
  const {data: session} = useSession();
  const isOpen = useSelector((state) => { return state.modalState });
  const { id } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => onSnapshot(doc(db, "posts", id), (snapshot) => {
    setPost(snapshot.data());
  }), [db])

  if(!session) return <Login providers={providers}/>

  return (
    <div className="">
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
          {post ?
            (
              <Post id={id} post={post} postPage/>
            )
            :(
            <div
              className=" flex text-white justify-center text-center
                px-1.5 py-2"
            >
              <h2 className="font-bold text-[20px]">
                We are sorry, but the post doesn't exist anymore.
              </h2>
            </div>
            )
          }
        </div>
        <Sidebar/>
        {isOpen && <Modal/>}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {

  const trendingResults = JSON.stringify([
    {
      "heading":"T20 World Cup 2021 · LIVE",
      "description":"NZvAUS: New Zealand and Australia clash in the T20 World Cup final",
      "img":"https://rb.gy/d9yjtu",
      "tags":["#T20WorldCupFinal, ","Kane Williamson"]
    },
    {
      "heading":"Trending in United Arab Emirates","description":"#earthquake",
      "img":"https://rb.gy/jvuy4v",
      "tags":["#DubaiAirshow, ","#gessdubai"]
    },
    {
      "heading":"Trending in Digital Creators",
      "description":"tubbo and quackity","img":"",
      "tags":["QUACKITY AND TUBBO,"]
    }
  ]);
  const followResults = JSON.stringify([
    {
      "userImg":"https://rb.gy/urakiy",
      "username":"SpaceX","tag":"@SpaceX"
    },
    {
      "userImg":"https://rb.gy/aluxgh",
      "username":"Elon Musk",
      "tag":"@elonmusk"
    },
    {
      "userImg":"https://rb.gy/zyvazm",
      "username":"Tesla",
      "tag":"@Tesla"
    }
  ]);
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props:{
      trendingResults,
      followResults,
      providers,
      session
    }
  }
}


export default PostPage;