import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider
    } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

const user = ref(null);

export const useAuth = () => {
    const { $firebaseAuth, $firestoreDB } = useNuxtApp();

    const signup = async (email, password, username, country) => {
        try {
            const res = await createUserWithEmailAndPassword($firebaseAuth, email, password);
            
            const userRef = doc($firestoreDB, "users", res.user.uid);
            await setDoc(userRef , {
                username,
                country,
                email: res.user.email,
                createdAt: new Date(),
            });

            user.value = res.user;
        } catch (error) {
            console.log(error)
        }
        
    }

    const login = async (email, password) => {
        const res = await signInWithEmailAndPassword($firebaseAuth, email, password);
        user.value = res.user;
    }

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup($firebaseAuth, provider)
            user.value = res.user;

        } catch (error) {
            console.error("Error during Google login:", error);
        }
    }

    const getUser = () => {
        return user;
    }

    const logout = async () => {
        await signOut($firebaseAuth);
        user.value = null;
    }

    // Differnt type of watch that only focuses on user login and logout
    onMounted(() => {
        onAuthStateChanged($firebaseAuth, (u) => {
            user.value = u;
        })
    })

    return { login, getUser, signup, logout, loginWithGoogle}
};

