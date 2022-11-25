import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar';
const Home: NextPage = () => {
  return (
    <div className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
      <Head>
        <title>Semaphore</title>
        <link rel="icon" href="/signal.ico" />
      </Head>
      <main>
        <Sidebar/>
      </main>
    </div>
  )
}

export default Home
