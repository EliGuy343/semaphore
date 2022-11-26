import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
const Home: NextPage = () => {
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

export default Home
