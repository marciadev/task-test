import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBIQANDyOBBaiuHd75iNc7iIy1MarNmMtc",
  authDomain: "todo-app-e6199.firebaseapp.com",
  projectId: "todo-app-e6199",
  storageBucket: "todo-app-e6199.appspot.com",
  messagingSenderId: "813744648622",
  appId: "1:813744648622:web:46c619ee53d0121844583f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { db };
