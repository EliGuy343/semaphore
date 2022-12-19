import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where
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
import Widgets from '../components/Widgets';
import PhotoModal from "../components/PhotoModal";

const InitialbufferLimit = 100;
const initialFeedLimit = 50;


const SearchPage = ({}) => {
  const router = useRouter();
  const {data: session} = useSession();
  const [bufferLimit, setBufferLimit ] = useState(InitialbufferLimit);
  const [feedLimit, setFeedLimit]  = useState(initialFeedLimit);
  const [buffer, setBuffer] = useState([]);
  const [posts, setPosts] = useState([]);
  const [changed, setChanged] = useState(false);

  const { isOpen } = useSelector((state) => {
    return state.modalState
  });
  const isPhotoModalOpen = useSelector((state => {
    return state.photoModalState.isOpen
  }));
  const { word } = router.query;

  const InitialQuery = query(
    collection(db, 'posts'),
    orderBy('timestamp', 'desc'),
    limit(bufferLimit),
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


export default SearchPage;