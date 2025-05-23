import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB4SCUqzbJUpajuDmt25iERaZlWg_V02C0',
  authDomain: 'com.nutricalculator',
  projectId: 'nutricalc-ec472',
  storageBucket: 'nutricalc-ec472.firebasestorage.app',
  messagingSenderId: '153924745383',
  appId: '1:153924745383:android:21ce2e724161a1d01d4382',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);