import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import {getProviders, getSession, useSession } from 'next-auth/react';

const Home = ({trendingResults, followResults, providers}) => {
  const {data: session } = useSession();

  // if(!session) return <Login providers={providers}>
  return (
    <div className=''>
      <Head>
        <title>Semaphore</title>
        <link rel="icon" href="/signal.ico" />
      </Head>
      <main className='bg-black min-h-screen flex justify-start max-w-[1500px] mx-auto'>
        <Sidebar/>
        <Feed/>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const trendingResult = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  );
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const sessions = await getSession(context);
}

export default Home