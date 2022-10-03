import { collection, getDocs } from '@firebase/firestore';
import { db } from '$lib/firebase';

export async function load() {
	const querySnapshot = await getDocs(collection(db, 'tables'));
	//querySnapshot.forEach((doc) => {
	// doc.data() is never undefined for query doc snapshots
	//console.log(doc.id, ' => ', doc.data());
	//});
	return { arr: querySnapshot.docs.map((doc) => doc.data()) };
	// I do not know why just return the array, then in page.svelte it becomes a non-array
	// but an object with key '0', value = 0-th entry, etc.
	// using Array.isArray(data) in +page.svelte says it is not an array
}
