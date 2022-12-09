import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from './Input';
import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy,limit, getDocs} from "firebase/firestore";
import { db } from '../firebase';
import Post from './Post';

const initalPostsLimit = 5;

const Feed = () => {
  const [moreToLoad, setMoreToLoad] = useState(true);
  const [lim, setLim] = useState(initalPostsLimit);
  const [posts, setPosts] = useState([]);
  const [updatePosts, setUpdatePosts] = useState([]);
  const [changed, setChanged] = useState(false);
  const [newerPostsNotification, setNewerPostsNotification] = useState(false);

  useEffect(() => {
    loadMorePosts();
  },[])

  useEffect(() => {
    if(posts.length !== updatePosts.length || updatePosts[0]?.id !== posts[0]?.id) {
      setNewerPostsNotification(true);
    }
    else {
      setNewerPostsNotification(false);
    }
  }, [updatePosts]);


  useEffect(()=>{
    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc'),
      limit(lim)
    );
    return onSnapshot(q, (snapshot) => {
      setUpdatePosts(snapshot.docs);
    });
  },[db]);

  useEffect(() =>{
    if(changed) {
      const q = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc'),
        limit(lim),
      )
      getDocs(q).then((result) => {
        setPosts(result.docs);
        setChanged(false);
      })
    }
  }, [changed]);

  const loadMorePosts = () => {
    const q = query(
      collection(db, 'posts'),
      orderBy('timestamp', 'desc'),
      limit(lim),
    )
    getDocs(q).then((result) => {
      if(result.docs.length <= posts.length) setMoreToLoad(false)
      setPosts(result.docs);
      setLim((lim) => lim+initalPostsLimit);
    })
  }

  const LoadNewerPosts = () => {
    setPosts(posts => {
      let i = 0;
      let j = 0;
      while(i < posts.length && j < updatePosts.length) {
        if(posts[i].id !== updatePosts[j].id) {
          if(posts[i].data().timestamp.seconds < updatePosts[j].data().timestamp.seconds) {
            posts.unshift(updatePosts[j])
            i++;
            j++;
          }
          else {
            posts.splice(i,1);
          }
        }
        else {
          i++;
          j++;
        }
      }
      console.log(updatePosts[0].data().timestamp);
      return posts;
    });
    setNewerPostsNotification(false);
  }

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
      {newerPostsNotification && <div
          className="p-3 flex border-b border-gray-700
            justify-center text-center items-center cursor-pointer
            hover:bg-[#d9d9d9] hover:bg-opacity-20"
          onClick={LoadNewerPosts}
        >
          <span className="text-blue-400">Load Newer Posts</span>
        </div>}
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
      </div>
    </div>
  )
}

export default Feed;