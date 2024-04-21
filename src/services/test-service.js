import { db } from "../config/firestore";
import { collection, getDocs } from "firebase/firestore";

export const getTestCollection = async () => {
  const collectionRef = collection(db, "test-collection");
  console.log(collectionRef);
  const snapshot = await getDocs(collectionRef);
  const cleanedData = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return cleanedData;
};
