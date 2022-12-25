import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import {
  collection,
  query,
  getDocs,
  addDoc,
  where
} from "firebase/firestore";
import { db } from '../../../firebase';

async function createOrGetUser(session) {
  const userQuery = query(
    collection(db, "users"),
    where("email", "==", session.user.email)
  );
  let userDoc = await getDocs(userQuery);
  if(!userDoc.docs.length) {
    const result = await addDoc(collection(db, 'users'), {
      email: session.user.email,
      image: session.user.image,
      tag: session.user.name.split(' ').join('').toLocaleLowerCase(),
      name: session.user.name
      })
    session.user.uid = result.id;
    session.user.tag = session.user.name
      .split(' ').join('').toLocaleLowerCase();
  }
  else {
    const userData = userDoc.docs[0].data();
    session.user.uid = userDoc.docs[0].id;
    session.user.tag = userData.tag;
    session.user.image = userData.image;
    session.user.name = userData.name;

  }

}


export default NextAuth({
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks:{
    async session({session, token}) {
      await createOrGetUser(session);
      return session;
    }
  },
});