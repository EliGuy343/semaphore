
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Login from '../components/Login';
import {getProviders, getSession, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import Widgets from '../components/Widgets';
import PhotoModal from "../components/PhotoModal";

const Home = ({trendingResults, followResults, providers}) => {
  const {data: session } = useSession();
  const { isOpen } = useSelector((state) => { return state.modalState });
  const isPhotoModalOpen = useSelector((state => {return state.photoModalState.isOpen}));

  if(!session) return <Login providers={providers}/>
  return (
    <div className=''>
      <Head>
        <title>Semaphore</title>
        <link rel="icon" href="/signal.ico" />
      </Head>
      <main className='bg-black min-h-screen flex justify-start max-w-[1500px] mx-auto'>
        <Sidebar/>
        <Feed/>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal/>}
        {isPhotoModalOpen && <PhotoModal/>}
      </main>
    </div>
  )
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
  const followResults =[
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
  ];
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

export default Home