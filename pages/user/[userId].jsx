import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where
} from "@firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import Post from '../../components/Post';
import AdvancedSearchModal from '../../components/AdvancedSearchModal';
import Modal from '../../components/Modal';
import PhotoModal from '../../components/PhotoModal';
import User from "../../components/User";

const initalPostsLimit = 5;

const UserPage = ({trendingResults, followResults, providers}) => {
  const router = useRouter();
  const { userId } = router.query;
  const {data: session} = useSession();

  const isAdvancedSearchOpen = useSelector((state) => {
    return state.advancedSearchModalState.isOpen
  });
  const { isOpen } = useSelector((state) => {
    return state.modalState
  });
  const isPhotoModalOpen = useSelector((state => {
    return state.photoModalState.isOpen
  }));

  const [moreToLoad, setMoreToLoad] = useState(true);
  const [lim, setLim] = useState(initalPostsLimit);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [newerPostsNotification, setNewerPostsNotification] = useState(false);
  const [updatePosts, setUpdatePosts] = useState([]);
  const [changed, setChanged] = useState(false);
  const [posts, setPosts] = useState([]);

  const queryForUpdate = query(
    collection(db, 'posts'),
    orderBy('timestamp', 'desc'),
    where("id", "==", userId),
    limit(lim),
  );

  const loadMorePosts = () => {
    getDocs(queryForUpdate).then((result) => {
      if(result.docs.length <= posts.length) setMoreToLoad(false)
      setPosts(result.docs);
      setLim((lim) => lim+initalPostsLimit);
    })
  }

  const LoadNewerPosts = () => {
    setPosts(posts => {
      let i = 0;
      while(i < posts.length && i < updatePosts.length) {
        if(posts[i].id !== updatePosts[i].id) {
          if( posts[i].data().timestamp.seconds &&
            updatePosts[i].data().timestamp.seconds &&
            posts[i].data().timestamp.seconds <
            updatePosts[i].data().timestamp.seconds
          ) {
            posts.unshift(updatePosts[i])
            i++;
          }
          else {
            posts.splice(i,1);
          }
        }
        else {
          i++;
        }
      }
      return posts;
    });
    setNewerPostsNotification(false);
  }

  useEffect(() => {
    loadMorePosts();
  },[])

  useEffect(() => {
    getDoc(doc(db, "users", userId)).then(
      result => {
        if(!result.exists()) {
          setNotFound(true);
        }
        else {
          setUser(result.data())
        }
        setLoading(false);
      }
    )
  }, [])

  useEffect(()=>{
    const queryForNotifications = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc'),
      where("id", "==", userId),
      limit(lim)
    );
    return onSnapshot(queryForNotifications, (snapshot) => {
      setUpdatePosts(snapshot.docs);
    });
  },[db]);

  useEffect(() => {
    if(
      posts.length !== updatePosts.length
      || updatePosts[0]?.id !== posts[0]?.id
    ) {
      setNewerPostsNotification(true);
    }
    else {
      setNewerPostsNotification(false);
    }
  }, [updatePosts]);

  useEffect(() =>{
    if(changed) {
      getDocs(queryForUpdate).then((result) => {
        setPosts(result.docs);
        setChanged(false);
      })
    }
  }, [changed]);

  if(!session) return <Login providers={providers}/>

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
        {!notFound && !loading && <User userPage={true} user={user}/>}
        {newerPostsNotification &&
          <div
            className="p-3 flex border-b border-gray-700
              justify-center text-center items-center cursor-pointer
              hover:bg-[#d9d9d9] hover:bg-opacity-20"
            onClick={LoadNewerPosts}
          >
            <span className="text-blue-400">Load Newer Posts</span>
          </div>
        }
        {posts?.map(post => (
          <Post
            key={post.id}
            id={post.id}
            post={post.data()}
            setChanged={setChanged}
          />
        ))}
        {moreToLoad && <div
          className="p-3 flex border-b border-gray-700
            justify-center text-center items-center cursor-pointer
            hover:bg-[#d9d9d9] hover:bg-opacity-20"
          onClick={loadMorePosts}
        >
          <span className="text-blue-400">Load more</span>
        </div>}
        {!loading && notFound && <div className="flex items-center px-1.5 py-2">
          <h2 className=" text-white font-bold text-[20px]">
            Sorry, user not found
          </h2>
        </div>}
      </div>
      <Sidebar/>
      <Widgets trendingResults={trendingResults}/>
      {isPhotoModalOpen && <PhotoModal/>}
      {isOpen && <Modal/>}
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


export default UserPage;