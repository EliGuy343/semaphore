import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc,
  addDoc,
  doc,
  setDoc
} from "firebase/firestore";
import { db } from '../../../firebase';

async function CreateGetUser(email, userImage) {

  const userRef = doc(db, "posts", email);
  const userDoc = await getDoc(userRef);

  if(!userDoc.exists()) {
    await setDoc(doc(db, 'users', email), {
      email: email,
      image: userImage
    })
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
      session.user.tag = session.user.name
        .split(' ').join('').toLocaleLowerCase();
      session.user.uid = token.sub;
      CreateGetUser(session.user.email, session.user.image)
      return session;
    }
  },
});