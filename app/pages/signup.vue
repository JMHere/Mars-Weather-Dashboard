<template>
    <div class="mx-auto my-40 max-w-sm min-w-min">
        <div class="shadow pb-6 border justify-items-center px-4">
            <h1 class="text-4xl px-2 py-5 text-center">Create Your Account</h1>
            <form @submit.prevent="handleSignUp" class="flex flex-col justify-center">
                <input placeholder="Username" class="border border-black w-80 pl-2 h-10 mb-4"/>
                <input placeholder="Email" class="border border-black w-80 pl-2 h-10 mb-4"/>
                <PasswordInput v-model="password" placeholder="Password" />
                
                <PasswordInput v-model="pasword" placeholder="Confirm Password" />

                <CountryDropdown />
                <div class="flex justify-center">
                    <button type="submit" class="block w-80 bg-blue-400 py-2 text-xl">Create Account</button>
                </div>
            </form>
        </div>
        <div class="flex justify-center text-sm pt-3">
            <p>Already have an Account? <NuxtLink to="/login" class="text-blue-600 hover:underline font-bold">Log In</NuxtLink></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import PasswordInput from '~/components/PasswordInput.vue';
import CountryDropdown from '~/components/CountryDropdown.vue';

const password = ref('')
const showPassword = ref(false);
const showPasswordCon = ref(false);

const handleSignUp = async () => {

}

const togglePassword  = () => {
    showPassword.value = !showPassword.value
}

const togglePasswordCon = () => {
    showPasswordCon.value = !showPasswordCon.value
}

</script>