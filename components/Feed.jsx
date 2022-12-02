import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from './Input';
import { useEffect, useRef, useState } from "react";
import { onSnapshot, collection, query, orderBy, endAt, limit, getDocs, startAt} from "firebase/firestore";
import { db } from '../firebase';
import Post from './Post';
import {useInView } from 'react-intersection-observer';

const initalPostsLimit = 3;

const Feed = () => {
  const {ref: scrollRef, inView: myElementIsVisible } = useInView();
  const [lim, setLim] = useState(initalPostsLimit);
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(lim)),
        (snapshot) => {
          if(!myElementIsVisible || lim == initalPostsLimit){
            setPosts(snapshot.docs);
            setLim(lim+initalPostsLimit);
          }
        }
      )
    },[db]);

    useEffect(() =>{
      if(myElementIsVisible && lim > 0) {
        console.log(lim);
        const q = query(
          collection(db, 'posts'),
          orderBy('timestamp', 'desc'),
          limit(lim),
        )
        getDocs(q).then((result) => {
          console.log(result)
          setPosts(result.docs);
          setLim((lim) => lim+initalPostsLimit);
        })
      }
    }, [db, myElementIsVisible]);

  return (
    <div
      className="text-white flex-grow border-l border-r border-gray-700
        max-w-2xl sm:ml-[88px] xl:ml-[370px]"
    >
      <div
        className="text-[#d9d9d9] flex items-center sm:justify-between
          py-2 px-2 sticky top-0 z-50 bg-black border-b border-gray-700"
      >
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div
          className="hoverAnimation w-9 h-9 flex items-center
            justify-center xl:px-0 ml-auto"
        >
          <SparklesIcon className="h-5 text-white"/>
        </div>
      </div>
      <Input />
      <div className="pb-52">
        {posts?.map(post => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
      <div ref={scrollRef}></div>
    </div>
  )
}

export default Feed;