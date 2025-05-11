<template>
    <div class="mx-auto my-40 max-w-sm min-w-min">
        <div class="shadow pb-6 border justify-items-center px-4">
            
            <h1 v-if="error" class="text-4xl px-2 py-5 text-center text-red-500"> {{ error }}</h1>
            <h1 v-if="user" class="text-4xl px-2 py-5 text-center"> Logged in as: {{ user.email }}</h1>
            <h1 class="text-4xl px-2 py-5 text-center">Log in</h1>
            
            <GoogleLogin />

            <h1 class="text-2xl text-center">Or</h1>
            <form @submit.prevent="handleLogin" class="flex flex-col justify-center">
                <input v-model="email" @blur="validateEmail" placeholder="Email" type="email" class="border border-black w-80 pl-2 h-10 mb-4"/>
                <InlineToast v-if="showEmailToast" :message="toastEmailMessage" :toastType="toastTypeEmail"/>

                <PasswordInput v-model="password" placeholder="Password"/>
                <InlineToast v-if="showPasswordToast" :message="toastPasswordMessage" :toastType="toastType"/>
                
                <div class="pb-1 pt-0">
                    <NuxtLink to="/" class="text-sm mb-4 text-blue-600 hover:underline font-bold">Forgot password?</NuxtLink>
                </div>

                <div class="flex justify-center">
                    <button type="submit" class="block w-80 bg-blue-400 py-2 text-xl">Login</button>
                </div>
                
            </form>
            
        </div>
        <div class="flex justify-center text-sm pt-3">
            <p>New to Mars Weather Dash? <NuxtLink to="/signup" class="text-blue-600 hover:underline font-bold">Sign Up</NuxtLink></p>
        </div>
        <button @click="logoutUser">LogOut</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useFirebase'

import PasswordInput from '~/components/PasswordInput.vue';
import InlineToast from '~/components/InlineToast.vue';
import GoogleLogin from '~/components/GoogleLogin.vue';

const router = useRouter()
const { login, getUser, logout } = useAuth();

const email = ref('');
const password = ref('');
const user = getUser();
const error = ref('');
const toastPasswordMessage = ref('');
const toastType = ref('error');
const showPasswordToast = ref(false);
const toastEmailMessage = ref('');
const toastTypeEmail = ref('error');
const showEmailToast = ref(false);

const emailRegex = /^[a-zA-Z0-9]+([.\-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/;

const validateEmail = () => {
    showEmailToast.value = false;
    if (!email.value) {
        toastEmailMessage.value = 'Email is required';
        showEmailToast.value = !showEmailToast.value;
    } else if (!emailRegex.test(email.value)) {
        toastEmailMessage.value = 'Invalid email format';
        showEmailToast.value = !showEmailToast.value;
    }
}

const handleLogin = async () => {
    showPasswordToast.value = false
    showEmailToast.value = false
    toastPasswordMessage.value = ''
    try {
        await login(email.value, password.value);
        user.value = getUser().value;
        router.push('/dashboard')
    } catch (err) {
        console.log(err)
        if (err.code === 'auth/wrong-password') {
            toastPasswordMessage.value = 'Incorrect password.'
            toastType.value = 'error'
            showPasswordToast.value = true
        } else if (err.code === 'auth/invalid-email') {
            toastEmailMessage.value = 'Invalid Email.'
            toastTypeEmail.value = 'error'
            showEmailToast.value = true
        } else if (err.code === 'auth/invalid-credential') {
            toastPasswordMessage.value = 'Incorrect Emial Or Password.'
            toastType.value = 'error'
            showPasswordToast.value = true
        }
        
    }
};

const logoutUser = async () => {
    try {
        await logout();
        console.log('logged out')
    } catch (e) {
        error.value = e.message;
    }
}

</script>