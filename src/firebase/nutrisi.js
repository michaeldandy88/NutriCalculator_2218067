import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const createNutrisi = async (data) => {
  await addDoc(collection(db, 'nutrisi'), data);
};

export const getAllNutrisi = async () => {
  const snapshot = await getDocs(collection(db, 'nutrisi'));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};