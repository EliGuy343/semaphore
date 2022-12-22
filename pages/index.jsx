
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
import AdvancedSearchModal from "../components/AdvancedSearchModal";

const Home = ({trendingResults, providers}) => {
  const {data: session } = useSession();
  const { isOpen } = useSelector((state) => { return state.modalState });
  const isPhotoModalOpen = useSelector((state) => {return state.photoModalState.isOpen});
  const isAdvancedSearchOpen = useSelector((state) => {return state.advancedSearchModalState.isOpen})

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
        />
        {isOpen && <Modal/>}
        {isPhotoModalOpen && <PhotoModal/>}
        {isAdvancedSearchOpen && <AdvancedSearchModal/>}
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

export default Home;