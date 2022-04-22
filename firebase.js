// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  setDoc,
  collection,
  collectionGroup,
  query,
  onSnapshot,
  where,
  getDocs,
  docs,
  doc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmWYhA2A6rqiCVA-ot8NPIL-vjMSumsVk",
  authDomain: "react-native-instagram-c-d6476.firebaseapp.com",
  projectId: "react-native-instagram-c-d6476",
  storageBucket: "react-native-instagram-c-d6476.appspot.com",
  messagingSenderId: "776998019452",
  appId: "1:776998019452:web:709d1a533be70fac7304f9",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export const onLogin = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
  // console.log(auth);
};

const getRandomProfilePicture = async () => {
  const response = await fetch("https://randomuser.me/api");
  const data = await response.json();
  return data.results[0].picture.large;
};

// Sign Up
// export const onSignup = async (email, password, username) => {
//   await createUserWithEmailAndPassword(auth, email, password);
//   const userRef = collection(db, "users", auth.currentUser.email);
//   await addDoc(userRef, {
//     user_uid: auth.currentUser.uid,
//     username: username,
//     email: auth.currentUser.email,
//     profile_picture: await getRandomProfilePicture(),
//   }).then(() => console.log("done"));
// };

export const onSignup = async (email, password, username) => {
  await createUserWithEmailAndPassword(auth, email, password);
  // const userRef = collection(db, "users", auth.currentUser.email);
  await setDoc(doc(db, "users", auth.currentUser.email), {
    user_uid: auth.currentUser.uid,
    username: username,
    email: auth.currentUser.email,
    profile_picture: await getRandomProfilePicture(),
  }).then(() => console.log("done"));
};

// Sign Out
export const handleSignOut = () => {
  signOut(auth);
};

const getAllCollections = () => {
  // Get collection data
  // getDocs(collection(db, "users"))
  //   .then((snapshot) => {
  //     let userInfo = [];
  //     snapshot.docs.map((doc) => {
  //       userInfo.push(doc.data().username);
  //     });
  //     console.log("usrInfo:", userInfo);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

// getAllCollections();
