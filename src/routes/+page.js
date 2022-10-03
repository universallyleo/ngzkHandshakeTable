import { collection, getDocs } from '@firebase/firestore';
import { db } from '$lib/firebase';

export async function load() {
	const querySnapshot = await getDocs(collection(db, 'tables'));
	//querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	//console.log(doc.id, ' => ', doc.data());
	//});
	return { arr: querySnapshot.docs.map((doc) => doc.data()) };
}
