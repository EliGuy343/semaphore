import Head from "next/head";
import Modal from "../components/Modal";
import PhotoModal from "../components/PhotoModal";
import Sidebar from "../components/Sidebar";
import UserSettings from "../components/UserSettings";
import Widgets from "../components/Widgets";
import AdvancedSearchModal from "../components/AdvancedSearchModal";
import { getProviders, getSession } from "next-auth/react";

const UserSettingsPage = ({providers}) => {
  return <div>
    <Head>
      <title>Semaphore</title>
      <link rel="icon" href="/signal.ico" />
    </Head>
    <main className='bg-black min-h-screen flex justify-start max-w-[1500px] mx-auto'>
      <Sidebar/>
      <UserSettings/>
      {/* {isOpen && <Modal/>}
      {isPhotoModalOpen && <PhotoModal/>}
      {isAdvancedSearchOpen && <AdvancedSearchModal/>} */}
    </main>
  </div>
}

export default UserSettingsPage;

export async function getServerSideProps(context) {

  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props:{
      providers,
      session
    }
  }
}
