import { collection, query, where, getDocs } from "firebase/firestore";
import { useNuxtApp } from "#app";

export const useUsername = () => {
    const isUsernameTaken = async (username) => {
        const { $firestoreDB } = useNuxtApp();
        const userRef = collection($firestoreDB, "users");
        const q = query(userRef, where("username", "==", username.toLowerCase()));
        const querySnapshot = await getDocs(q);
        
        return !querySnapshot.empty;
    }
}
