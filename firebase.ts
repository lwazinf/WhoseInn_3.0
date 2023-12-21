import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, orderBy, query, setDoc, where } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCC_7cjfdnasStlcChr7os814BUsZQ8-sg",
  authDomain: "whose-inn.firebaseapp.com",
  projectId: "whose-inn",
  storageBucket: "whose-inn.appspot.com",
  messagingSenderId: "659897271079",
  appId: "1:659897271079:web:bb7925c37071871467df02",
  measurementId: "G-W1RPFM3RSC",
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);
const provider = new GoogleAuthProvider()

export { db, store, auth, analytics };

export const getLocations = async () => {
 
  const colRef = collection(db, "locations");
  
  // const query_ = await query(colRef, where('owner', '==', 'RUvdWw22QmYVqBF9VYxKmKtJPtI2'))
  const query_ = query(colRef, orderBy("postedOn", "desc"));

  const data = await getDocs(query_)
  return data.docs.map((doc_) => ({
    ...doc_.data(),
    id: doc_.id,
  }));
};

export const signIn_ = async () => {
  return signInWithPopup(auth, provider).then((data) => {
  });
};

export const signOut_ = () => {
  return signOut(auth);
};

export const useAuth = () => {
  const [currentUser_, setCurrentUser_] = useState();

  useEffect(() => {
    // @ts-ignore
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser_(user));
    return unsub;
  }, []);
  return currentUser_;
};

export const createLocation_ = (data_: any) => {
  const collection_ = collection(db, "locations");
  setDoc(doc(collection_, data_.uuid), data_)
  .then(() => {
    console.log('Data written to Firestore');
  })
  .catch((error) => {
    console.error('Error writing to Firestore:', error);
  });
};
