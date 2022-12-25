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

async function CreateGetUser(session) {
  const userQuery = query(
    collection(db, "users"),
    where("email", "==", session.user.email)
  );
  let userDoc = await getDocs(userQuery);
  if(!userDoc.docs.length) {
    userDoc = await addDoc(collection(db, 'users'), {
      email: session.user.email,
      image: session.user.image
    })
  }
  return userDoc.docs[0].id;
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
      session.user.tag = session.user.name
        .split(' ').join('').toLocaleLowerCase();
      session.user.uid = token.sub;
      session.user.id = await CreateGetUser(session);
      return session;
    }
  },
});