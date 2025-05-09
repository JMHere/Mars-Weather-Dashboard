<template>
    <div class="mx-auto my-40 max-w-sm min-w-min">
        <div class="shadow pb-6 border justify-items-center px-4">
            <h1 class="text-4xl px-2 py-5 text-center">Log in</h1>
            <form @submit.prevent="handleLogin" class="flex flex-col justify-center">
                <input v-model="email" placeholder="Email" type="email" class="border border-black w-80 pl-2 h-10 mb-4"/>

                <div class="relative">
                    <input 
                    v-model="password" 
                    placeholder="Password" 
                    :type="showPassword ? 'text' : 'password'" 
                    class="border border-black w-80 pl-2 h-10"
                    />

                    <button 
                    @click="togglePassword"
                    class="absolute inset-y-0 right-0 flex items-center px-3">
                    <Icon :name="showPassword ? 'heroicons:eye' : 'heroicons:eye-slash'"/>
                    </button>
                </div>

                <div class="pb-1 pt-0">
                    <a href="/" class="text-sm mb-4 text-blue-600 hover:underline font-bold">Forgot password?</a>
                </div>

                <div class="flex justify-center">
                    <button type="submit" class="block w-80 bg-blue-400 py-2 text-xl">Login</button>
                </div>
                
            </form>
            
        </div>
        <div class="flex justify-center text-sm pt-3">
            <p>New to Mars Weather Dash? <a href="/signup" class="text-blue-600 hover:underline font-bold">Sign Up</a></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const email = ref('');
const password = ref('');
const showPassword = ref(false)

const handleLogin = async () => {
    console.log(email.value)
};

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

</script>