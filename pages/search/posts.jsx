import {
  collection,
  getDocs,
  orderBy,
  query,
} from "@firebase/firestore";
import {getProviders, getSession, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal"
import Sidebar from "../../components/Sidebar";
import Post from "../../components/Post";
import {db } from '../../firebase';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Login from "../../components/Login";
import Widgets from '../../components/Widgets';
import PhotoModal from "../../components/PhotoModal";



const SearchPage = ({trendingResults, providers}) => {
  const router = useRouter();
  const { word, endDate, startDate, user } = router.query;
  const {data: session} = useSession();
  const [postBuffer, setPostBuffer] = useState([]);
  const [posts, setPosts] = useState([]);

  const [changed, setChanged] = useState(false);

  const { isOpen } = useSelector((state) => {
    return state.modalState
  });
  const isPhotoModalOpen = useSelector((state => {
    return state.photoModalState.isOpen
  }));

  useEffect(() => {
    let searchQuery = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc')
    )

    getDocs(searchQuery).then(result => {
      setPostBuffer(result.docs)
      setChanged(false);
    });
  }, [changed])



  useEffect(() => {
    const newPosts = [];
    for(let i = 0; i < postBuffer.length; i++) {
      if(word) {
        if(!postBuffer[i].data().text.includes(word))
          continue;
      }

    if(startDate) {
      const startDate = Date.parse(startDate);
      const timestamp = postBuffer[i].data().timestamp.seconds * 1000;
      if(timestamp <= startDate) continue;
    }

    if(endDate) {
      const endDate = Date.parse(endDate);
      const timestamp = postBuffer[i].data().timestamp.seconds * 1000;
      if(timestamp >= endDate) continue;
    }

    if(user) {
      if(user !== postBuffer[i].data().tag) continue;
    }
    newPosts.push(postBuffer[i]);
    }
    setPosts(newPosts);
  }, [postBuffer])

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
          {posts?.map(post => (
            <Post
              key={post.id}
              id={post.id}
              post={post.data()}
              setChanged={setChanged}
            />
        ))}
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


export default SearchPage;