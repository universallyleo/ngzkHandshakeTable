import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { firebaseConfig } from '$lib/firebaseConfig';

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
//console.log({ firebaseApp, db });
