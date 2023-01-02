// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app"
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtWzIL0Z-_Y6qxshAX0mXzoBfiRG4eAgQ",
  authDomain: "dhxxn-web.firebaseapp.com",
  projectId: "dhxxn-web",
  storageBucket: "dhxxn-web.appspot.com",
  messagingSenderId: "410489176325",
  appId: "1:410489176325:web:63a8dc1f01e2e32f02f76c",
  measurementId: "G-S36PEJBV9D"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const functions = getFunctions(app)
export const storage = getStorage(app);

export const firebaseInstance = firebase;
// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };