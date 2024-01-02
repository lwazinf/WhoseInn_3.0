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
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

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
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const db = getFirestore(app);
const store = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, store, auth, analytics };

export const getMessages = async () => {
  const colRef = collection(db, 'messages');

  const q = query(colRef, where('owner', '==', 'RUvdWw22QmYVqBF9VYxKmKtJPtI2'));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const getLocations = async () => {
  const colRef = collection(db, "locations");

  // const query_ = await query(colRef, where('owner', '==', 'RUvdWw22QmYVqBF9VYxKmKtJPtI2'))
  const query_ = query(colRef, orderBy("postedOn", "desc"));

  const data = await getDocs(query_);
  return data.docs.map((doc_) => ({
    ...doc_.data(),
    id: doc_.id,
  }));
};

export const getClosestLocation = async (selectedPoint) => {
  const colRef = collection(db, "locations");
  const query_ = query(colRef, orderBy("postedOn", "desc"));

  const data = await getDocs(query_);
  const locations = data.docs.map((doc_) => ({
    ...doc_.data(),
    id: doc_.id,
  }));

  // Calculate distances for each location
  const locationsWithDistances = locations.map((location) => ({
    ...location,
    distance: calculateDistance(selectedPoint, {
      lat: location.postAddress.lat,
      lng: location.postAddress.lng,
    }),
  }));

  // Find the location with the minimum distance
  const closestLocation = locationsWithDistances.reduce((min, location) =>
    location.distance < min.distance ? location : min
  );

  return closestLocation;
};

// Haversine formula to calculate distance between two points
function calculateDistance(point1, point2) {
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(point2.lat - point1.lat);
  const dLng = toRadians(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(point1.lat)) *
      Math.cos(toRadians(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export const signIn_ = async () => {
  return signInWithPopup(auth, provider).then((data) => {});
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
      console.log("Data written to Firestore");
    })
    .catch((error) => {
      console.error("Error writing to Firestore:", error);
    });
};

export const createLocationData_ = (data_: any) => {
  const collection_ = collection(db, "warehouse");
  const uuid_ = v4();
  setDoc(doc(collection_, data_.uid), data_)
    .then(() => {
      console.log("Data written to Firestore");
    })
    .catch((error) => {
      console.error("Error writing to Firestore:", error);
    });
};
