import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";


const UserPage = ({trendingResults, followResults, providers}) => {
  const router = useRouter();
  const { id } = router.query;
  const {data: session} = useSession();
  return (
  <div>
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
          <div className="border-b border-gray-700 p-5 flex space-x-3">
            <div className="flex items-center justify-center space-x-2">
              <img
                src={session.user.image}
                alt="profile pic"
                className="h-[120px] w-[120px]  border border-gray-800"
              />
              <div>
                <h2 className="text-white font-bold">{session.user.name}</h2>
                <h3 className="text-gray-500">@{session.user.tag}</h3>
              </div>
            </div>
          </div>
        </div>
        <Sidebar/>
        <Widgets trendingResults={trendingResults}/>
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


export default UserPage;