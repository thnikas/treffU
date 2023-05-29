import { initializeApp } from 'firebase/app';
import { getFirestore,collection, initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {getDatabase} from 'firebase/database'
import { getStorage } from "firebase/storage";
const firebaseConfig = {
 
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = initializeFirestore(app,{
  experimentalForceLongPolling: true, //used to wait firebase calls
});
export default getFirestore(app);