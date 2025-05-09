import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
    } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const user = ref(null);

export const useAuth = () => {
    const { firebaseAuth } = useNuxtApp();

    const login = async (email, password) => {
        const res = await signInWithEmailAndPassword(firebaseAuth, email, password);
        user.value = res.user;
    }

    const getUser = () => {
        return user;
    }

    // Differnt type of watch that only focuses on user login and logout
    onMounted(() => {
        onAuthStateChanged(firebaseAuth, (u) => {
            user.value = u;
        })
    })

    return { login, getUser}
};

