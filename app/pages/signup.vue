<template>
    <div class="mx-auto my-40 max-w-sm min-w-min">
        <div class="shadow pb-6 border justify-items-center px-4">
            <h1 class="text-4xl px-2 py-5 text-center">Create Your Account</h1>
            <form @submit.prevent="handleSignUp" class="flex flex-col justify-center">
                <input v-model="username" placeholder="Username" class="border border-black w-80 pl-2 h-10 mb-4"/>
                <input v-model="email" placeholder="Email" class="border border-black w-80 pl-2 h-10 mb-4"/>

                <PasswordStrengthBar v-model="password" :password="password" :email="email" :username="username" />

                <PasswordInput v-model="password" placeholder="Password" />
                
                <PasswordInput v-model="passwordCon" @blur="handlePasswordConformation" placeholder="Confirm Password" />
                <InlineToast v-if="showPasswordConToast" :message="passwordConError" />
                
                <div class="mb-4 bg-gray-100 pl-2 py-1">
                    <div  class="flex items-center">
                        <Icon name="heroicons:check-circle" class="mr-2" :class="charactersLen"/>
                        <p :class="charactersLen">At least 12 characters</p>
                    </div>
                    <div class="flex items-center">
                        <Icon name="heroicons:check-circle" class="mr-2" :class="upperCaseCheck"/>
                        <p :class="upperCaseCheck">Uppercase</p>
                    </div>
                    <div class="flex items-center">
                        <Icon name="heroicons:check-circle" class="mr-2" :class="lowerCaseCheck"/>
                        <p :class="lowerCaseCheck">Lowercase</p>
                    </div>
                    <div class="flex items-center">
                        <Icon name="heroicons:check-circle" class="mr-2" :class="numberCheck"/>
                        <p :class="numberCheck">Number(s)</p>
                    </div>    
                    <div class="flex items-center">
                        <Icon name="heroicons:check-circle" class="mr-2" :class="symbolCheck"/>
                        <p :class="symbolCheck">Symbol(s)</p>
                    </div>
                    
                    
                </div>

                <CountryDropdown v-model="selectedCountry"/>
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
import { useAuth } from '~/composables/useFirebase';
import PasswordInput from '~/components/PasswordInput.vue';
import CountryDropdown from '~/components/CountryDropdown.vue';
import InlineToast from '~/components/InlineToast.vue';
import PasswordStrengthBar from '~/components/PasswordStrengthBar.vue';

const { login, getUser, logout } = useAuth();

const username = ref('');
const validUsername = ref(false);
const email = ref('');
const password = ref('');
const selectedCountry = ref('');
const showPasswordToast = ref(false);
const passwordError = ref('');
const passwordCon = ref('');
const showPasswordConToast = ref(false);
const passwordConError = ref('');
let characterLen = false;
let upperCase = false;
let lowerCase = false;
let symbol = false;
let number = false;
const hasUppercase = /[A-Z]/;
const hasLowercase = /[a-z]/;
const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;
const hasNumber = /[0-9]/;


const emailRegex = /^[a-zA-Z0-9]+([.\-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.{10,})[a-z]+[A-Z]+[0-9]+[!@#$%^&*(),.?":{}|<>]+$/

const handleSignUp = async () => {
    // Validate username
    if (passwordValidation()) {
        console.log(selectedCountry.value);
        console.log("Password Valid");
    } else {
        console.log("Error in sign up");
    }
}

const handlePasswordConformation = () => {
    showPasswordConToast.value = false;
    passwordConError.value = '';
    if (password.value != passwordCon.value) {
        showPasswordConToast.value = true;
        passwordConError.value = "Passwords do not match";
    }
}

const passwordValidation = () => {
    if (characterLen && upperCase && lowerCase && symbol && number) {
        return true;
    } else {
        return false;
    }
}

const charactersLen = computed(() => {
    if (password.value.length < 12 && password.value != '') {
        characterLen = false;
        return 'text-red-500'
    } else if (password.value.length >= 12) {
        characterLen = true;
        return 'text-green-500'
    }
})

const lowerCaseCheck = computed(() => {
    let containsLowerCase = hasLowercase.test(password.value)
    if (containsLowerCase) {
        lowerCase = true;
        return 'text-green-500'
    } else if (!containsLowerCase && password.value != '') {
        lowerCase = false;
        return 'text-red-500'
    }
})

const upperCaseCheck = computed(() => {
    let containsUppercase = hasUppercase.test(password.value);
    if (containsUppercase) {
        upperCase = true;
        return 'text-green-500';
    } else if (!containsUppercase && password.value != '') {
        upperCase = false;
        return 'text-red-500';
    }
})

const symbolCheck = computed(() => {
    let containsSymbol = hasSymbol.test(password.value);
    if (containsSymbol) {
        symbol = true;
        return 'text-green-500';
    } else if (!containsSymbol && password.value != '') {
        symbol = false;
        return 'text-red-500';
    }
})

const numberCheck = computed(() => {
    let containsNumber = hasNumber.test(password.value);
    if (containsNumber) {
        number = true;
        return 'text-green-500';
    } else if (!containsNumber && password.value != '') {
        number = false;
        return 'text-red-500';
    }
})

</script>