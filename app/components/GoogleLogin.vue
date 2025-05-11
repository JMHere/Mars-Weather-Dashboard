<template>
    <div>
        <button @click="googleLogin" class="border border-black w-80 py-2 flex flex-row justify-center">
            <Icon name="logos:google-icon" class="flex my-auto text-xl mr-2"/>
            <p class="">Continue with Google</p>
        </button>
    </div>
</template>

<script setup>
import { useAuth } from '~/composables/useFirebase';
import { useRouter } from 'vue-router';

const router = useRouter();
const { loginWithGoogle } = useAuth();

const googleLogin = async () => {
    try{
        await loginWithGoogle();
        router.push('/dashboard')
    } catch (error) {
        console.log(error);
    }
}
</script>