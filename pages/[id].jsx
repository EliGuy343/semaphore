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
import { ArrowDownLeftIcon } from "@heroicons/react/24/outline";
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