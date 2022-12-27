import {
  collection,
  doc,
  getDocs,
  limit,
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
import Comment from "../components/Comment";
import Widgets from '../components/Widgets';
import PhotoModal from "../components/PhotoModal";
import AdvancedSearchModal from "../components/AdvancedSearchModal";

const initialCommentLimit = 10;
const PostPage = ({trendingResults, providers}) => {

  const router = useRouter();
  const isAdvancedSearchOpen = useSelector((state) => {return state.advancedSearchModalState.isOpen})

  const {data: session} = useSession();
  const { isOpen } = useSelector((state) => {
    return state.modalState
  });
  const isPhotoModalOpen = useSelector((state => {
    return state.photoModalState.isOpen
  }));
  const { id } = router.query;

  const [lim, setLim] = useState(initialCommentLimit);
  const [moreToLoad, setMoreToLoad] = useState(true);

  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null);
  const [comments, setCommments] = useState([]);
  const [changed, setChanged] = useState(true);
  const [commmentsChanged, setCommmentsChanged] = useState(false);

  useEffect(() => {
    return onSnapshot(doc(db, "posts", id), (snapshot) => {
      if(changed) {
        setPost(snapshot.data());
        setLoading(false);
        setChanged(false);
      }
    });
  }, [db])

  useEffect(() =>
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc"),
        limit(lim)
      ),
      (snapshot) => {
        if(snapshot.docs.length >= lim){
          setMoreToLoad(true);
        }
        else
        {
          setMoreToLoad(false);
        }
        setCommments(snapshot.docs);
        setLim(lim => lim+initialCommentLimit);
      }
    ),
    [db, id]
  );

  useEffect(() =>{
    if(changed) {
      const q = query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc"),
        limit(lim),
      )
      getDocs(q).then((result) => {
        setCommments(result.docs);
        setCommmentsChanged(false);
      })
    }
  }, [commmentsChanged]);

  const loadMoreComments = () => {
    const q = query(
      collection(db, "posts", id, "comments"),
      orderBy("timestamp", "desc"),
      limit(lim)
    );

    getDocs(q).then((result) => {
        if(result.docs.length <= lim) {
          setMoreToLoad(false);
        }
        setCommments(result.docs);
        setLim(lim => lim+initialCommentLimit);
      }
    )
  }

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
          {post ?
            (
              <Post id={id} post={post} postPage setChanged={setChanged}/>
            )
            :(!loading &&
            <div
              className=" flex text-white justify-center text-center
                px-1.5 py-2"
            >
              <h2 className="font-bold text-[20px]">
                We are sorry, but this post doesn't exist anymore.
              </h2>
            </div>
            )
          }
          {comments.length > 0 && (
            <div className="ph-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  postId={id}
                  comment={comment.data()}
                  setCommmentsChanged={setCommmentsChanged}
                />
              ))}
              {moreToLoad && <div
                className="p-3 flex border-b border-gray-700
                  justify-center text-center items-center cursor-pointer
                  hover:bg-[#d9d9d9] hover:bg-opacity-20"
                onClick={() => loadMoreComments()}
              >
                <span className="text-blue-400">Load more</span>
              </div>}
            </div>
          )}
        </div>
        <Sidebar/>
        <Widgets
          trendingResults={trendingResults}
        />
        {isPhotoModalOpen && <PhotoModal/>}
        {isOpen && <Modal/>}
        {isAdvancedSearchOpen && <AdvancedSearchModal/>}
      </main>
    </div>
  );
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


export default PostPage;